"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export default function Resume() {
  const particlesInit = useCallback(async (engine) => {
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
          src="/text-doc/FixedResume.pdf"
          title="Resume"
          className="md:w-4/5 xl:w-3/4 2xl:w-2/4 sm:w-1/6 lg:w-3/4  resume z-10"
        />
      </div>
    </>
  );
}
