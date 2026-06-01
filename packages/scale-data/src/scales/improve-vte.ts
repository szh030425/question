import { baseScale } from '../common.js';

export const improveVte = baseScale({
  id: 'improve-vte',
  name: 'IMPROVE VTE Score',
  category: 'prevention',
  categoryLabel: '住院 VTE 预防',
  description: '急性内科住院患者 VTE 风险评分。',
  scenario: '急性内科疾病住院患者',
  reference: 'Spyropoulos AC et al. J Thromb Haemost 2011',
  year: '2011',
  estimatedItems: 7,
  items: [
    { id: 'improve-vte.age', clinicalLabel: '年龄 >60 岁', patientPrompt: '您是否年满 60 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否患有活动性癌症？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.vte', clinicalLabel: '既往 VTE', patientPrompt: '您是否有过静脉血栓栓塞？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.icu', clinicalLabel: 'ICU 住院', patientPrompt: '本次是否在 ICU 住院？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.paralysis', clinicalLabel: '下肢瘫痪', patientPrompt: '您是否下肢瘫痪？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.thrombophilia', clinicalLabel: '血栓倾向', patientPrompt: '是否有已知血栓倾向？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'improve-vte.bed', clinicalLabel: '卧床 >7 天', patientPrompt: '本次住院是否卧床超过 7 天？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 1, patientSummary: 'VTE 风险较低。', clinicianNote: '0–1 分 = 低危', actionHint: '请遵循医护预防建议。' },
    { id: 'high', label: '高危', minScore: 2, patientSummary: 'VTE 风险较高，建议 VTE 预防。', clinicianNote: '≥2 分 = 高危', actionHint: '请与主管医生讨论预防措施。' },
  ],
});
