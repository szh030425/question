import { GLOBAL_DISCLAIMERS } from '../common.js';
import type { ScaleDefinition } from '@vte/scoring-core';

export const pembQol: ScaleDefinition = {
  id: 'pemb-qol',
  name: 'PEmb-QoL',
  category: 'pts',
  categoryLabel: '生活质量',
  description: '40 项 PE 特异性生活质量量表。PDF 汇编未含完整题项，需对照原始文献补充后方可交互计分。',
  scenario: '肺栓塞患者生活质量评估',
  reference: 'Cohn DM et al. J Thromb Haemost 2009',
  year: '2009',
  type: 'placeholder',
  status: 'placeholder',
  items: [],
  tiers: [],
  disclaimers: GLOBAL_DISCLAIMERS,
};

export const dvtQol: ScaleDefinition = {
  id: 'dvt-qol',
  name: 'DVT-QoL',
  category: 'pts',
  categoryLabel: '生活质量',
  description: '29 项 DVT 特异性生活质量量表。完整题项待补充。',
  scenario: '深静脉血栓患者生活质量评估',
  reference: 'Hedner E et al. Health Qual Life Outcomes 2004',
  year: '2004',
  type: 'placeholder',
  status: 'placeholder',
  items: [],
  tiers: [],
  disclaimers: GLOBAL_DISCLAIMERS,
};

export const pesi: ScaleDefinition = {
  id: 'pesi',
  name: 'PESI',
  nameEn: 'Pulmonary Embolism Severity Index',
  category: 'severity',
  categoryLabel: '严重度与预后',
  description: '完整 PESI 含多项实验室指标，待扩展。当前请使用 sPESI。',
  scenario: '急性 PE 预后分层',
  reference: 'Aujesky D et al. Arch Intern Med 2005',
  year: '2005',
  type: 'additive',
  status: 'pending',
  items: [],
  tiers: [],
  disclaimers: GLOBAL_DISCLAIMERS,
};
