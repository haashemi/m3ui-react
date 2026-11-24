import { describe, expect, it } from 'vite-plus/test';

import { springEasing, springProgress, springs } from '../src/motion.ts';

const stops = (easing: string) =>
  easing
    .slice('linear('.length, -1)
    .split(', ')
    .map((stop) => Number(stop.split(' ')[0]));

describe(springProgress, () => {
  it('starts at rest and settles on the target', () => {
    const spring = springs.expressive['default-spatial'];
    expect(springProgress(spring, 0)).toBeCloseTo(0, 6);
    expect(springProgress(spring, 2)).toBeCloseTo(1, 4);
  });

  it('handles critically damped and overdamped springs', () => {
    expect(springProgress({ damping: 1, stiffness: 400 }, 1)).toBeCloseTo(1, 3);
    expect(springProgress({ damping: 1.5, stiffness: 400 }, 3)).toBeCloseTo(1, 3);
  });
});

describe(springEasing, () => {
  it('matches the published duration of the expressive fast spatial spring', () => {
    const { durationMs } = springEasing(springs.expressive['fast-spatial']);
    expect(durationMs).toBeGreaterThan(300);
    expect(durationMs).toBeLessThan(400);
  });

  it('overshoots for bouncy springs and not for effects springs', () => {
    const bouncy = stops(springEasing(springs.expressive['fast-spatial']).easing);
    const effects = stops(springEasing(springs.expressive['fast-effects']).easing);
    expect(Math.max(...bouncy)).toBeGreaterThan(1.05);
    expect(Math.max(...effects)).toBeLessThanOrEqual(1);
  });

  it('produces a valid linear() easing from 0 to 1', () => {
    const { easing } = springEasing(springs.standard['slow-spatial']);
    expect(easing.startsWith('linear(0, ')).toBe(true);
    expect(easing.endsWith(', 1)')).toBe(true);
  });
});
