import { baseScale } from '../common.js';

export const mts = baseScale({
  id: 'mts',
  name: 'MTS 分类',
  nameEn: 'Massive / Submassive / Low-risk PE',
  category: 'severity',
  categoryLabel: '严重度与预后',
  description: 'PE 血流动力学严重程度分级，指导再灌注策略。',
  scenario: '急性肺栓塞血流动力学评估',
  reference: 'Jaff MR et al. / AHA 2011',
  year: '2011',
  type: 'matrix',
  algorithmId: 'matrix',
  items: [
    {
      id: 'mts.category',
      clinicalLabel: '血流动力学分类',
      patientPrompt: '根据医生评估，请选择最符合您当前情况的分类（需医生协助）',
      inputType: 'single',
      options: [
        { value: 'massive', label: '高危（Massive）— 休克或收缩压<90mmHg', patientLabel: '高危：血压很低或休克', points: 0 },
        { value: 'submassive', label: '中危（Submassive）— 血压正常但有右心功能障碍或心肌坏死', patientLabel: '中危：血压正常但心脏受累', points: 0 },
        { value: 'low', label: '低危（Low-risk）— 血压正常且无右心功能障碍', patientLabel: '低危：血压正常且心脏检查无明显受累', points: 0 },
      ],
    },
  ],
  tiers: [
    { id: 'massive', label: '高危（Massive）', patientSummary: '30 天死亡率约 65%，需紧急再灌注评估。', clinicianNote: '立即溶栓/取栓指征', actionHint: '请立即急诊就医。' },
    { id: 'submassive', label: '中危（Submassive）', patientSummary: '30 天死亡率 5–25%，需住院监护。', clinicianNote: '考虑溶栓（有争议）', actionHint: '请尽快住院。' },
    { id: 'low', label: '低危（Low-risk）', patientSummary: '30 天死亡率约 1%，通常单纯抗凝。', clinicianNote: '单纯抗凝', actionHint: '请遵医嘱治疗与随访。' },
  ],
});
