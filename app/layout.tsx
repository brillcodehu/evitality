import type { Metadata } from "next";
import { Red_Hat_Display, Archivo_Black } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "eVitality | Personal Training & Wellness Platform",
    template: "%s | eVitality",
  },
  description:
    "Professzionalis personal training platform - idopontfoglalas, edzesprogram, haladaskovetes es taplalkozasi tanacsadas egy helyen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${redHatDisplay.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
