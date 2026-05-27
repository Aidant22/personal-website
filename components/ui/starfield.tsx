"use client";
import React, { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; px: number; py: number };

export default function Starfield({
  count = 600,
  finalSpeed = 0.004,
  burstMultiplier = 3,
  burstSpeedMultiplier = 8,
  burstDuration = 2000,
  transitionDuration = 1500,
}: {
  count?: number;
  finalSpeed?: number; // final slow twinkle speed
  burstMultiplier?: number; // how many more stars initially
  burstSpeedMultiplier?: number; // how much faster initially
  burstDuration?: number; // ms
  transitionDuration?: number; // ms
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const maxCount = Math.max(1, Math.floor(count * burstMultiplier));

    function initStars() {
      starsRef.current = Array.from({ length: maxCount }).map(() => ({
        x: (Math.random() * 2 - 1) * w,
        y: (Math.random() * 2 - 1) * h,
        z: Math.random() * w + 1,
        px: 0,
        py: 0,
      }));
    }

    initStars();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", onResize);

    let last = performance.now();
    startRef.current = last;

    function render(now: number) {
      const dt = Math.min(2, (now - last) / 16.666);
      last = now;

      const start = startRef.current ?? 0;
      const elapsed = Math.max(0, now - start);
      const burstEnd = burstDuration;
      const transitionEnd = burstDuration + transitionDuration;

      // active count transitions from maxCount -> count over transition
      const p = Math.min(1, Math.max(0, (elapsed - burstEnd) / transitionDuration));
      const activeCount = elapsed < burstEnd ? maxCount : Math.round(maxCount - (maxCount - count) * p);

      // speed interpolation: start at finalSpeed * burstSpeedMultiplier, go to finalSpeed
      const speedNow = elapsed < burstEnd
        ? finalSpeed * burstSpeedMultiplier
        : finalSpeed * (burstSpeedMultiplier - (burstSpeedMultiplier - 1) * p);

      // fade previous frame slightly to create trails; reduce alpha after burst for twinkle
      const fadeAlpha = elapsed < burstEnd ? 0.45 : 0.85; // lower = longer trails during burst
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      // draw only active stars (starts at maxCount, reduces to `count`)
      for (let i = 0; i < activeCount; i++) {
        const s = starsRef.current[i];
        s.z -= speedNow * w * dt;
        if (s.z <= 1) {
          s.x = (Math.random() * 2 - 1) * w;
          s.y = (Math.random() * 2 - 1) * h;
          s.z = w;
          s.px = 0;
          s.py = 0;
        }

        const sx = (s.x / s.z) * (w / 2) + w / 2;
        const sy = (s.y / s.z) * (h / 2) + h / 2;
        const r = Math.max(0.5, (1 - s.z / w) * 3);

        // twinkle effect after transition: small opacity modulation
        const twinkle = elapsed > transitionEnd ? 0.5 + 0.5 * Math.sin((now + i * 37) * 0.01) : 1;
        const opacity = Math.min(1, (1 - s.z / w) * 1.5) * twinkle;

        if (s.px && s.py && elapsed < burstEnd + 80) {
          // draw trails during immediate burst
          ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
          ctx.lineWidth = r;
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${opacity})`;
          ctx.fillRect(sx, sy, r, r);
        }

        s.px = sx;
        s.py = sy;
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, finalSpeed, burstMultiplier, burstSpeedMultiplier, burstDuration, transitionDuration]);

  return (
    <canvas
      ref={canvasRef}
      data-generated="true"
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    />
  );
}
