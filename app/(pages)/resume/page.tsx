"use client";
import React from "react";
import Starfield from "../../../components/ui/starfield";


export default function Resume() {


  return (
    <>
    <>
      <Starfield
        count={500}
        finalSpeed={0.002}
        burstMultiplier={3}
        burstSpeedMultiplier={8}
        burstDuration={1800}
        transitionDuration={1400}
      />
    </>
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
