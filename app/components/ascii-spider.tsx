"use client";
import { useEffect, useRef } from "react";

type Point = [x: number, y: number, z: number, nx: number, ny: number, nz: number];
type Vec = [number, number, number];

// Brightness ramp, darkest to brightest
const RAMP = ".,-~:;=!*#$@";

// Surface points with normals for a spider facing the viewer (y points down)
const buildSpider = () => {
  const pts: Point[] = [];

  const ellipsoid = (cx: number, cy: number, cz: number, a: number, b: number, c: number) => {
    for (let v = -Math.PI / 2; v <= Math.PI / 2; v += 0.03) {
      for (let u = 0; u < Math.PI * 2; u += 0.03) {
        const x = a * Math.cos(v) * Math.cos(u);
        const y = b * Math.sin(v);
        const z = c * Math.cos(v) * Math.sin(u);
        const nx = x / (a * a), ny = y / (b * b), nz = z / (c * c);
        const l = Math.hypot(nx, ny, nz);
        pts.push([cx + x, cy + y, cz + z, nx / l, ny / l, nz / l]);
      }
    }
  };

  // Tapered tube from p to q
  const tube = (p: Vec, q: Vec, r0: number, r1: number) => {
    const len = Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]);
    const d: Vec = [(q[0] - p[0]) / len, (q[1] - p[1]) / len, (q[2] - p[2]) / len];
    const raw: Vec = Math.abs(d[2]) < 0.9 ? [-d[1], d[0], 0] : [0, -d[2], d[1]];
    const l1 = Math.hypot(...raw);
    const e1: Vec = [raw[0] / l1, raw[1] / l1, raw[2] / l1];
    const e2: Vec = [
      d[1] * e1[2] - d[2] * e1[1],
      d[2] * e1[0] - d[0] * e1[2],
      d[0] * e1[1] - d[1] * e1[0],
    ];
    for (let t = 0; t <= len; t += 0.006) {
      const r = r0 + ((r1 - r0) * t) / len;
      for (let th = 0; th < Math.PI * 2; th += 0.5) {
        const c = Math.cos(th), s = Math.sin(th);
        const n: Vec = [c * e1[0] + s * e2[0], c * e1[1] + s * e2[1], c * e1[2] + s * e2[2]];
        pts.push([p[0] + d[0] * t + r * n[0], p[1] + d[1] * t + r * n[1], p[2] + d[2] * t + r * n[2], ...n]);
      }
    }
  };

  ellipsoid(0, 0.2, 0, 0.17, 0.22, 0.14); // abdomen
  ellipsoid(0, -0.11, 0, 0.11, 0.12, 0.08); // cephalothorax

  // [base y, knee, foot] for the right side, mirrored for the left
  const legs: [number, Vec, Vec][] = [
    [-0.19, [0.26, -0.38, 0.1], [0.36, -0.62, -0.02]],
    [-0.14, [0.33, -0.22, 0.12], [0.52, -0.32, -0.02]],
    [-0.09, [0.33, 0.0, 0.12], [0.52, 0.12, -0.02]],
    [-0.05, [0.27, 0.2, 0.1], [0.38, 0.5, -0.02]],
  ];
  for (const sx of [1, -1]) {
    for (const [by, k, f] of legs) {
      const knee: Vec = [sx * k[0], k[1], k[2]];
      tube([sx * 0.07, by, 0], knee, 0.024, 0.02);
      tube(knee, [sx * f[0], f[1], f[2]], 0.02, 0.008);
    }
  }
  return pts;
};

// Rotate around y (plus a slow x tilt), project, z-buffer, shade by a fixed light
const render = (pts: Point[], cols: number, rows: number, angle: number) => {
  const K = 2.5;
  const s = Math.min(0.72 * rows, 0.8 * cols * 0.6);
  const sx = s / 0.6, sy = s; // monospace cells are ~0.6em wide, 1em tall
  const out = new Array<string>(cols * rows).fill(" ");
  const zb = new Float32Array(cols * rows);
  const ca = Math.cos(angle), sa = Math.sin(angle);
  const tilt = 0.25 * Math.sin(angle * 0.7);
  const cb = Math.cos(tilt), sb = Math.sin(tilt);
  const lx = -0.4, ly = -0.5, lz = 0.77;

  for (const [X, Y, Z, nx, ny, nz] of pts) {
    const x1 = X * ca + Z * sa, z1 = -X * sa + Z * ca;
    const y2 = Y * cb - z1 * sb, z2 = Y * sb + z1 * cb;
    const nx1 = nx * ca + nz * sa, nz1 = -nx * sa + nz * ca;
    const ny2 = ny * cb - nz1 * sb, nz2 = ny * sb + nz1 * cb;
    if (nz2 <= 0) continue;

    const ooz = 1 / (K - z2);
    const px = Math.round(cols / 2 + x1 * sx * K * ooz);
    const py = Math.round(rows / 2 + (y2 + 0.05) * sy * K * ooz);
    if (px < 0 || py < 0 || px >= cols || py >= rows) continue;

    const i = py * cols + px;
    if (ooz <= zb[i]) continue;
    zb[i] = ooz;
    const L = Math.max(0, nx1 * lx + ny2 * ly + nz2 * lz);
    out[i] = RAMP[Math.min(RAMP.length - 1, Math.floor(L * RAMP.length))];
  }

  let str = "";
  for (let r = 0; r < rows; r++) str += out.slice(r * cols, (r + 1) * cols).join("") + "\n";
  return str;
};

const AsciiSpider = ({ cols, rows }: { cols: number; rows: number }) => {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = ref.current;
    if (!pre) return;
    const pts = buildSpider();

    // Scale the font so the grid fills the frame width
    const fit = () => {
      pre.style.fontSize = `${pre.parentElement!.clientWidth / (cols * 0.6)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(pre.parentElement!);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pre.textContent = render(pts, cols, rows, 0.5);
      return () => ro.disconnect();
    }

    // Only animate while on screen
    let raf = 0;
    const loop = (t: number) => {
      pre.textContent = render(pts, cols, rows, t / 1400);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) raf = requestAnimationFrame(loop);
    });
    io.observe(pre);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [cols, rows]);

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className="m-0 font-mono leading-none text-blood whitespace-pre select-none"
    />
  );
};

export default AsciiSpider;
