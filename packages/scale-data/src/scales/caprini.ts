import { baseScale } from '../common.js';

const ageItems = [
  { id: 'caprini.age41', clinicalLabel: '年龄 41-60 岁', patientPrompt: '您的年龄是否在 41–60 岁？', inputType: 'boolean' as const, scoreWhenTrue: 1, scoreWhenFalse: 0 },
  { id: 'caprini.age61', clinicalLabel: '年龄 61-74 岁', patientPrompt: '您的年龄是否在 61–74 岁？', inputType: 'boolean' as const, scoreWhenTrue: 2, scoreWhenFalse: 0 },
  { id: 'caprini.age75', clinicalLabel: '年龄 ≥75 岁', patientPrompt: '您是否年满 75 周岁？', inputType: 'boolean' as const, scoreWhenTrue: 3, scoreWhenFalse: 0 },
];

export const caprini = baseScale({
  id: 'caprini',
  name: 'Caprini Score',
  category: 'prevention',
  categoryLabel: '住院 VTE 预防',
  description: '外科住院患者 VTE 风险分层。',
  scenario: '外科病房住院患者',
  reference: 'Caprini JA et al. 2005',
  year: '2005',
  estimatedItems: 14,
  formulaNote: '年龄分段互斥，请只选符合您年龄的一项。',
  items: [
    ...ageItems,
    { id: 'caprini.bmi', clinicalLabel: 'BMI >25', patientPrompt: '您的 BMI 是否大于 25？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'caprini.edema', clinicalLabel: '下肢水肿', patientPrompt: '您是否有下肢水肿？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'caprini.varicose', clinicalLabel: '静脉曲张', patientPrompt: '您是否有静脉曲张？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'caprini.pregnancy', clinicalLabel: '妊娠/产后', patientPrompt: '您是否妊娠或产后阶段？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'caprini.vte', clinicalLabel: '既往 DVT/PE', patientPrompt: '您是否有过 DVT 或 PE？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'caprini.family', clinicalLabel: '家族史 VTE', patientPrompt: '直系亲属是否有 VTE 病史？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'caprini.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否活动性癌症？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'caprini.surgery', clinicalLabel: '大手术（>45min）', patientPrompt: '本次是否大手术且超过 45 分钟？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'caprini.lap', clinicalLabel: '腹腔镜手术（>45min）', patientPrompt: '是否腹腔镜手术超过 45 分钟？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'caprini.bed', clinicalLabel: '卧床 >72h', patientPrompt: '是否卧床超过 72 小时？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'caprini.cvc', clinicalLabel: '中心静脉置管', patientPrompt: '是否有中心静脉导管？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'caprini.major', clinicalLabel: '关节置换/骨折/脊髓损伤', patientPrompt: '是否关节置换、重大骨折或脊髓损伤？', inputType: 'boolean', scoreWhenTrue: 5, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'very_low', label: '极低危', maxScore: 1, patientSummary: 'VTE 风险极低。', clinicianNote: '0–1 分' },
    { id: 'low', label: '低危', minScore: 2, maxScore: 2, patientSummary: 'VTE 风险低。', clinicianNote: '2 分' },
    { id: 'moderate', label: '中危', minScore: 3, maxScore: 4, patientSummary: 'VTE 风险中等。', clinicianNote: '3–4 分' },
    { id: 'high', label: '高危', minScore: 5, maxScore: 8, patientSummary: 'VTE 风险高。', clinicianNote: '5–8 分', actionHint: '请与医生讨论预防方案。' },
    { id: 'very_high', label: '极高危', minScore: 9, patientSummary: 'VTE 风险极高。', clinicianNote: '≥9 分', actionHint: '请与医生讨论强化预防。' },
  ],
});
