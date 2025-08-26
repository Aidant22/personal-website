"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import type { Engine } from "tsparticles-engine";

export default function Resume() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "stars",
          particles: {
            move: {
              enable: true,
              speed: 0.5,
            },
            opacity: {
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
          },
        }}
      />
      <div className="flex justify-center pt-20 z-10">
        <iframe
          src="/text-doc/Updated_Resume_Fall2025.pdf"
          title="Resume"
          className=" md:w-3/4 xl:w-3/4 2xl:w-2/4 sm:w-full lg:w-3/4 resume z-10"
        />
      </div>
    </>
  );
}
