import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import "./folio.css";
import NoiseOverlay from "../components/NoiseOverlay";

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

const description =
  "Harliv Singh is a mathematics student and researcher at BITS Pilani, Goa, exploring mathematics, computational science, quantum computing, and AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://harliv.dev"),
  title: "Harliv | Mathematics, Computational Science & AI Research",
  description,
  alternates: { canonical: "/" },
  applicationName: "Harliv Singh",
  keywords: [
    "Harliv Singh",
    "mathematics",
    "computational science",
    "quantum computing",
    "artificial intelligence",
    "BITS Pilani Goa",
  ],
  authors: [{ name: "Harliv Singh", url: "https://harliv.dev/" }],
  openGraph: {
    title: "Harliv | Mathematics, Computational Science & AI Research",
    description,
    url: "https://harliv.dev/",
    siteName: "Harliv Singh",
    type: "website",
  },
  twitter: { card: "summary", title: "Harliv Singh", description },
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
      <body className="min-h-full flex flex-col font-sans bg-background text-primary selection:bg-white/20 selection:text-white font-normal text-[13px] leading-[1.75] tracking-tight" style={{ fontFeatureSettings: '"ss01", "cv01"' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harliv Singh",
              url: "https://harliv.dev/",
              jobTitle: "Mathematics student and researcher",
              affiliation: { "@type": "CollegeOrUniversity", name: "BITS Pilani, Goa Campus" },
              description,
              sameAs: ["https://github.com/h-livv", "https://www.linkedin.com/in/h-livv/"],
              knowsAbout: ["Mathematics", "Computational science", "Quantum computing", "Artificial intelligence"],
            }),
          }}
        />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
