import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Scroll Animation Gallery",
  description: "A beautiful image gallery with scroll-based animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} antialiased bg-background min-h-screen`}>
        <Providers>
          <ScrollProgress />
          <MusicPlayer />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}