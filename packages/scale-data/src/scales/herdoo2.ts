import { baseScale } from '../common.js';

export const herdoo2 = baseScale({
  id: 'herdoo2',
  name: 'HERDOO2',
  category: 'duration',
  categoryLabel: '抗凝疗程与复发',
  description: '女性 DVT 患者停药后 1 年复发风险评估。',
  scenario: '女性患者考虑停用抗凝时',
  reference: 'Rodger MA et al. BMJ 2012',
  year: '2012',
  eligibility: { gender: 'female', notes: '仅适用于女性患者。' },
  estimatedItems: 6,
  items: [
    { id: 'herdoo2.hyper', clinicalLabel: 'Hyperpigmentation（色素沉着）', patientPrompt: '患肢是否有色素沉着？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'herdoo2.edema', clinicalLabel: 'Edema（水肿）', patientPrompt: '患肢是否有水肿？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'herdoo2.red', clinicalLabel: 'Redness（发红）', patientPrompt: '患肢是否有发红？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'herdoo2.ddimer', clinicalLabel: 'D-dimer ≥250 μg/L（停药后）', patientPrompt: '停药后 D-二聚体是否 ≥250 μg/L？', helpText: '需实验室检测。', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'herdoo2.obesity', clinicalLabel: 'Obesity（BMI≥30）', patientPrompt: '您的 BMI 是否 ≥30？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'herdoo2.age', clinicalLabel: 'Older age（≥65岁）', patientPrompt: '您是否年满 65 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 1, patientSummary: '可考虑安全停药（1 年复发率约 3%）。', clinicianNote: '≤1 分 = 低危', actionHint: '必须由医生综合决定是否停药。' },
    { id: 'high', label: '高危', minScore: 2, patientSummary: '建议延长抗凝（1 年复发率约 12%）。', clinicianNote: '≥2 分 = 高危', actionHint: '请与专科医生讨论疗程。' },
  ],
});
