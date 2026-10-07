import Hero from "./components/Hero";
import Story from "./components/Story";
import BrandHighlights from "./components/BrandHighlights";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
