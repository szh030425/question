import { baseScale } from '../common.js';

export const geneva = baseScale({
  id: 'geneva',
  name: 'Revised Geneva Score',
  category: 'pretest',
  categoryLabel: 'VTE 验前概率',
  description: '以客观指标为主的 PE 验前概率评分。',
  scenario: '疑似急性肺栓塞',
  reference: 'Le Gal G et al. Ann Intern Med 2006',
  year: '2006',
  estimatedItems: 8,
  items: [
    { id: 'geneva.history', clinicalLabel: '既往 DVT/PE 病史', patientPrompt: '您是否曾被诊断过深静脉血栓或肺栓塞？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'geneva.hr75', clinicalLabel: '心率 75-94 次/分', patientPrompt: '您静息心率是否在 75–94 次/分之间？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'geneva.hr95', clinicalLabel: '心率 ≥95 次/分', patientPrompt: '您静息心率是否 ≥95 次/分？', inputType: 'boolean', scoreWhenTrue: 5, scoreWhenFalse: 0 },
    { id: 'geneva.surgery', clinicalLabel: '近1个月内手术或下肢骨折', patientPrompt: '过去1个月内您是否做过手术或下肢骨折？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'geneva.cancer', clinicalLabel: '活动性癌症', patientPrompt: '您是否患有活动性癌症？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'geneva.pain', clinicalLabel: '单侧下肢疼痛', patientPrompt: '您是否单侧下肢疼痛？', inputType: 'boolean', scoreWhenTrue: 3, scoreWhenFalse: 0 },
    { id: 'geneva.hemoptysis', clinicalLabel: '咯血', patientPrompt: '您是否咯血？', inputType: 'boolean', scoreWhenTrue: 2, scoreWhenFalse: 0 },
    { id: 'geneva.age', clinicalLabel: '年龄 >65 岁', patientPrompt: '您是否年满 65 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'geneva.male', clinicalLabel: '男性', patientPrompt: '您的性别是否为男性？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '低概率', maxScore: 3, patientSummary: 'PE 验前概率低（约 8%）。', clinicianNote: '0–3 分', actionHint: '请就医完善检查。' },
    { id: 'moderate', label: '中概率', minScore: 4, maxScore: 10, patientSummary: 'PE 验前概率中等（约 29%）。', clinicianNote: '4–10 分', actionHint: '请尽快就医。' },
    { id: 'high', label: '高概率', minScore: 11, patientSummary: 'PE 验前概率高（约 74%）。', clinicianNote: '≥11 分', actionHint: '请尽快就医评估。' },
  ],
});
