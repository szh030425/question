import { baseScale } from '../common.js';

export const rieteBleeding = baseScale({
  id: 'riete-bleeding',
  name: 'RIETE Bleeding Score',
  category: 'bleeding',
  categoryLabel: '抗凝出血风险',
  description: 'VTE 抗凝患者大出血风险预测。',
  scenario: 'VTE 患者抗凝治疗中',
  reference: 'Ruíz-Giménez N et al. Am J Hematol 2008',
  year: '2008',
  needsLab: true,
  estimatedItems: 6,
  items: [
    { id: 'riete.recent', clinicalLabel: '近期大出血（<15天）', patientPrompt: '近 15 天内是否有大出血？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'riete.creatinine', clinicalLabel: '肌酐 >1.2 mg/dL', patientPrompt: '血肌酐是否 >1.2 mg/dL？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'riete.anemia', clinicalLabel: '贫血', patientPrompt: '是否有贫血？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'riete.cancer', clinicalLabel: '恶性肿瘤', patientPrompt: '是否有恶性肿瘤？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'riete.pe', clinicalLabel: '临床明显 PE', patientPrompt: '是否为临床明显的肺栓塞？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'riete.age', clinicalLabel: '年龄 >75 岁', patientPrompt: '是否年满 75 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'very_low', label: '极低危', maxScore: 0, patientSummary: '大出血风险极低。', clinicianNote: '0 分' },
    { id: 'moderate', label: '中危', minScore: 1, maxScore: 4, patientSummary: '大出血风险中等。', clinicianNote: '1–4 分' },
    { id: 'high', label: '高危', minScore: 4.01, patientSummary: '大出血风险高。', clinicianNote: '>4 分', actionHint: '请加强监测并与医生讨论。' },
  ],
});
