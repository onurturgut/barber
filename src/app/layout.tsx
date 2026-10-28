import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "RAZE / Barber Club — Cut The Noise",
    template: "%s — RAZE / Barber Club",
  },
  description:
    "Keskin çizgiler. Güçlü karakter. Modern erkek bakımında yeni bir standart.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
