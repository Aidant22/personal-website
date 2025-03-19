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
      <div className="flex justify-center pt-12 z-10">
        <iframe
          src="/text-doc/Resume.pdf"
          title="Resume"
          className="w-3/4 h-screen z-10"
        />
      </div>
    </>
  );
}
