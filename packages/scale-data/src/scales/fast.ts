import { baseScale } from '../common.js';

export const fast = baseScale({
  id: 'fast',
  name: 'FAST Score',
  category: 'severity',
  categoryLabel: '严重度与预后',
  description: '血压正常 PE 患者院内不良事件风险。',
  scenario: '血压正常的急性 PE',
  reference: 'Hobohm L et al. Clin Res Cardiol 2020',
  year: '2020',
  eligibility: { notes: '适用于血压正常的急性 PE。', soft: true },
  items: [
    { id: 'fast.hr', clinicalLabel: '心率 ≥100', patientPrompt: '心率是否 ≥100 次/分？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'fast.syncope', clinicalLabel: '晕厥', patientPrompt: '是否发生过晕厥？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'fast.trop', clinicalLabel: '肌钙蛋白升高', patientPrompt: '肌钙蛋白是否升高？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 2, patientSummary: '院内不良事件约 1–2%。', clinicianNote: '0–2 分' },
    { id: 'high', label: '高危', minScore: 3, maxScore: 3, patientSummary: '院内不良事件约 10–15%。', clinicianNote: '3 分', actionHint: '建议住院监护。' },
  ],
});
