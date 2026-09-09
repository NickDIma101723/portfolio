import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono, Instrument_Serif, Caveat } from "next/font/google";
import "../styles/globals.scss";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SoundEffects from "@/components/ui/SoundEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fontVariables = {
  "--font-geist-sans": geistSans.style.fontFamily,
  "--font-geist-mono": geistMono.style.fontFamily,
  "--font-caveat": caveat.style.fontFamily,
  "--font-instrument-serif": instrumentSerif.style.fontFamily,
} as CSSProperties;

export const metadata: Metadata = {
  title: "NIKO.STUDIOS - Portfolio",
  description: "Creative portfolio showcasing design and development work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={fontVariables}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("niko-loader-seen")==="true")document.documentElement.classList.add("loader-seen")}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SmoothScroll>
            <GrainOverlay />
            <SoundEffects />
            {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
