import type { ScaleDefinition } from '@vte/scoring-core';
export { GLOBAL_DISCLAIMERS } from './common.js';
import { wellsDvt } from './scales/wells-dvt.js';
import { wellsPe } from './scales/wells-pe.js';
import { geneva } from './scales/geneva.js';
import { spesi } from './scales/spesi.js';
import { padua } from './scales/padua.js';
import { improveVte } from './scales/improve-vte.js';
import { caprini } from './scales/caprini.js';
import { hasBled } from './scales/has-bled.js';
import { herdoo2 } from './scales/herdoo2.js';
import { dash } from './scales/dash.js';
import { rieteBleeding } from './scales/riete-bleeding.js';
import { improveBleeding } from './scales/improve-bleeding.js';
import { vteBleed } from './scales/vte-bleed.js';
import { khorana } from './scales/khorana.js';
import { perc } from './scales/perc.js';
import { years } from './scales/years.js';
import { bova } from './scales/bova.js';
import { fast } from './scales/fast.js';
import { mts } from './scales/mts.js';
import { villalta } from './scales/villalta.js';
import { dvtQol, pembQol, pesi } from './scales/placeholders.js';

export const allScales: ScaleDefinition[] = [
  wellsDvt,
  wellsPe,
  geneva,
  spesi,
  padua,
  improveVte,
  caprini,
  hasBled,
  herdoo2,
  dash,
  rieteBleeding,
  improveBleeding,
  vteBleed,
  khorana,
  perc,
  years,
  bova,
  fast,
  mts,
  villalta,
  pesi,
  pembQol,
  dvtQol,
];

export const liveScales = allScales.filter((s) => s.status === 'live');

export function getScaleById(id: string): ScaleDefinition | undefined {
  return allScales.find((s) => s.id === id);
}

export const CATEGORY_LABELS: Record<string, string> = {
  pretest: 'VTE 验前概率',
  severity: '严重度与预后',
  duration: '抗凝疗程与复发',
  bleeding: '抗凝出血风险',
  prevention: '住院 VTE 预防',
  pts: 'PTS 与生活质量',
};

export {
  wellsDvt,
  wellsPe,
  geneva,
  spesi,
  padua,
  improveVte,
  caprini,
  hasBled,
  herdoo2,
  dash,
  rieteBleeding,
  improveBleeding,
  vteBleed,
  khorana,
  perc,
  years,
  bova,
  fast,
  mts,
  villalta,
};
