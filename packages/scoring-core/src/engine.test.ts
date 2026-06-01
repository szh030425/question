import { describe, expect, it } from 'vitest';
import { scoreScale } from './engine.js';
import { wellsDvt } from '@vte/scale-data';

describe('wells-dvt golden tests', () => {
  it('low probability: all false, alternative false', () => {
    const answers: Record<string, boolean> = {};
    for (const item of wellsDvt.items) {
      answers[item.id] = false;
    }
    const r = scoreScale(wellsDvt, answers);
    expect(r.totalScore).toBe(0);
    expect(r.tierId).toBe('low');
  });

  it('moderate: 2 points', () => {
    const r = scoreScale(wellsDvt, {
      'wells-dvt.cancer': true,
      'wells-dvt.paralysis': true,
      'wells-dvt.bedridden': false,
      'wells-dvt.tenderness': false,
      'wells-dvt.swelling': false,
      'wells-dvt.calf': false,
      'wells-dvt.edema': false,
      'wells-dvt.collateral': false,
      'wells-dvt.history': false,
      'wells-dvt.alternative': false,
    });
    expect(r.totalScore).toBe(2);
    expect(r.tierId).toBe('moderate');
  });

  it('high: 3+ points', () => {
    const r = scoreScale(wellsDvt, {
      'wells-dvt.cancer': true,
      'wells-dvt.paralysis': true,
      'wells-dvt.bedridden': true,
      'wells-dvt.tenderness': false,
      'wells-dvt.swelling': false,
      'wells-dvt.calf': false,
      'wells-dvt.edema': false,
      'wells-dvt.collateral': false,
      'wells-dvt.history': false,
      'wells-dvt.alternative': false,
    });
    expect(r.totalScore).toBe(3);
    expect(r.tierId).toBe('high');
  });

  it('alternative diagnosis subtracts 2', () => {
    const r = scoreScale(wellsDvt, {
      'wells-dvt.cancer': true,
      'wells-dvt.paralysis': true,
      'wells-dvt.bedridden': true,
      'wells-dvt.tenderness': false,
      'wells-dvt.swelling': false,
      'wells-dvt.calf': false,
      'wells-dvt.edema': false,
      'wells-dvt.collateral': false,
      'wells-dvt.history': false,
      'wells-dvt.alternative': true,
    });
    expect(r.totalScore).toBe(1);
    expect(r.tierId).toBe('moderate');
  });
});
