import { baseScale } from '../common.js';

export const vteBleed = baseScale({
  id: 'vte-bleed',
  name: 'VTE-BLEED',
  category: 'bleeding',
  categoryLabel: '抗凝出血风险',
  description: 'VTE 延长抗凝期间出血风险评估（基于 RIETE，简化条目）。',
  scenario: '考虑延长抗凝的 VTE 患者',
  reference: 'RIETE 数据库 2016',
  year: '2016',
  formulaNote: '≥7 分高出血风险，建议避免延长抗凝。与 RIETE 类似，权重略有差异。',
  items: [
    { id: 'vte-bleed.recent', clinicalLabel: '近期出血史', patientPrompt: '近期是否有出血史？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'vte-bleed.renal', clinicalLabel: '肾功能不全', patientPrompt: '是否有肾功能不全？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'vte-bleed.anemia', clinicalLabel: '贫血', patientPrompt: '是否有贫血？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'vte-bleed.cancer', clinicalLabel: '恶性肿瘤', patientPrompt: '是否有恶性肿瘤？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'vte-bleed.age', clinicalLabel: '年龄 >75 岁', patientPrompt: '是否 >75 岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'vte-bleed.antiplatelet', clinicalLabel: '抗血小板药物', patientPrompt: '是否联用抗血小板药？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '出血风险可接受', maxScore: 6.99, patientSummary: '延长抗凝出血风险相对较低。', clinicianNote: '<7 分' },
    { id: 'high', label: '高出血风险', minScore: 7, patientSummary: '≥7 分：高出血风险，建议避免延长抗凝。', clinicianNote: '≥7 分', actionHint: '请与专科医生讨论是否延长抗凝。' },
  ],
});
