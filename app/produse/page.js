import ProductsHero from "../components/ProducstHero";
import ProductsSection from "../components/ProductSection";

export const metadata = {
  title: "Miere naturală și produse apicole",
  description:
    "Descoperă produsele Mierea Casei: miere naturală de salcâm, tei, floarea-soarelui și poliflorală, polen și lăptișor de matcă.",

  alternates: {
    canonical: "https://www.miereacasei.ro/produse",
  },

  openGraph: {
    title: "Miere naturală și produse apicole | Mierea Casei",
    description:
      "Explorează sortimentele de miere naturală, polenul și alte produse apicole de la Mierea Casei.",
    url: "https://www.miereacasei.ro/produse",
    siteName: "Mierea Casei",
    locale: "ro_RO",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <ProductsHero />
      <ProductsSection />
    </div>
  );
}
