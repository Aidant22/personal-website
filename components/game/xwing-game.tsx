"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const SURVIVE_SECONDS = 20;
const KILL_TARGET = 8;
const START_LIVES = 3;
const PLAYER_SPEED = 340;
const FIRE_INTERVAL = 0.28;
const LASER_SPEED = 560;
const ENEMY_LASER_SPEED = 300;
const SPAWN_INTERVAL = 0.9;
const SKIP_AFTER_MS = 5000;

type Phase = "intro" | "playing" | "hit" | "won";

interface Enemy {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fire: number;
}

interface Bolt {
  x: number;
  y: number;
  vy: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface World {
  w: number;
  h: number;
  px: number;
  py: number;
  enemies: Enemy[];
  playerBolts: Bolt[];
  enemyBolts: Bolt[];
  sparks: Spark[];
  runTime: number;
  fireCd: number;
  spawnCd: number;
  invuln: number;
  lives: number;
  kills: number;
}

function clearGateCookie() {
  document.cookie = "xwing_cleared=1; path=/; SameSite=Lax";
}

function resetRun(w: World) {
  w.enemies = [];
  w.playerBolts = [];
  w.enemyBolts = [];
  w.runTime = 0;
  w.fireCd = 0;
  w.spawnCd = 0.6;
  w.kills = 0;
  w.px = w.w / 2;
  w.py = w.h * 0.8;
  w.invuln = 1.5;
}

function burst(w: World, x: number, y: number) {
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = 60 + Math.random() * 160;
    w.sparks.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.5 + Math.random() * 0.3,
    });
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "#67e8f9";
  ctx.shadowBlur = 10;
  // X wings
  ctx.strokeStyle = "#7dd3fc";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-17, -8);
  ctx.lineTo(0, 2);
  ctx.lineTo(17, -8);
  ctx.moveTo(-17, 12);
  ctx.lineTo(0, 2);
  ctx.lineTo(17, 12);
  ctx.stroke();
  // wingtip cannons
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-17, -12);
  ctx.lineTo(-17, -4);
  ctx.moveTo(17, -12);
  ctx.lineTo(17, -4);
  ctx.moveTo(-17, 8);
  ctx.lineTo(-17, 16);
  ctx.moveTo(17, 8);
  ctx.lineTo(17, 16);
  ctx.stroke();
  // fuselage
  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.moveTo(0, -16);
  ctx.lineTo(5, 10);
  ctx.lineTo(0, 6);
  ctx.lineTo(-5, 10);
  ctx.closePath();
  ctx.fill();
  // engine glow
  ctx.fillStyle = "#a5f3fc";
  ctx.fillRect(-2, 10, 4, 4);
  ctx.restore();
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy) {
  ctx.save();
  ctx.translate(e.x, e.y);
  ctx.shadowColor = "#f87171";
  ctx.shadowBlur = 8;
  // side panels
  ctx.fillStyle = "#475569";
  ctx.fillRect(-13, -10, 4, 20);
  ctx.fillRect(9, -10, 4, 20);
  // struts
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-9, 0);
  ctx.lineTo(9, 0);
  ctx.stroke();
  // cockpit
  ctx.fillStyle = "#1e293b";
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#f87171";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

export default function XWingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<Phase>("intro");
  const worldRef = useRef<World>({
    w: 0,
    h: 0,
    px: 0,
    py: 0,
    enemies: [],
    playerBolts: [],
    enemyBolts: [],
    sparks: [],
    runTime: 0,
    fireCd: 0,
    spawnCd: 0.6,
    invuln: 0,
    lives: START_LIVES,
    kills: 0,
  });
  const keysRef = useRef<Set<string>>(new Set());

  const [phase, setPhase] = useState<Phase>("intro");
  const [lives, setLives] = useState(START_LIVES);
  const [kills, setKills] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SURVIVE_SECONDS);
  const [showSkip, setShowSkip] = useState(false);

  const goToPhase = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const goToPhaseRef = useRef(goToPhase);
  goToPhaseRef.current = goToPhase;

  const enterSite = () => {
    clearGateCookie();
    window.location.assign("/");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = worldRef.current;
    let raf = 0;
    let hitTimeout = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const first = w.w === 0;
      w.w = window.innerWidth;
      w.h = window.innerHeight;
      if (first) {
        w.px = w.w / 2;
        w.py = w.h * 0.8;
      }
      w.px = Math.min(Math.max(w.px, 24), w.w - 24);
      w.py = Math.min(Math.max(w.py, 24), w.h - 24);
    };
    resize();
    window.addEventListener("resize", resize);

    const startIfIntro = () => {
      if (phaseRef.current === "intro") {
        w.invuln = 1;
        goToPhaseRef.current("playing");
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
      ) {
        e.preventDefault();
      }
      keysRef.current.add(e.key.toLowerCase());
      startIfIntro();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let lastTouch: { x: number; y: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      lastTouch = { x: t.clientX, y: t.clientY };
      startIfIntro();
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      if (lastTouch) {
        w.px += (t.clientX - lastTouch.x) * 1.4;
        w.py += (t.clientY - lastTouch.y) * 1.4;
      }
      lastTouch = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = () => {
      lastTouch = null;
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("pointerdown", startIfIntro);

    const onPlayerHit = () => {
      if (w.invuln > 0) return;
      burst(w, w.px, w.py);
      if (w.lives > 1) {
        w.lives -= 1;
        setLives(w.lives);
        resetRun(w);
        setKills(0);
        goToPhaseRef.current("hit");
        hitTimeout = window.setTimeout(() => {
          if (phaseRef.current === "hit") goToPhaseRef.current("playing");
        }, 1500);
      } else {
        // Final life: the fail state is gone — just brief invulnerability.
        w.invuln = 1.5;
      }
    };

    const update = (dt: number) => {
      // player movement
      const k = keysRef.current;
      let dx = 0;
      let dy = 0;
      if (k.has("arrowleft") || k.has("a")) dx -= 1;
      if (k.has("arrowright") || k.has("d")) dx += 1;
      if (k.has("arrowup") || k.has("w")) dy -= 1;
      if (k.has("arrowdown") || k.has("s")) dy += 1;
      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }
      w.px += dx * PLAYER_SPEED * dt;
      w.py += dy * PLAYER_SPEED * dt;
      w.px = Math.min(Math.max(w.px, 24), w.w - 24);
      w.py = Math.min(Math.max(w.py, 24), w.h - 24);

      w.runTime += dt;
      if (w.invuln > 0) w.invuln -= dt;

      // auto-fire
      w.fireCd -= dt;
      if (w.fireCd <= 0) {
        w.fireCd = FIRE_INTERVAL;
        w.playerBolts.push({ x: w.px, y: w.py - 20, vy: -LASER_SPEED });
      }

      // spawn TIE fighters
      w.spawnCd -= dt;
      if (w.spawnCd <= 0) {
        w.spawnCd = SPAWN_INTERVAL;
        w.enemies.push({
          x: 40 + Math.random() * (w.w - 80),
          y: -30,
          vx: (Math.random() - 0.5) * 80,
          vy: 100 + Math.random() * 80,
          fire: 0.8 + Math.random() * 1.6,
        });
      }

      // enemies
      for (const e of w.enemies) {
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        if (e.x < 24 || e.x > w.w - 24) e.vx *= -1;
        e.fire -= dt;
        if (e.fire <= 0 && e.y > 0 && e.y < w.h * 0.6) {
          e.fire = 1.2 + Math.random() * 1.4;
          w.enemyBolts.push({ x: e.x, y: e.y + 14, vy: ENEMY_LASER_SPEED });
        }
      }
      w.enemies = w.enemies.filter((e) => e.y < w.h + 40);

      // bolts
      for (const b of w.playerBolts) b.y += b.vy * dt;
      for (const b of w.enemyBolts) b.y += b.vy * dt;
      w.playerBolts = w.playerBolts.filter((b) => b.y > -20);
      w.enemyBolts = w.enemyBolts.filter((b) => b.y < w.h + 20);

      // player bolts vs enemies
      for (const b of w.playerBolts) {
        for (const e of w.enemies) {
          const ddx = b.x - e.x;
          const ddy = b.y - e.y;
          if (ddx * ddx + ddy * ddy < 18 * 18) {
            burst(w, e.x, e.y);
            b.y = -9999;
            e.y = 99999;
            w.kills += 1;
            break;
          }
        }
      }
      w.playerBolts = w.playerBolts.filter((b) => b.y > -20);
      w.enemies = w.enemies.filter((e) => e.y < w.h + 40);

      // enemy bolts vs player
      for (const b of w.enemyBolts) {
        const ddx = b.x - w.px;
        const ddy = b.y - w.py;
        if (ddx * ddx + ddy * ddy < 16 * 16) {
          b.y = 99999;
          onPlayerHit();
          break;
        }
      }
      w.enemyBolts = w.enemyBolts.filter((b) => b.y < w.h + 20);

      // enemies ramming player
      for (const e of w.enemies) {
        const ddx = e.x - w.px;
        const ddy = e.y - w.py;
        if (ddx * ddx + ddy * ddy < 26 * 26) {
          burst(w, e.x, e.y);
          e.y = 99999;
          onPlayerHit();
          break;
        }
      }
      w.enemies = w.enemies.filter((e) => e.y < w.h + 40);

      // sparks
      for (const s of w.sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= dt;
      }
      w.sparks = w.sparks.filter((s) => s.life > 0);

      // win check
      if (w.runTime >= SURVIVE_SECONDS && w.kills >= KILL_TARGET) {
        clearGateCookie();
        goToPhaseRef.current("won");
      }
    };

    const syncHud = () => {
      const s = Math.max(0, Math.ceil(SURVIVE_SECONDS - w.runTime));
      setSecondsLeft((prev) => (prev === s ? prev : s));
      setKills((prev) => (prev === w.kills ? prev : w.kills));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w.w, w.h);

      // player bolts
      ctx.save();
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#a5f3fc";
      for (const b of w.playerBolts) ctx.fillRect(b.x - 1.5, b.y - 8, 3, 14);
      ctx.restore();

      // enemy bolts
      ctx.save();
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#fca5a5";
      for (const b of w.enemyBolts) ctx.fillRect(b.x - 1.5, b.y - 8, 3, 14);
      ctx.restore();

      for (const e of w.enemies) drawEnemy(ctx, e);

      // sparks
      ctx.save();
      for (const s of w.sparks) {
        ctx.globalAlpha = Math.max(0, s.life * 1.6);
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(s.x - 1.5, s.y - 1.5, 3, 3);
      }
      ctx.restore();

      // player (flash while invulnerable)
      const flashing =
        w.invuln > 0 && Math.floor(performance.now() / 100) % 2 === 0;
      if (!flashing && phaseRef.current !== "hit") {
        drawPlayer(ctx, w.px, w.py);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phaseRef.current === "playing") {
        update(dt);
        syncHud();
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hitTimeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("pointerdown", startIfIntro);
    };
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setShowSkip(true), SKIP_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  const onFinalLife = lives === 1;
  const killsDone = kills >= KILL_TARGET;
  const timeDone = secondsLeft === 0;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full touch-none"
      />

      <div className="pointer-events-none fixed inset-0 z-10 font-oswald">
        {/* HUD */}
        {phase !== "intro" && (
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 shadow-lg shadow-black/40 backdrop-blur-xl">
              {Array.from({ length: START_LIVES }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < lives ? "text-cyan-300" : "text-slate-600"
                  }
                  aria-hidden="true"
                >
                  ▲
                </span>
              ))}
              {onFinalLife && (
                <span className="ml-2 text-xs text-amber-300">
                  Final life — you can&apos;t be stopped
                </span>
              )}
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 shadow-lg shadow-black/40 backdrop-blur-xl">
              <span className={killsDone ? "text-cyan-300" : ""}>
                TIEs {Math.min(kills, KILL_TARGET)}/{KILL_TARGET}
              </span>
              <span className="mx-2 text-slate-500">·</span>
              <span className={timeDone ? "text-cyan-300" : ""}>
                {timeDone ? "Time cleared" : `${secondsLeft}s`}
              </span>
            </div>
          </div>
        )}

        {/* Intro overlay */}
        {phase === "intro" && (
          <div className="flex h-full items-center justify-center px-4">
            <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
              <h1 className="bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Clear the Blockade
              </h1>
              <p className="mt-4 font-light text-slate-300">
                A fighter screen is blocking the way to the site. Survive{" "}
                <span className="font-medium text-cyan-300">
                  {SURVIVE_SECONDS} seconds
                </span>{" "}
                and shoot down{" "}
                <span className="font-medium text-cyan-300">
                  {KILL_TARGET} TIE fighters
                </span>{" "}
                to get through.
              </p>
              <div className="mt-5 space-y-1 text-sm font-light text-slate-400">
                <p>Arrow keys / WASD to fly · drag on touch</p>
                <p>Your lasers fire automatically</p>
                <p>3 lives — on your last one, you can&apos;t fail</p>
              </div>
              <p className="mt-6 animate-pulse text-cyan-200">
                Press any key or tap to launch
              </p>
            </div>
          </div>
        )}

        {/* Hit overlay */}
        {phase === "hit" && (
          <div className="flex h-full items-center justify-center px-4">
            <div className="rounded-3xl border border-red-400/30 bg-white/[0.06] p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
              <p className="text-2xl font-bold text-red-300">Direct hit!</p>
              <p className="mt-2 font-light text-slate-300">
                {onFinalLife
                  ? "Last life — the Force is with you now. You can't fail."
                  : `${lives} ${lives === 1 ? "life" : "lives"} left — restarting the run…`}
              </p>
            </div>
          </div>
        )}

        {/* Win overlay */}
        {phase === "won" && (
          <div className="flex h-full items-center justify-center px-4">
            <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
              <h2 className="bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Blockade cleared!
              </h2>
              <p className="mt-3 font-light text-slate-300">
                Great flying. Welcome aboard.
              </p>
              <Button
                onClick={enterSite}
                className="mt-6 h-auto rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-2.5 font-oswald text-base font-medium text-cyan-100 hover:border-cyan-300/70 hover:bg-cyan-400/20 hover:text-white"
              >
                Enter the site
                <span aria-hidden="true">→</span>
              </Button>
              <p className="mt-4 text-xs font-light text-slate-500">
                You can replay anytime from the home page.
              </p>
            </div>
          </div>
        )}

        {/* Skip link */}
        {showSkip && phase !== "won" && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={enterSite}
              className="pointer-events-auto rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-light text-slate-400 shadow-lg shadow-black/40 backdrop-blur-xl transition-colors duration-200 hover:border-cyan-400/40 hover:text-cyan-200"
            >
              Skip intro →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
