import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harliv",
  description: "Building scientific software for computational physics, simulation, and machine learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-primary selection:bg-white/20 selection:text-white font-normal text-[14px] leading-relaxed tracking-tight">
        {children}
      </body>
    </html>
  );
}
