import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="pt-4">
        <div className="flex justify-center">
        <div className="w-64 h-64 rounded-full overflow-hidden flex justify-center border-4 border-white">
          <Image src={"/Portait.jpeg"} alt="A picture of me" width={500} height={500} objectFit="cover"/>
        </div>
        </div>
        <h1 className="text-center font-oswald font-bold text-4xl pt-4">Aidan Tobar</h1>
        <p className="text-center font-oswald font-light text-lg pt-4">Thank you for visiting my website! Click below to get a random prize (just a gimmick)!</p>
        <div className="flex justify-center py-2"><Button className="shadow-lg" variant={"outline"}>Click Me!</Button></div>

      </div>
  );
}