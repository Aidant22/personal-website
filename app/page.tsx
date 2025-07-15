"use client";
import { loadStarsPreset } from "tsparticles-preset-stars";
import Image from "next/image";
import { useCallback } from "react";
import Particles from "react-tsparticles";

export default function HomePage() {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <>
      {/* Particles Background */}
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

      {/* Main Content */}
      <div className="relative pt-4 pb-4 h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl shadow-gray-600 p-8 rounded-lg max-w-lg text-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden flex justify-center border-4 border-white shadow-lg shadow-gray-600">
              <Image
                src={"/Portait.jpeg"}
                alt="A picture of me"
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>
          </div>
          <h1 className="text-center font-oswald font-bold text-4xl pt-4">
            Aidan Tobar
          </h1>
          <p className="text-center font-oswald font-light text-lg pt-4">
            Thank you for visiting my website!
          </p>
          <h2 className="font-oswald font-bold text-3xl text-center pt-4">
            About me
          </h2>
          <ol className="p-2 ml-4 font-oswald list-decimal text-left">
            <li>I am a student at Bowling Green State University.</li>
            <li>I am working on my Bachelor of Science in Computer Science.</li>
            <li>I enjoy making websites and web applications!</li>
            <li>
              I volunteer at my old high school to coach Valorant esports.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
