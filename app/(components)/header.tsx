import Image from "next/image";
import Link from "next/link";

const iconLinks = [
  {
    href: "/resume",
    title: "Résumé",
    src: "/document.svg",
    alt: "Résumé",
    external: false,
    imgClassName: "brightness-0 invert",
  },
  {
    href: "https://www.linkedin.com/in/aidan-tobar/",
    title: "LinkedIn",
    src: "/linkedin.png",
    alt: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/Aidant22",
    title: "GitHub",
    src: "/github-mark/github-mark-white.png",
    alt: "GitHub",
    external: true,
  },
];

export default function Header() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 font-oswald sm:px-6">
      <Link href="/" className="group">
        <span className="bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200 bg-clip-text text-xl font-bold tracking-tight text-transparent">
          Aidan Tobar
        </span>
      </Link>

      <nav className="flex items-center gap-2 sm:gap-3">
        {iconLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            title={link.title}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/10"
          >
            <Image
              src={link.src}
              alt={link.alt}
              width={20}
              height={20}
              className={`h-5 w-5 object-contain ${link.imgClassName ?? ""}`}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
}
