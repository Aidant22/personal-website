import Link from "next/link";

export default function Header() {
    return(
        <div className="border-b-2 border-white flex-1 pr-2 pl-2 pt-5 pb-4">
            <div className="flex justify-between font-sans text-lg">
                <div className="hover:underline"><a href="/">Aidan Tobar</a></div>
                <div className="hover:underline"><Link href={"https://github.com/Aidant22"}>My GitHub</Link></div>
            </div>
        </div>
    );
}