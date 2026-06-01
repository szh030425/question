import { baseScale } from '../common.js';

export const perc = baseScale({
  id: 'perc',
  name: 'PERC Rule',
  category: 'pretest',
  categoryLabel: 'VTE 验前概率',
  description: '低危患者 PE 排除标准：全部阴性可无需 D-二聚体。',
  scenario: '低危验前概率（如 Wells≤4 或 Geneva≤3）的疑似 PE',
  reference: 'Kline JA et al. J Thromb Haemost 2008',
  year: '2008',
  type: 'algorithm',
  algorithmId: 'algorithm',
  estimatedItems: 8,
  formulaNote: '8 项全部「否」方可排除 PE；任一项「是」则不能应用本规则。',
  items: [
    { id: 'perc.age', clinicalLabel: '年龄 ≥50 岁', patientPrompt: '是否 ≥50 岁？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.hr', clinicalLabel: '心率 ≥100', patientPrompt: '心率是否 ≥100 次/分？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.o2', clinicalLabel: '血氧 <95%', patientPrompt: '室内空气下血氧是否 <95%？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.hemoptysis', clinicalLabel: '咯血', patientPrompt: '是否咯血？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.surgery', clinicalLabel: '近4周手术或创伤', patientPrompt: '近 4 周是否有手术或创伤？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.dvt', clinicalLabel: 'DVT 体征', patientPrompt: '是否有 DVT 临床体征？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.edema', clinicalLabel: '单侧下肢肿胀', patientPrompt: '是否单侧下肢肿胀？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.vte', clinicalLabel: '既往 VTE', patientPrompt: '是否既往 VTE？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
    { id: 'perc.hormone', clinicalLabel: '激素/妊娠', patientPrompt: '是否妊娠或雌激素/激素替代治疗？', inputType: 'boolean', scoreWhenTrue: 1, scoreWhenFalse: 0 },
  ],
  tiers: [
    { id: 'excluded', label: '可排除 PE（PERC 全阴）', patientSummary: '低危且 PERC 全部阴性：可无需 D-二聚体直接排除 PE（仍需医生确认）。', clinicianNote: '8 项均为否', actionHint: '请由医生结合临床最终判断。' },
    { id: 'not_excluded', label: '不可应用 PERC 排除', patientSummary: '至少一项阳性，不能仅用 PERC 排除，需进一步检查。', clinicianNote: '任一项为是', actionHint: '请完善 D-二聚体或 CTPA 等。' },
  ],
});
