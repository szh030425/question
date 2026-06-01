import { baseScale } from '../common.js';

export const dash = baseScale({
  id: 'dash',
  name: 'DASH Score',
  category: 'duration',
  categoryLabel: '抗凝疗程与复发',
  description: 'VTE 停药后复发风险评分（不限性别）。',
  scenario: '考虑停用抗凝的 VTE 患者',
  reference: 'Tosetto A et al. Blood 2012',
  year: '2012',
  estimatedItems: 5,
  items: [
    { id: 'dash.ddimer', clinicalLabel: 'D-dimer 异常（停药后）', patientPrompt: '停药后 D-二聚体是否异常？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'dash.age', clinicalLabel: 'Age ≤50 岁', patientPrompt: '您的年龄是否 ≤50 岁？', inputType: 'boolean', scoreWhenTrue: -1, scoreWhenFalse: 0 },
    { id: 'dash.male', clinicalLabel: '男性', patientPrompt: '您的性别是否为男性？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    {
      id: 'dash.hormone',
      clinicalLabel: 'Hormone use（激素使用）',
      patientPrompt: '男性：是否使用激素？女性此项不计分。',
      inputType: 'boolean',
      scoreWhenTrue: 1,
      scoreWhenFalse: 0,
      visibleIf: { itemId: 'dash.male', equals: true },
    },
    { id: 'dash.provoked', clinicalLabel: 'VTE 诱因（非特发性则+1）', patientPrompt: '您的血栓是否无明显诱因（特发性）？', helpText: '选「是」表示特发性，计 +1 分。', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 1, patientSummary: '1 年复发率约 3.0%。', clinicianNote: '≤1 分' },
    { id: 'moderate', label: '中危', minScore: 2, maxScore: 4, patientSummary: '1 年复发率约 7.4%。', clinicianNote: '2–4 分' },
    { id: 'high', label: '高危', minScore: 5, patientSummary: '1 年复发率约 12.3%。', clinicianNote: '≥5 分', actionHint: '请与医生讨论延长抗凝。' },
  ],
});
