import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cardamom House · Menu",
  description:
    "Slow brunch and strong coffee in Lisbon. View the Cardamom House menu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${cormorant.variable}`}>
        {/* Global Cinematic Looping Background Cardamom Video backdrop */}
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-cream">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-[0.12]"
          >
            <source src="/videos/background_video_clip.mp4" type="video/mp4" />
          </video>
          {/* Subtle cream overlay for legibility */}
          <div className="absolute inset-0 bg-cream/93" />
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to menu
        </a>
        {children}
      </body>
    </html>
  );
}
