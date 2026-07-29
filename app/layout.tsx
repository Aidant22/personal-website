import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/header";
import Footer from "./(components)/footer";
import HideOnGame from "./(components)/hide-on-game";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://aidantobar.com";
const siteDescription =
  "Aidan Tobar is a software developer and cum laude Computer Science graduate from Bowling Green State University, specializing in AI-powered applications, full-stack web development with React and Next.js, and automation tooling. Open to full-time software engineering opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aidan Tobar | Software Developer",
    template: "%s | Aidan Tobar",
  },
  description: siteDescription,
  keywords: [
    "Aidan Tobar",
    "Software Developer",
    "Software Engineer",
    "Computer Science Graduate",
    "Bowling Green State University",
    "BGSU Computer Science",
    "React Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "AI Integration",
    "Python Developer",
    "TypeScript Developer",
    "Web Developer Ohio",
  ],
  authors: [{ name: "Aidan Tobar", url: siteUrl }],
  creator: "Aidan Tobar",
  publisher: "Aidan Tobar",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Aidan Tobar",
    title: "Aidan Tobar | Software Developer",
    description: siteDescription,
    images: [
      {
        url: "/Portait.jpeg",
        width: 500,
        height: 500,
        alt: "Aidan Tobar",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Aidan Tobar | Software Developer",
    description: siteDescription,
    images: ["/Portait.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aidan Tobar",
  url: siteUrl,
  image: `${siteUrl}/Portait.jpeg`,
  jobTitle: "Software Developer",
  description: siteDescription,
  email: "mailto:aidantobar1@gmail.com",
  telephone: "+1-419-494-7222",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bowling Green State University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Westfield",
  },
  sameAs: [
    "https://www.linkedin.com/in/aidan-tobar/",
    "https://github.com/Aidant22",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",
    "Angular",
    "AI Integration",
    "Playwright",
    "Full-Stack Web Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <HideOnGame>
          <div className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
            <Header />
          </div>
        </HideOnGame>
        <main className="z-0 flex-grow">
          {children}
        </main>
        <HideOnGame>
          <div className="relative bottom-0 z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
            <Footer />
          </div>
        </HideOnGame>
      </body>
    </html>
  );
}
