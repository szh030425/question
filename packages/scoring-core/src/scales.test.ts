import { describe, expect, it } from 'vitest';
import { scoreScale } from './engine.js';
import { padua, spesi, perc, years, herdoo2 } from '@vte/scale-data';

describe('batch1 scales', () => {
  it('padua low risk', () => {
    const answers: Record<string, boolean> = {};
    for (const item of padua.items) answers[item.id] = false;
    const r = scoreScale(padua, answers);
    expect(r.totalScore).toBe(0);
    expect(r.tierId).toBe('low');
  });

  it('padua high risk', () => {
    const r = scoreScale(padua, {
      'padua.cancer': true,
      'padua.vte': true,
      'padua.mobility': false,
      'padua.thrombophilia': false,
      'padua.trauma': false,
      'padua.age': false,
      'padua.heart': false,
      'padua.mi': false,
      'padua.infection': false,
      'padua.bmi': false,
      'padua.hormone': false,
    });
    expect(r.totalScore).toBe(6);
    expect(r.tierId).toBe('high');
  });

  it('spesi high with one point', () => {
    const r = scoreScale(spesi, { 'spesi.age': true });
    expect(r.tierId).toBe('high');
  });
});

describe('algorithm scales', () => {
  it('perc all negative excludes', () => {
    const answers: Record<string, boolean> = {};
    for (const item of perc.items) answers[item.id] = false;
    const r = scoreScale(perc, answers);
    expect(r.tierId).toBe('excluded');
  });

  it('years exclude with low d-dimer', () => {
    const r = scoreScale(years, {
      'years.pe_likely': false,
      'years.dvt_signs': false,
      'years.hemoptysis': false,
      'years.ddimer': 800,
    });
    expect(r.tierId).toBe('exclude');
  });
});

describe('eligibility scales', () => {
  it('herdoo2 low', () => {
    const answers: Record<string, boolean> = {};
    for (const item of herdoo2.items) answers[item.id] = false;
    const r = scoreScale(herdoo2, answers);
    expect(r.tierId).toBe('low');
  });
});
