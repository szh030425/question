import { baseScale } from '../common.js';

export const khorana = baseScale({
  id: 'khorana',
  name: 'Khorana Score',
  category: 'prevention',
  categoryLabel: '住院 VTE 预防',
  description: '肿瘤门诊化疗患者 VTE 风险预测。',
  scenario: '接受化疗的肿瘤门诊患者',
  reference: 'Khorana AA et al. Blood 2008',
  year: '2008',
  needsLab: true,
  estimatedItems: 6,
  items: [
    { id: 'khorana.site', clinicalLabel: '胃癌/胰腺癌', patientPrompt: '肿瘤原发部位是否为胃或胰腺？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'khorana.other', clinicalLabel: '肺癌/淋巴瘤等', patientPrompt: '是否为肺、淋巴瘤、妇科、膀胱或睾丸癌？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'khorana.platelet', clinicalLabel: '血小板 ≥350', patientPrompt: '血小板是否 ≥350×10⁹/L？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'khorana.hgb', clinicalLabel: '血红蛋白 <10 g/dL', patientPrompt: '血红蛋白是否 <10 g/dL？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'khorana.wbc', clinicalLabel: '白细胞 >11', patientPrompt: '白细胞是否 >11×10⁹/L？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'khorana.bmi', clinicalLabel: 'BMI ≥35', patientPrompt: 'BMI 是否 ≥35？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 0, patientSummary: '6 个月 VTE 风险约 0.3–1.5%。', clinicianNote: '0 分' },
    { id: 'moderate', label: '中危', minScore: 1, maxScore: 2, patientSummary: '6 个月风险约 1.8–4.8%。', clinicianNote: '1–2 分' },
    { id: 'high', label: '高危', minScore: 3, patientSummary: '6 个月风险约 6.7–12.9%。', clinicianNote: '≥3 分', actionHint: '请与肿瘤科医生讨论预防。' },
  ],
});
