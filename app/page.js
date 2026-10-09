import Hero from "./components/Hero";
import Story from "./components/Story";
import BrandHighlights from "./components/BrandHighlights";

// SEO pentru pagina principală
export const metadata = {
  title: "Miere naturală și produse apicole",
  description:
    "Descoperă miere naturală de salcâm, tei, floarea-soarelui și poliflorală, alături de polen și alte produse apicole de la Mierea Casei.",

  alternates: {
    canonical: "https://www.miereacasei.ro/",
  },

  openGraph: {
    title: "Miere naturală și produse apicole | Mierea Casei",
    description:
      "Descoperă sortimente de miere naturală și produse apicole de la Mierea Casei.",
    url: "https://www.miereacasei.ro/",
    siteName: "Mierea Casei",
    locale: "ro_RO",
    type: "website",
  },
};

export default function Home() {
  const siteUrl = "https://www.miereacasei.ro";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mierea Casei",
    url: siteUrl,
    logo: `${siteUrl}/logo%20MC.svg`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mierea Casei",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Hero />
      <Story />
      <BrandHighlights />
    </>
  );
}
