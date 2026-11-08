"use client";
import { useEffect, useRef } from "react";

// Domain-warped fbm smoke folded into sine bands: red field, black ribbons (~20% of the area)
const FRAG = `precision highp float;
uniform vec2 res;
uniform float time;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0, amp = 0.5;
  for (int i = 0; i < 4; i++) { sum += amp * noise(p); p = p * 2.0 + vec2(3.1, 1.7); amp *= 0.5; }
  return sum;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = gl_FragCoord.xy / res.y;

  vec2 warp = vec2(fbm(p * 1.1 + time * 0.035), fbm(p * 1.1 + 4.7 - time * 0.03));
  float field = (p.x * 0.45 + p.y * 0.3 + 1.5 * fbm(p * 0.85 + warp * 1.6 + time * 0.02)) * 1.4 - time * 0.04;
  float band = 0.5 + 0.5 * sin(field * 6.2832);

  // red base with soft light/dark drift, black where the band peaks
  float glow = 0.5 + 0.5 * sin(field * 6.2832 - 2.2);
  vec3 red = mix(vec3(0.55, 0.05, 0.02), vec3(0.86, 0.13, 0.05), glow);
  float ink = smoothstep(0.79, 0.97, band);
  vec3 col = mix(red, vec3(0.035, 0.012, 0.01), ink);

  col *= 1.0 - 0.35 * length(uv - 0.5); // vignette
  gl_FragColor = vec4(col, 1.0);
}`;

const SCALE = 0.35; // render small, let CSS upscale: cheap and blurs into smoke
const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

const Backdrop = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // the solid red fallback behind the canvas stays visible

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // one oversized triangle covers the screen
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "res");
    const uTime = gl.getUniformLocation(prog, "time");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = -Infinity;
    const draw = (t: number) => {
      if (!still) raf = requestAnimationFrame(draw);
      if (t - last < 33) return; // ~30fps is plenty for slow smoke
      last = t;
      const w = Math.round(innerWidth * SCALE);
      const h = Math.round(innerHeight * SCALE);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, still ? 12 : t / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#a3140a]" aria-hidden="true">
      <canvas ref={ref} className="h-full w-full" />
      <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: NOISE }} />
    </div>
  );
};

export default Backdrop;
