import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "Lunar Fortis – Security, Mobility & Accommodation",
    template: "%s | Lunar Fortis",
  },
  description:
    "Experience elite protection, refined mobility, and trusted accommodation — tailored for those who value safety, discretion, and excellence.",
  keywords: [
    "security escort Lagos",
    "car rental Lagos",
    "shortlet apartment Lagos",
    "chauffeur service Nigeria",
    "luxury accommodation Lekki",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://lunarfortis.com",
    siteName: "Lunar Fortis",
    title: "Lunar Fortis – Security, Mobility & Accommodation",
    description:
      "Experience elite protection, refined mobility, and trusted accommodation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
