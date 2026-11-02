import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import "./folio.css";
import "katex/dist/katex.min.css";
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
  "Harliv Singh is a mathematics student at BITS Pilani, Goa, exploring computational physics, quantum computing, artificial intelligence, and scientific software.";

export const metadata: Metadata = {
  metadataBase: new URL("https://harliv.dev"),
  title: {
    default: "Harliv Singh | Mathematics, AI & Computational Research",
    template: "%s | Harliv Singh",
  },
  description,
  applicationName: "Harliv Singh",
  authors: [{ name: "Harliv Singh", url: "https://harliv.dev/" }],
  creator: "Harliv Singh",
  publisher: "Harliv Singh",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Harliv Singh | Mathematics, AI & Computational Research",
    description,
    url: "https://harliv.dev/",
    siteName: "Harliv Singh",
    type: "website",
    images: [{ url: "/images/social-card.png", width: 1200, height: 630, alt: "Harliv Singh — Mathematics, AI & Computational Research" }],
  },
  twitter: { card: "summary_large_image", title: "Harliv Singh | Mathematics, AI & Computational Research", description, images: ["/images/social-card.png"] },
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
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://harliv.dev/#website",
                  name: "Harliv Singh",
                  url: "https://harliv.dev/",
                  description,
                  publisher: { "@id": "https://harliv.dev/#person" },
                },
                {
                  "@type": "Person",
                  "@id": "https://harliv.dev/#person",
                  name: "Harliv Singh",
                  url: "https://harliv.dev/",
                  description,
                  affiliation: { "@type": "CollegeOrUniversity", name: "BITS Pilani, Goa Campus" },
                  sameAs: ["https://github.com/h-livv", "https://www.linkedin.com/in/h-livv/"],
                  knowsAbout: ["Mathematics", "Computational physics", "Quantum computing", "Artificial intelligence", "Scientific computing"],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
