// Geometry for the landing-page "spine": one continuous trail built from nodes.
// Consecutive nodes are joined by a cubic curve with vertical tangents at both ends,
// so the trail always flows downward and runs straight wherever two nodes share an x.
// The trail is drawn as a filled outline (centerline offset by half the width on each
// side), which lets the width change smoothly from section to section.

const smooth = (t) => t * t * (3 - 2 * t);
const easeIn = (t) => t ** 2.6;

function cubic(p0, c1, c2, p3, t) {
  const u = 1 - t;
  const x = u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p3.x;
  const y = u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p3.y;
  const dx = 3 * u * u * (c1.x - p0.x) + 6 * u * t * (c2.x - c1.x) + 3 * t * t * (p3.x - c2.x);
  const dy = 3 * u * u * (c1.y - p0.y) + 6 * u * t * (c2.y - c1.y) + 3 * t * t * (p3.y - c2.y);
  return { x, y, dx, dy };
}

/**
 * @param {Array<{x:number,y:number,w:number,flare?:boolean}>} nodes strictly increasing y
 * @returns {{ samples: Array<{x,y,w,nx,ny}>, start, end }}
 */
export function buildSpine(nodes) {
  const samples = [];
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const a = nodes[i];
    const b = nodes[i + 1];
    const dy = b.y - a.y;
    if (dy <= 0) continue;
    const c1 = { x: a.x, y: a.y + dy * 0.55 };
    const c2 = { x: b.x, y: b.y - dy * 0.55 };
    const steps = Math.max(8, Math.ceil(dy / 10));
    const ease = b.flare ? easeIn : smooth;
    for (let s = i === 0 ? 0 : 1; s <= steps; s += 1) {
      const t = s / steps;
      const p = cubic(a, c1, c2, b, t);
      const len = Math.hypot(p.dx, p.dy) || 1;
      samples.push({ x: p.x, y: p.y, nx: -p.dy / len, ny: p.dx / len, w: a.w + (b.w - a.w) * ease(t) });
    }
  }
  if (samples.length < 2) return { samples: [], start: null, end: null };
  return {
    samples,
    start: samples[0],
    end: samples[samples.length - 1],
  };
}

const f = (n) => n.toFixed(1);
const edge = (p, side) => `${f(p.x + (side * p.nx * p.w) / 2)} ${f(p.y + (side * p.ny * p.w) / 2)}`;

/**
 * Outline and centerline of the trail from its start down to depth `y`.
 * The cut at `y` is perpendicular to the trail, so a circle of radius w/2 at `tip`
 * closes it with a true round cap even on a curve.
 */
export function partialSpine(samples, y) {
  if (!samples.length || y <= samples[0].y) return null;
  let k = samples.length - 1;
  let tip = samples[k];
  if (y < tip.y) {
    let lo = 0;
    let hi = samples.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].y <= y) lo = mid;
      else hi = mid;
    }
    const a = samples[lo];
    const b = samples[hi];
    const t = (y - a.y) / (b.y - a.y || 1);
    const lerp = (key) => a[key] + (b[key] - a[key]) * t;
    tip = { x: lerp('x'), y, w: lerp('w'), nx: lerp('nx'), ny: lerp('ny') };
    k = lo;
  }
  const pts = samples.slice(0, k + 1);
  pts.push(tip);
  const left = pts.map((p) => edge(p, 1));
  const right = pts.map((p) => edge(p, -1)).reverse();
  return {
    outline: `M${left.join(' L')} L${right.join(' L')} Z`,
    centerline: `M${pts.map((p) => `${f(p.x)} ${f(p.y)}`).join(' L')}`,
    tip,
    complete: k === samples.length - 1,
  };
}
