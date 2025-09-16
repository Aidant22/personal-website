"use client";
import { loadStarsPreset } from "tsparticles-preset-stars";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import Link from "next/link";

export default function HomePage() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  const CheckScreenSize = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const resize = () => {
        setIsMobile(window.innerWidth < 600);
      };

      resize();

      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);

    if (!isMobile) {
      return (
        <>
          <div className="relative enclose flex items-center justify-center">
            <div className="bg-white shadow-xl shadow-gray-600 p-8 rounded-lg card text-center">
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
              <div className="text-center font-oswald font-light text-lg pt-1">
                Check out my{" "}
                <Link href="/resume" className="hover:underline font-normal">
                  Resume
                </Link>
                !
              </div>
              <h2 className="font-oswald font-bold text-3xl text-center pt-4">
                About me
              </h2>
              <ol className="ml-4 font-oswald list-decimal text-left pb-4">
                <li>I am a student at Bowling Green State University.</li>
                <li>
                  I am working on my Bachelor of Science in Computer Science.
                </li>
                <li>I enjoy making websites and web applications!</li>
                <li>
                  I volunteer at my old high school to coach Valorant esports.
                </li>
              </ol>
            </div>
          </div>
          <div className="relative flex justify-center pb-20">
            <div className="bg-white shadow-lg shadow-gray-600 p-4 card rounded-lg text-center">
              <h2 className="font-oswald font-bold text-xl text-center pt-4">
                Links to other websites/apps I have created
              </h2>
              <div>I am currently coming up with and working on new ideas!</div>
              <div className="flex justify-center">
                <Image
                  src="/sleeping-wingman.gif"
                  alt="sleeping wingman from valorant"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="relative enclose flex items-center justify-center">
            <div className="bg-white shadow-xl shadow-gray-600 rounded-lg card text-center overflow-scroll">
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full overflow-hidden flex justify-center border-4 border-white shadow-lg shadow-gray-600">
                  <Image
                    src={"/Portait.jpeg"}
                    alt="A picture of me"
                    width={450}
                    height={450}
                    objectFit="cover"
                  />
                </div>
              </div>
              <h1 className="text-center font-oswald font-bold text-4xl pt-4">
                Aidan Tobar
              </h1>
              <p className="text-center font-oswald font-light text-lg pt-2">
                Thank you for visiting my website!
              </p>
              <div className="text-center font-oswald font-light text-lg pt-2">
                Check out my{" "}
                <Link href="/resume" className="hover:underline font-bold">
                  Resume
                </Link>
                !
              </div>
            </div>
          </div>
          <div className="relative flex justify-center pb-20">
            <div className="bg-white shadow-lg shadow-gray-600 p-4 card rounded-lg text-center">
              <h2 className="font-oswald font-bold text-3xl text-center pt-4">
                About me
              </h2>
              <ol className="p-2 ml-4 font-oswald list-decimal text-left">
                <li>I am a student at Bowling Green State University.</li>
                <li>
                  I am working on my Bachelor of Science in Computer Science.
                </li>
                <li>I enjoy making websites and web applications!</li>
                <li>
                  I volunteer at my former high school to coach Valorant
                  esports.
                </li>
              </ol>
            </div>
          </div>
          <div className="relative flex justify-center pb-20">
            <div className="bg-white shadow-lg shadow-gray-600 p-4 card rounded-lg text-center">
              <h2 className="font-oswald font-bold text-xl text-center pt-4">
                Links to other websites/apps I have created
              </h2>
              <div>I am currently coming up with and working on new ideas!</div>
              <div className="flex justify-center">
                <Image
                  src="/sleeping-wingman.gif"
                  alt="sleeping wingman from valorant"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
  };

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
      <CheckScreenSize />
      {/* <div className="relative enclose flex items-center justify-center">
        <div className="bg-white shadow-xl shadow-gray-600 p-8 rounded-lg card text-center overflow-scroll">
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
            <li>I volunteer at my old high school to coach Valorant esports.</li>
          </ol>
        </div>
      </div> 
      <div className="relative flex justify-center pb-20">       
        <div className="bg-white shadow-lg shadow-gray-600 p-4 card rounded-lg text-center">
            <h2 className="font-oswald font-bold text-xl text-center pt-4">Links to other websites/apps I have created</h2>
            <div>I am currently coming up with and working on new ideas!</div>
            <div className="flex justify-center">
              <Image src="/sleeping-wingman.gif" alt="sleeping wingman from valorant" width={200} height={200}/>
            </div>
        </div>
      </div> */}
    </>
  );
}
