import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "YouState - Real-Time Human Optimization",
    template: "%s | YouState"
  },
  description: "The decision layer for intelligent daily performance. Your state determines what matters next.",
  keywords: [
    "productivity",
    "energy optimization",
    "focus",
    "recovery",
    "performance",
    "health",
    "biometrics"
  ],
  authors: [{ name: "Pulse Technologies" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Pulse - Human Performance OS",
    description: "Optimize your energy, focus, and recovery with real-time adaptive intelligence.",
    url: "/",
    siteName: "Pulse",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse - Human Performance OS",
    description: "Optimize your energy, focus, and recovery with real-time adaptive intelligence.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 selection:bg-zinc-600/50">
        {children}
      </body>
    </html>
  );
}
