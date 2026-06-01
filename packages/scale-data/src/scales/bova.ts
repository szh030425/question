import { baseScale } from '../common.js';

export const bova = baseScale({
  id: 'bova',
  name: 'Bova Score',
  category: 'severity',
  categoryLabel: '严重度与预后',
  description: '血压正常急性 PE 患者 30 天死亡风险分期。',
  scenario: '收缩压≥90mmHg 的急性 PE',
  reference: 'Bova C et al. Eur Respir J 2014',
  year: '2014',
  type: 'matrix',
  algorithmId: 'matrix',
  needsLab: true,
  eligibility: { notes: '仅适用于血压正常（收缩压≥90mmHg）的急性 PE。', soft: true },
  items: [
    { id: 'bova.troponin', clinicalLabel: '肌钙蛋白升高', patientPrompt: '血肌钙蛋白是否升高？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'bova.rv', clinicalLabel: '右心功能障碍', patientPrompt: '心脏超声或 CT 是否提示右心功能障碍？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'stage1', label: 'Stage I（低危）', patientSummary: '30 天死亡风险约 2.3%。', clinicianNote: '肌钙蛋白正常且无 RV 功能障碍' },
    { id: 'stage2', label: 'Stage II（中危）', patientSummary: '30 天死亡风险约 11.4%。', clinicianNote: '肌钙蛋白升高或 RV 功能障碍（二选一）', actionHint: '请尽快专科评估。' },
    { id: 'stage3', label: 'Stage III（高危）', patientSummary: '30 天死亡风险约 24.7%。', clinicianNote: '肌钙蛋白升高且 RV 功能障碍', actionHint: '请尽快住院评估。' },
  ],
});
