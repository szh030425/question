import { baseScale } from '../common.js';

export const padua = baseScale({
  id: 'padua',
  name: 'Padua Score',
  category: 'prevention',
  categoryLabel: '住院 VTE 预防',
  description: '内科住院患者 VTE 风险评估。',
  scenario: '内科病房住院患者',
  reference: 'Barbar S et al. J Thromb Haemost 2010',
  year: '2010',
  estimatedItems: 11,
  items: [
    { id: 'padua.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否患有活动性癌症？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'padua.vte', clinicalLabel: '既往 VTE', patientPrompt: '您是否有过静脉血栓栓塞（深静脉血栓或肺栓塞）？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'padua.mobility', clinicalLabel: '活动性减少（卧床≥3天）', patientPrompt: '本次住院是否卧床至少 3 天、活动明显减少？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'padua.thrombophilia', clinicalLabel: '已知血栓倾向', patientPrompt: '医生是否告知您有血栓倾向（易栓症）？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'padua.trauma', clinicalLabel: '近期创伤或手术', patientPrompt: '近 1 个月内是否有严重创伤或手术？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'padua.age', clinicalLabel: '年龄 ≥70 岁', patientPrompt: '您是否年满 70 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'padua.heart', clinicalLabel: '心力衰竭或呼吸衰竭', patientPrompt: '本次是否因心力衰竭或呼吸衰竭住院？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'padua.mi', clinicalLabel: '急性心梗或缺血性卒中', patientPrompt: '是否急性心肌梗死或缺血性脑卒中？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'padua.infection', clinicalLabel: '急性感染或风湿性疾病', patientPrompt: '是否有急性感染或活动性风湿免疫病？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'padua.bmi', clinicalLabel: 'BMI ≥30', patientPrompt: '您的体重指数（BMI）是否 ≥30？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'padua.hormone', clinicalLabel: '激素治疗', patientPrompt: '是否正在使用雌激素或激素替代治疗？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 3, patientSummary: 'VTE 风险较低（文献发生率约 0.3%）。', clinicianNote: '<4 分 = 低危', actionHint: '请遵循医护人员的预防建议。' },
    { id: 'high', label: '高危', minScore: 4, patientSummary: 'VTE 风险较高（文献发生率约 11%），通常建议药物预防。', clinicianNote: '≥4 分 = 高危，建议药物预防', actionHint: '请与主管医生讨论物理/药物预防措施。' },
  ],
});
