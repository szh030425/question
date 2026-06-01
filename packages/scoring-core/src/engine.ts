import type {
  AnswerMap,
  BreakdownLine,
  ScaleDefinition,
  ScaleItem,
  ScaleResult,
  ScaleTier,
} from './types.js';
import { getVisibleItems, isItemVisible } from './validate.js';

function formatAnswer(item: ScaleItem, value: unknown): string {
  if (value === undefined || value === null || value === '') return '未作答';
  if (item.inputType === 'boolean') return value === true ? '是' : '否';
  if (item.inputType === 'number') {
    return item.unit ? `${value} ${item.unit}` : String(value);
  }
  if (item.inputType === 'single' && item.options) {
    const opt = item.options.find((o) => o.value === value);
    return opt?.label ?? String(value);
  }
  return String(value);
}

function scoreItem(item: ScaleItem, value: AnswerMap[string]): number {
  if (value === undefined || value === null || value === '') return 0;

  if (item.inputType === 'boolean') {
    if (value === true) return item.scoreWhenTrue ?? 0;
    if (value === false) return item.scoreWhenFalse ?? 0;
    return 0;
  }

  if (item.inputType === 'number' && typeof value === 'number') {
    if (item.scorePerUnit !== undefined) return value * item.scorePerUnit;
    if (item.scoreWhenAnswered !== undefined) return item.scoreWhenAnswered;
    return value;
  }

  if (item.inputType === 'single' && item.options) {
    const opt = item.options.find((o) => o.value === value);
    return opt?.points ?? 0;
  }

  return 0;
}

function resolveTier(scale: ScaleDefinition, total: number): ScaleTier {
  const sorted = [...scale.tiers].sort((a, b) => (a.minScore ?? 0) - (b.minScore ?? 0));
  for (let i = sorted.length - 1; i >= 0; i--) {
    const t = sorted[i];
    const min = t.minScore ?? -Infinity;
    const max = t.maxScore ?? Infinity;
    if (total >= min && total <= max) return t;
  }
  return sorted[0];
}

export function scoreAdditive(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const breakdown: BreakdownLine[] = [];
  const warnings: string[] = [];
  let incomplete = false;
  let total = 0;

  for (const item of scale.items) {
    if (!isItemVisible(item, answers)) continue;
    const val = answers[item.id];
    if (
      !item.requiresClinician &&
      (val === undefined || val === null || val === '')
    ) {
      incomplete = true;
    }
    const points = scoreItem(item, val);
    total += points;
    breakdown.push({
      itemId: item.id,
      clinicalLabel: item.clinicalLabel,
      patientPrompt: item.patientPrompt,
      answerDisplay: formatAnswer(item, val),
      points,
      skipped: val === undefined || val === null || val === '',
    });
  }

  const tier = resolveTier(scale, total);
  if (incomplete) {
    warnings.push('部分题目未作答，结果可能不完整，仅供参考。');
  }

  return {
    scaleId: scale.id,
    totalScore: total,
    tierId: tier.id,
    tierLabel: tier.label,
    patientSummary: tier.patientSummary,
    actionHint: tier.actionHint,
    clinicianNote: tier.clinicianNote,
    breakdown,
    warnings,
    incomplete,
  };
}

/** Matrix: Bova — troponin + RV dysfunction */
function scoreBova(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const troponin = answers['bova.troponin'] === true;
  const rv = answers['bova.rv'] === true;
  let tierId = 'stage1';
  let label = 'Stage I（低危）';
  let summary = '30天死亡风险约 2.3%。适用于收缩压≥90mmHg 的急性 PE。';
  if (troponin && rv) {
    tierId = 'stage3';
    label = 'Stage III（高危）';
    summary = '30天死亡风险约 24.7%。需尽快专科评估与监护。';
  } else if (troponin || rv) {
    tierId = 'stage2';
    label = 'Stage II（中危）';
    summary = '30天死亡风险约 11.4%。建议尽快就医并完善检查。';
  }
  const tier = scale.tiers.find((t) => t.id === tierId)!;
  const breakdown: BreakdownLine[] = scale.items.map((item) => ({
    itemId: item.id,
    clinicalLabel: item.clinicalLabel,
    patientPrompt: item.patientPrompt,
    answerDisplay: formatAnswer(item, answers[item.id]),
    points: 0,
  }));
  return {
    scaleId: scale.id,
    totalScore: 0,
    tierId,
    tierLabel: label,
    patientSummary: summary,
    actionHint: tier.actionHint,
    clinicianNote: tier.clinicianNote,
    breakdown,
    warnings: [],
    incomplete: false,
    outcomeLabel: label,
  };
}

/** MTS PE hemodynamic classification */
function scoreMts(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const category = answers['mts.category'] as string;
  const tier = scale.tiers.find((t) => t.id === category) ?? scale.tiers[0];
  const breakdown: BreakdownLine[] = scale.items.map((item) => ({
    itemId: item.id,
    clinicalLabel: item.clinicalLabel,
    patientPrompt: item.patientPrompt,
    answerDisplay: formatAnswer(item, answers[item.id]),
    points: 0,
  }));
  return {
    scaleId: scale.id,
    totalScore: 0,
    tierId: tier.id,
    tierLabel: tier.label,
    patientSummary: tier.patientSummary,
    actionHint: tier.actionHint,
    clinicianNote: tier.clinicianNote,
    breakdown,
    warnings: [],
    incomplete: false,
    outcomeLabel: tier.label,
  };
}

/** PERC: all 8 must be negative to exclude PE */
function scorePerc(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const criteria = scale.items.filter((i) => i.id.startsWith('perc.'));
  const anyPositive = criteria.some((i) => answers[i.id] === true);
  const tier = anyPositive
    ? scale.tiers.find((t) => t.id === 'not_excluded')!
    : scale.tiers.find((t) => t.id === 'excluded')!;
  const breakdown = criteria.map((item) => ({
    itemId: item.id,
    clinicalLabel: item.clinicalLabel,
    patientPrompt: item.patientPrompt,
    answerDisplay: formatAnswer(item, answers[item.id]),
    points: answers[item.id] === true ? 1 : 0,
  }));
  return {
    scaleId: scale.id,
    totalScore: breakdown.reduce((s, b) => s + b.points, 0),
    tierId: tier.id,
    tierLabel: tier.label,
    patientSummary: tier.patientSummary,
    actionHint: tier.actionHint,
    clinicianNote: tier.clinicianNote,
    breakdown,
    warnings: anyPositive
      ? ['任一项为「是」则不能应用 PERC 排除规则。']
      : ['仅适用于低危验前概率患者（如 Wells≤4 或 Geneva≤3）。'],
    incomplete: false,
    outcomeLabel: tier.label,
  };
}

/** YEARS simplified algorithm */
function scoreYears(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const peLikely = answers['years.pe_likely'] === true;
  const dvtSigns = answers['years.dvt_signs'] === true;
  const hemoptysis = answers['years.hemoptysis'] === true;
  const anyClinical = peLikely || dvtSigns || hemoptysis;
  const dDimer = Number(answers['years.ddimer']);
  const threshold = anyClinical ? 500 : 1000;
  let tierId = 'need_ctpa';
  if (!Number.isNaN(dDimer)) {
    tierId = dDimer < threshold ? 'exclude' : 'need_ctpa';
  }
  const tier = scale.tiers.find((t) => t.id === tierId)!;
  const breakdown: BreakdownLine[] = [
    ...scale.items.slice(0, 3).map((item) => ({
      itemId: item.id,
      clinicalLabel: item.clinicalLabel,
      patientPrompt: item.patientPrompt,
      answerDisplay: formatAnswer(item, answers[item.id]),
      points: answers[item.id] === true ? 1 : 0,
    })),
    {
      itemId: 'years.threshold',
      clinicalLabel: `D-二聚体阈值（${anyClinical ? '任一项满足' : '三项均不满足'}）`,
      patientPrompt: '采用的 D-二聚体 cutoff',
      answerDisplay: `${threshold} ng/mL`,
      points: 0,
    },
    {
      itemId: 'years.ddimer',
      clinicalLabel: 'D-二聚体检测值',
      patientPrompt: 'D-二聚体（ng/mL）',
      answerDisplay: Number.isNaN(dDimer) ? '未填写' : `${dDimer} ng/mL`,
      points: 0,
    },
  ];
  return {
    scaleId: scale.id,
    totalScore: dDimer,
    tierId,
    tierLabel: tier.label,
    patientSummary: tier.patientSummary,
    actionHint: tier.actionHint,
    clinicianNote: `阈值 ${threshold} ng/mL。≥50 岁建议年龄校正（年龄×10 ng/mL）。`,
    breakdown,
    warnings: Number.isNaN(dDimer) ? ['请填写 D-二聚体数值以得出完整结论。'] : [],
    incomplete: Number.isNaN(dDimer),
    outcomeLabel: tier.label,
  };
}

/** Villalta: sum 0-33, ulcer rule */
function scoreVillalta(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  const result = scoreAdditive(scale, answers);
  const ulcer = answers['villalta.ulcer'] === true;
  if (ulcer && result.tierId !== 'severe') {
    const severe = scale.tiers.find((t) => t.id === 'severe')!;
    return {
      ...result,
      tierId: 'severe',
      tierLabel: severe.label,
      patientSummary: severe.patientSummary,
      actionHint: severe.actionHint,
      warnings: [...result.warnings, '存在静脉溃疡，按标准归为重度 PTS。'],
    };
  }
  return result;
}

export function scoreScale(scale: ScaleDefinition, answers: AnswerMap): ScaleResult {
  if (scale.status === 'placeholder') {
    return {
      scaleId: scale.id,
      totalScore: 0,
      tierId: 'placeholder',
      tierLabel: '暂未开放',
      patientSummary: scale.description,
      breakdown: [],
      warnings: ['该量表完整题项待补充，暂不可计分。'],
      incomplete: true,
    };
  }

  switch (scale.algorithmId ?? scale.type) {
    case 'matrix':
      if (scale.id === 'bova') return scoreBova(scale, answers);
      if (scale.id === 'mts') return scoreMts(scale, answers);
      return scoreBova(scale, answers);
    case 'algorithm':
      if (scale.id === 'perc') return scorePerc(scale, answers);
      if (scale.id === 'years') return scoreYears(scale, answers);
      return scorePerc(scale, answers);
    case 'tiered':
      if (scale.id === 'villalta') return scoreVillalta(scale, answers);
      return scoreAdditive(scale, answers);
    case 'additive':
    default:
      return scoreAdditive(scale, answers);
  }
}

export function scoreScaleById(
  scales: ScaleDefinition[],
  scaleId: string,
  answers: AnswerMap
): ScaleResult {
  const scale = scales.find((s) => s.id === scaleId);
  if (!scale) throw new Error(`Unknown scale: ${scaleId}`);
  return scoreScale(scale, answers);
}
