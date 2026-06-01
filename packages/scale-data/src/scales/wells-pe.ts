import { baseScale } from '../common.js';

export const wellsPe = baseScale({
  id: 'wells-pe',
  name: 'Wells PE Score',
  category: 'pretest',
  categoryLabel: 'VTE 验前概率',
  description: '评估肺栓塞（PE）的临床验前概率。',
  scenario: '疑似急性肺栓塞患者',
  reference: 'Wells PS et al. Thromb Haemost 2000',
  year: '2000',
  estimatedItems: 7,
  formulaNote: '二分类：≤4 分 PE 不太可能，>4 分 PE 可能。',
  items: [
    { id: 'wells-pe.history', clinicalLabel: '既往 DVT/PE 病史', patientPrompt: '您是否曾被诊断过深静脉血栓或肺栓塞？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'wells-pe.hr', clinicalLabel: '心率 >100 次/分', patientPrompt: '您近期静息心率是否超过 100 次/分？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'wells-pe.surgery', clinicalLabel: '近4周内手术或制动', patientPrompt: '过去4周内您是否做过手术，或肢体制动？', inputType: 'boolean', scoreWhenTrue: 1.5, scoreWhenFalse: 0 },
    { id: 'wells-pe.dvt', clinicalLabel: 'DVT 临床体征', patientPrompt: '医生是否发现您有深静脉血栓的临床体征？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'wells-pe.alt', clinicalLabel: '其他诊断可能性 <PE', patientPrompt: '医生是否认为肺栓塞比其它诊断更可能？', helpText: '临床判断项。', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0, requiresClinician: true },
    { id: 'wells-pe.hemoptysis', clinicalLabel: '咯血', patientPrompt: '您是否咳出过血或痰中带血？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'wells-pe.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否患有活动性癌症（正在治疗或姑息阶段）？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'unlikely', label: 'PE 不太可能', maxScore: 4, patientSummary: '验前概率较低（≤4 分）。仍需结合 D-二聚体或影像，由医生决定。', clinicianNote: '≤4 分', actionHint: '请就医，完善 D-二聚体等检查。' },
    { id: 'likely', label: 'PE 可能', minScore: 4.01, patientSummary: '验前概率较高（>4 分）。请尽快就医评估。', clinicianNote: '>4 分', actionHint: '请尽快就医，可能需要 CTPA 等检查。' },
  ],
});
