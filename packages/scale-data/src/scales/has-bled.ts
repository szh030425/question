import { baseScale } from '../common.js';

export const hasBled = baseScale({
  id: 'has-bled',
  name: 'HAS-BLED',
  category: 'bleeding',
  categoryLabel: '抗凝出血风险',
  description: '评估抗凝治疗相关大出血风险（房颤量表，VTE 临床常参考）。',
  scenario: '拟行或正在接受抗凝治疗的患者',
  reference: 'Pisters R et al. Chest 2010',
  year: '2010',
  estimatedItems: 9,
  formulaNote: '≥3 分提示高出血风险，需加强监测（非抗凝绝对禁忌）。',
  items: [
    { id: 'has-bled.htn', clinicalLabel: '高血压（收缩压>160mmHg）', patientPrompt: '您的收缩压是否经常高于 160 mmHg？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.renal', clinicalLabel: '肾功能异常', patientPrompt: '医生是否告知您肾功能异常？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.liver', clinicalLabel: '肝功能异常', patientPrompt: '医生是否告知您肝功能异常？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.stroke', clinicalLabel: '既往卒中', patientPrompt: '您是否有过卒中？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.bleeding', clinicalLabel: '出血史或倾向', patientPrompt: '您是否有过重大出血或出血倾向？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.inr', clinicalLabel: 'INR 不稳定', patientPrompt: '使用华法林时 INR 是否经常不稳定？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.elderly', clinicalLabel: '年龄>65岁', patientPrompt: '您是否年满 65 周岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.drugs', clinicalLabel: '联用抗血小板/NSAIDs', patientPrompt: '是否联用阿司匹林、氯吡格雷或布洛芬等 NSAIDs？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'has-bled.alcohol', clinicalLabel: '酗酒', patientPrompt: '是否有酗酒习惯？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'low', label: '出血风险较低', maxScore: 2, patientSummary: '出血风险相对较低，仍需定期随访。', clinicianNote: '0–2 分' },
    { id: 'high', label: '高出血风险', minScore: 3, patientSummary: '提示高出血风险，需加强监测与风险管理。', clinicianNote: '≥3 分：高出血风险', actionHint: '请与医生讨论监测与用药方案，非绝对禁忌抗凝。' },
  ],
});
