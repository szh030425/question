import { baseScale } from '../common.js';

export const improveBleeding = baseScale({
  id: 'improve-bleeding',
  name: 'IMPROVE Bleeding Score',
  category: 'bleeding',
  categoryLabel: '抗凝出血风险',
  description: '急性住院患者出血风险评估，指导 VTE 预防决策。',
  scenario: '急性住院患者',
  reference: 'Decousus H et al. 2011',
  year: '2011',
  estimatedItems: 12,
  items: [
    { id: 'improve-b.male', clinicalLabel: '男性', patientPrompt: '性别是否为男性？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.age40', clinicalLabel: '年龄 40-84 岁', patientPrompt: '年龄是否在 40–84 岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.age85', clinicalLabel: '年龄 >85 岁', patientPrompt: '是否年满 85 周岁？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'improve-b.gfr30', clinicalLabel: 'GFR 30-59', patientPrompt: '肾小球滤过率是否在 30–59？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.gfr低', clinicalLabel: 'GFR <30', patientPrompt: '肾小球滤过率是否 <30？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'improve-b.cancer', clinicalLabel: '活动性癌症', patientPrompt: '是否有活动性癌症？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.rheum', clinicalLabel: '风湿性疾病', patientPrompt: '是否有活动性风湿免疫病？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.cvc', clinicalLabel: '中心静脉导管', patientPrompt: '是否有中心静脉导管？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.icu', clinicalLabel: 'ICU 住院', patientPrompt: '是否在 ICU？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.platelet', clinicalLabel: '血小板 <50', patientPrompt: '血小板是否 <50×10⁹/L？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.prior', clinicalLabel: '入院前出血', patientPrompt: '入院前近期是否有出血？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.ulcer', clinicalLabel: '活动性胃溃疡', patientPrompt: '是否有活动性胃溃疡？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-b.liver', clinicalLabel: '肝衰竭', patientPrompt: '是否有肝衰竭？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低出血风险', maxScore: 6.99, patientSummary: '大出血率约 1.5%。', clinicianNote: '<7 分' },
    { id: 'high', label: '高出血风险', minScore: 7, patientSummary: '大出血率约 7.9%。', clinicianNote: '≥7 分', actionHint: '请与医生讨论 VTE 预防与抗凝平衡。' },
  ],
});
