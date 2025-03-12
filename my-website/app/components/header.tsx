import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return(
        <div className="border-b-4 border-black flex-1 py-4 px-2">
            <div className="flex justify-between font-oswald">
                <div className="text-xl font-bold"><a href="/"><h2 className="hover:underline hover:shadow-sm">Aidan Tobar</h2></a></div>
                <div className="flex">
                    <Link href={"https://github.com/Aidant22"} target="blank"><Image src={"/github-mark/github-mark.png"} alt="github logo" width={35} height={35} className="hover:w-9 hover:h-9 hover:shadow-xl rounded-full"/></Link>
                    <Link href={""} target="blank"><Image src={"/linkedin.png"} alt="linkedin logo" width={35} height={35} className="hover:w-9 hover:h-9 hover:shadow-xl rounded-full"/></Link>
                </div>
            </div>
        </div>
    );
}