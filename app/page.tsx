"use client";
import Image from "next/image";
import Starfield from "../components/ui/starfield";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const glassCard =
  "rounded-3xl border-white/10 bg-white/[0.06] text-white shadow-2xl shadow-black/40 backdrop-blur-xl";

const aboutItems = [
  "Graduated from Bowling Green State University with a B.S. in Computer Science",
  "I love building websites and web applications",
  "I volunteer at my former high school coaching Valorant esports",
];

export default function HomePage() {
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

      <div className="relative z-0 flex w-full flex-col items-center gap-6 px-4 pb-24 pt-28 sm:pt-32">
        {/* Hero + About */}
        <Card className={`w-full max-w-2xl ${glassCard}`}>
          <CardContent className="p-6 text-center sm:p-10">
          <div className="flex justify-center">
            <div className="relative rounded-full bg-gradient-to-tr from-cyan-400/60 via-sky-400/40 to-indigo-400/60 p-1 shadow-lg shadow-cyan-500/20">
              <div className="h-40 w-40 overflow-hidden rounded-full border-2 border-white/20 sm:h-52 sm:w-52">
                <Image
                  src="/Portait.jpeg"
                  alt="A picture of me"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text font-oswald text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Aidan Tobar
          </h1>
          <p className="mt-3 font-oswald text-base font-light text-slate-300 sm:text-lg">
            Computer Scientist & Web Developer. Thanks for visiting!
          </p>

          <Button
            asChild
            className="mt-6 h-auto rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-2.5 font-oswald text-base font-medium text-cyan-100 hover:border-cyan-300/70 hover:bg-cyan-400/20 hover:text-white"
          >
            <Link href="/resume">
              View Resume
              <span aria-hidden="true">→</span>
            </Link>
          </Button>

          <div className="mt-8 border-t border-white/10 pt-6 text-left">
            <h2 className="font-oswald text-2xl font-bold text-white">
              About me
            </h2>
            <ul className="mt-4 space-y-3">
              {aboutItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-oswald font-light text-slate-200"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          </CardContent>
        </Card>

        {/* Other projects */}
        <Card className={`w-full max-w-2xl ${glassCard}`}>
          <CardHeader className="items-center text-center">
            <CardTitle className="font-oswald text-2xl font-bold text-white">
              Other projects
            </CardTitle>
            <CardDescription className="font-oswald font-light text-slate-400">
              Websites &amp; apps I&apos;ve built
            </CardDescription>
          </CardHeader>
          <CardContent>
          <a
            href="https://teclawncare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external favicon, no need for next/image optimization */}
            <img
              src="https://www.google.com/s2/favicons?domain=teclawncare.com&sz=64"
              alt="TecLawnCare icon"
              width={44}
              height={44}
              className="flex-shrink-0 rounded-lg bg-white/90 p-1"
            />
            <div className="min-w-0">
              <div className="truncate font-oswald font-semibold text-white">
                Tri-County Exterior Contractors
              </div>
              <div className="truncate font-oswald text-sm font-light text-slate-300">
                Lawncare &amp; Landscaping in Bowling Green, OH
              </div>
              <div className="truncate font-oswald text-sm text-cyan-300">
                teclawncare.com
              </div>
            </div>
            <span
              aria-hidden="true"
              className="ml-auto hidden text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cyan-300 sm:block"
            >
              →
            </span>
          </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
