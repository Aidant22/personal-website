import Link from "next/link";

export default function Resume() {
    return (
        <>
        <div className="flex justify-center pt-12">
            <iframe src="/text-doc/Resume.pdf" title="Resume" className="w-3/4 h-screen"/>
        </div>
        </>
    );
}