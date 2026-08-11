import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { themeScript } from "@/lib/theme-script";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sajtoskop — nađi firme u Srbiji koje nemaju sajt",
    template: "%s · Sajtoskop",
  },
  description:
    "Izabereš grad i nišu. Sajtoskop skenira Google Maps, oceni svaki sajt od 0 do 100 i da ti kontakt, screenshot i listu konkretnih problema. Besplatna beta.",
  keywords: [
    "lead generation Srbija",
    "firme bez sajta",
    "izrada sajtova klijenti",
    "web dizajn leadovi",
    "Google Maps scraper Srbija",
    "prospekti za web agencije",
  ],
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.company,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: site.url,
    siteName: site.name,
    title: "Sajtoskop — nađi firme u Srbiji koje nemaju sajt",
    description:
      "U Šapcu 58% PVC stolarija nema sajt koji radi. Sajtoskop zna njihova imena, telefone i tačan problem.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajtoskop — nađi firme u Srbiji koje nemaju sajt",
    description:
      "U Šapcu 58% PVC stolarija nema sajt koji radi. Sajtoskop zna njihova imena, telefone i tačan problem.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sr-Latn-RS"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
