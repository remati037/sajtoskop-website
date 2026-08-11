import { AttributionCapture } from "@/components/attribution-capture";
import { site } from "@/lib/site";
import { themeScript } from "@/lib/theme-script";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

// Umami — analitika bez kolačića. ID sajta je javan, stoji u HTML-u svake stranice.
const UMAMI_SRC = "https://cloud.umami.is/script.js";
const UMAMI_ID = "65a3d84a-ec72-46fa-b737-da1bd46be257";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sajtoskop | Nađi firme u Srbiji koje nemaju sajt",
    template: "%s · Sajtoskop",
  },
  description:
    "Izabereš grad i nišu. Sajtoskop skenira Google Maps, oceni svaki sajt od 0 do 100 i da ti kontakt, screenshot i listu konkretnih problema. Besplatno u Beta fazi.",
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
    title: "Sajtoskop | Nađi firme u Srbiji koje nemaju sajt",
    description:
      "U Šapcu 58% PVC stolarija nema sajt koji radi. Sajtoskop zna njihova imena, telefone i tačan problem.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajtoskop | Nađi firme u Srbiji koje nemaju sajt",
    description:
      "U Šapcu 58% PVC stolarija nema sajt koji radi. Sajtoskop zna njihova imena, telefone i tačan problem.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Podrazumevana tema je tamna bez obzira na sistem, pa je i boja browser trake tamna.
export const viewport: Viewport = {
  themeColor: "#07080a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme="dark" je podrazumevano stanje — skripta u <head> ga menja
    // samo ako korisnik ima sačuvan izbor.
    <html
      lang="sr-Latn-RS"
      data-theme="dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="sajtoskop-theme"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <AttributionCapture />
        <Script
          src={UMAMI_SRC}
          data-website-id={UMAMI_ID}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
