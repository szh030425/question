import { baseScale } from '../common.js';

export const years = baseScale({
  id: 'years',
  name: 'YEARS Algorithm',
  category: 'pretest',
  categoryLabel: 'VTE 验前概率',
  description: '结合 D-二聚体简化 PE 诊断流程。',
  scenario: '疑似 PE，拟用 D-二聚体排除',
  reference: 'van der Hulle T et al. Lancet 2017',
  year: '2017',
  type: 'algorithm',
  algorithmId: 'algorithm',
  needsLab: true,
  estimatedItems: 4,
  formulaNote: '三项临床指标均不满足：D-二聚体 <1000 ng/mL 可排除；任一项满足：<500 ng/mL 可排除。',
  items: [
    { id: 'years.pe_likely', clinicalLabel: 'PE 为最可能诊断', patientPrompt: '医生是否认为肺栓塞是最可能的诊断？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'years.dvt_signs', clinicalLabel: 'DVT 体征', patientPrompt: '是否有深静脉血栓体征？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'years.hemoptysis', clinicalLabel: '咯血', patientPrompt: '是否咯血？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'years.ddimer', clinicalLabel: 'D-二聚体（ng/mL）', patientPrompt: '请输入 D-二聚体检测结果（ng/mL）', inputType: 'number', min: 0, max: 10000, unit: 'ng/mL' },
  ],
  tiers: [
    { id: 'exclude', label: '可排除 PE', patientSummary: 'D-二聚体低于对应阈值，文献流程中可排除 PE（需医生确认）。', clinicianNote: '低于 cutoff', actionHint: '请由医生结合临床确认。' },
    { id: 'need_ctpa', label: '需进一步检查', patientSummary: 'D-二聚体达到或超过阈值，建议 CTPA 等进一步检查。', clinicianNote: '≥ cutoff', actionHint: '请尽快就医完善影像检查。' },
  ],
});
