"use client";
import React from "react";
import Starfield from "../../../components/ui/starfield";

export default function Resume() {
  return (
    <>
      <Starfield
        count={500}
        finalSpeed={0.002}
        burstMultiplier={3}
        burstSpeedMultiplier={8}
        burstDuration={1800}
        transitionDuration={1400}
      />

      <div className="relative z-0 flex flex-col items-center px-4 pb-24 pt-28 sm:pt-32">
        <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
          <iframe
            src="/text-doc/Updated_Resume_Spring2026 (3).pdf"
            title="Resume"
            className="resume w-full rounded-2xl bg-white"
          />
        </div>
      </div>
    </>
  );
}
