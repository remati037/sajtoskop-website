import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Proof } from "@/components/sections/proof";
import { How } from "@/components/sections/how";
import { Anatomy } from "@/components/sections/anatomy";
import { Local } from "@/components/sections/local";
import { Compare } from "@/components/sections/compare";
import { Audience } from "@/components/sections/audience";
import { Beta } from "@/components/sections/beta";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { faq } from "@/lib/content";
import { site } from "@/lib/site";

/** JSON-LD: pomaže da se FAQ i proizvod pravilno indeksiraju. */
function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: site.url,
      inLanguage: "sr-Latn-RS",
      description:
        "Lead-gen alat koji pronalazi biznise u Srbiji sa lošim ili nepostojećim sajtovima i priprema outreach materijal za web dizajnere, frilensere i agencije.",
      author: { "@type": "Person", name: site.author },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "RSD",
        description: "Besplatna beta — 30 kredita mesečno, bez kartice.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="sadrzaj">
        <Hero />
        <Problem />
        <Proof />
        <How />
        <Anatomy />
        <Local />
        <Compare />
        <Audience />
        <Beta />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
