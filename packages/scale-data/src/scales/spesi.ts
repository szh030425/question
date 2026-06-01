import { baseScale } from '../common.js';

export const spesi = baseScale({
  id: 'spesi',
  name: 'sPESI',
  nameEn: 'simplified PESI',
  category: 'severity',
  categoryLabel: '严重度与预后',
  description: '简化版肺栓塞严重指数，评估 30 天死亡风险分层。',
  scenario: '确诊或高度怀疑 PE 的患者',
  reference: 'Jimenez D et al. Arch Intern Med 2011',
  year: '2011',
  needsLab: true,
  estimatedItems: 6,
  items: [
    { id: 'spesi.age', clinicalLabel: '年龄 >80 岁', patientPrompt: '您是否年满 80 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'spesi.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否患有活动性癌症？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'spesi.cardiopulm', clinicalLabel: '既往慢性心肺疾病', patientPrompt: '您是否有慢性心脏病或肺部疾病史？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'spesi.hr', clinicalLabel: '心率 ≥110 次/分', patientPrompt: '您的心率是否 ≥110 次/分？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'spesi.bp', clinicalLabel: '收缩压 <100 mmHg', patientPrompt: '您的收缩压是否低于 100 mmHg？', helpText: '需测量血压。', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'spesi.spo2', clinicalLabel: '血氧饱和度 <90%', patientPrompt: '您的血氧饱和度是否低于 90%？', helpText: '需血气或脉搏血氧监测。', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低危', maxScore: 0, patientSummary: '30 天死亡率约 1.0%（文献数据）。', clinicianNote: '0 分 = 低危', actionHint: '请遵医嘱治疗与随访。' },
    { id: 'high', label: '高危', minScore: 1, patientSummary: '30 天死亡率约 8.9%（文献数据）。建议住院或加强监护。', clinicianNote: '≥1 分 = 高危', actionHint: '请尽快就医，可能需要住院评估。' },
  ],
});
