export default function Footer() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 font-oswald text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold text-white">Contact</span>
        <a
          href="mailto:aidantobar1@gmail.com"
          className="transition-colors hover:text-cyan-300"
        >
          aidantobar1@gmail.com
        </a>
        <a
          href="tel:+14194947222"
          className="transition-colors hover:text-cyan-300"
        >
          (419) 494-7222
        </a>
      </div>
      <div className="text-slate-400 sm:text-right">
        Built with Next.js &amp; React
        <br />
        Deployed on Vercel
      </div>
    </div>
  );
}
