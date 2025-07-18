import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="border-b-4 border-black flex-1 py-4 px-2 ">
      <div className="flex justify-between font-oswald">
        <div className="text-xl font-bold">
          <Link href="/">
            <h2 className="hover:underline hover:shadow-sm">Aidan Tobar</h2>
          </Link>
        </div>
        <div className="flex">
          <Link href={"/resume"} title="Resume">
            <Image
              src={"/document.svg"}
              alt="document logo for resume"
              width={35}
              height={35}
              className="rounded-full hover:w-9"
            />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/aidan-tobar/"}
            target="blank"
            title="LinkedIn"
          >
            <Image
              src={"/linkedin.png"}
              alt="linkedin logo"
              width={35}
              height={35}
              className="rounded-full hover:w-9"
            />
          </Link>
          <Link href={"https://github.com/Aidant22"} target="blank" title="Github">
            <Image
              src={"/github-mark/github-mark.png"}
              alt="github logo"
              width={35}
              height={35}
              className="rounded-full hover:w-9"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
