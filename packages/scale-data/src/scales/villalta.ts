import { baseScale } from '../common.js';

const symptom = (id: string, label: string) => ({
  id: `villalta.${id}`,
  clinicalLabel: label,
  patientPrompt: `请评价「${label}」的严重程度`,
  inputType: 'single' as const,
  options: [
    { value: 0, label: '无', patientLabel: '没有', points: 0 },
    { value: 1, label: '轻度（偶发）', patientLabel: '偶尔有', points: 1 },
    { value: 2, label: '中度（经常）', patientLabel: '经常有', points: 2 },
    { value: 3, label: '重度（持续）', patientLabel: '一直有', points: 3 },
  ],
});

export const villalta = baseScale({
  id: 'villalta',
  name: 'Villalta Score',
  category: 'pts',
  categoryLabel: '血栓后综合征',
  description: 'PTS 诊断与严重程度（0–33 分）。',
  scenario: '深静脉血栓后随访',
  reference: 'Villalta S et al. 1995',
  year: '1995',
  type: 'tiered',
  estimatedItems: 12,
  items: [
    symptom('pain', '疼痛'),
    symptom('cramp', '痉挛'),
    symptom('heavy', '沉重感'),
    symptom('itch', '瘙痒'),
    symptom('paresthesia', '感觉异常'),
    symptom('edema', '水肿'),
    symptom('induration', '皮肤硬化'),
    symptom('pigment', '色素沉着'),
    symptom('ectasia', '静脉扩张'),
    symptom('redness', '发红'),
    symptom('tenderness', '小腿压痛'),
    { id: 'villalta.ulcer', clinicalLabel: '静脉溃疡', patientPrompt: '目前是否有活动性静脉溃疡？', inputType: 'boolean', scoreWhenTrue: 0, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'none', label: '无 PTS', maxScore: 4, patientSummary: '0–4 分：无血栓后综合征。', clinicianNote: '0–4 分' },
    { id: 'mild', label: '轻度 PTS', minScore: 5, maxScore: 9, patientSummary: '5–9 分：轻度 PTS。', clinicianNote: '5–9 分' },
    { id: 'moderate', label: '中度 PTS', minScore: 10, maxScore: 14, patientSummary: '10–14 分：中度 PTS。', clinicianNote: '10–14 分', actionHint: '建议血管专科随访。' },
    { id: 'severe', label: '重度 PTS', minScore: 15, patientSummary: '≥15 分或存在溃疡：重度 PTS。', clinicianNote: '≥15 分或溃疡', actionHint: '建议血管专科评估治疗。' },
  ],
});
