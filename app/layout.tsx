import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./(components)/header";
import Footer from "./(components)/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aidan Tobar",
  description: "Personal Website for Aidan Tobar",
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
        <div className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
          <Header />
        </div>
        <main className="z-0 flex-grow">
          {children}
        </main>
        <div className="relative bottom-0 z-20 w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
          <Footer />
        </div>
      </body>
    </html>
  );
}
