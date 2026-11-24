import { standardSprings } from './generated/sys.ts';

export interface Spring {
  damping: number;
  stiffness: number;
}

export type SpringToken =
  | 'default-effects'
  | 'default-spatial'
  | 'fast-effects'
  | 'fast-spatial'
  | 'slow-effects'
  | 'slow-spatial';

export type MotionScheme = 'expressive' | 'standard';

// `expressive` spatial springs come from Compose's ExpressiveMotionTokens.kt; @material/web only exports `standard`.
export const springs: Record<MotionScheme, Record<SpringToken, Spring>> = {
  standard: standardSprings,
  expressive: {
    'fast-spatial': { damping: 0.6, stiffness: 800 },
    'default-spatial': { damping: 0.8, stiffness: 380 },
    'slow-spatial': { damping: 0.8, stiffness: 200 },
    'fast-effects': standardSprings['fast-effects'],
    'default-effects': standardSprings['default-effects'],
    'slow-effects': standardSprings['slow-effects'],
  },
};

export function springProgress({ damping, stiffness }: Spring, t: number): number {
  const omega = Math.sqrt(stiffness);
  if (damping < 1) {
    const decay = damping * omega;
    const omegaD = omega * Math.sqrt(1 - damping * damping);
    return (
      1 - Math.exp(-decay * t) * (Math.cos(omegaD * t) + (decay / omegaD) * Math.sin(omegaD * t))
    );
  }
  if (damping === 1) return 1 - Math.exp(-omega * t) * (1 + omega * t);
  const root = omega * Math.sqrt(damping * damping - 1);
  const r1 = -damping * omega + root;
  const r2 = -damping * omega - root;
  return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
}

interface Point {
  t: number;
  x: number;
}

function simplify(points: Point[], epsilon: number): Point[] {
  if (points.length < 3) return points;
  const first = points.at(0);
  const last = points.at(-1);
  if (!first || !last) return points;
  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i];
    if (!p) continue;
    const ratio = (p.t - first.t) / (last.t - first.t);
    const distance = Math.abs(p.x - (first.x + ratio * (last.x - first.x)));
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }
  if (maxDistance <= epsilon) return [first, last];
  const left = simplify(points.slice(0, index + 1), epsilon);
  const right = simplify(points.slice(index), epsilon);
  return [...left.slice(0, -1), ...right];
}

const round = (value: number, digits: number) => Number(value.toFixed(digits));

export interface SpringEasing {
  durationMs: number;
  easing: string;
}

export function springEasing(
  spring: Spring,
  { threshold = 0.002, epsilon = 0.0015, stepMs = 2 } = {},
): SpringEasing {
  let settledAt = 0;
  for (let ms = 0; ms <= 5000; ms += 1) {
    if (Math.abs(1 - springProgress(spring, ms / 1000)) > threshold) settledAt = ms + 1;
  }
  const durationMs = Math.max(settledAt, 1);
  const samples: Point[] = [];
  for (let ms = 0; ms <= durationMs; ms += stepMs) {
    samples.push({ t: ms / durationMs, x: springProgress(spring, ms / 1000) });
  }
  samples.push({ t: 1, x: 1 });
  const points = simplify(samples, epsilon);
  const stops = points.map(({ t, x }, i) => {
    if (i === 0) return '0';
    if (i === points.length - 1) return '1';
    return `${round(x, 4)} ${round(t * 100, 2)}%`;
  });
  return { durationMs, easing: `linear(${stops.join(', ')})` };
}
