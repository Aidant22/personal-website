import type { Metadata } from "next";
import { Suspense } from "react";
import Starfield from "@/components/ui/starfield";
import XWingGame from "@/components/game/xwing-game";

export const metadata: Metadata = {
  title: "Clear the Blockade — Aidan Tobar",
  description: "Fly an X-wing through the blockade to enter the site",
};

export default function GamePage() {
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
      <Suspense fallback={null}>
        <XWingGame />
      </Suspense>
    </>
  );
}
