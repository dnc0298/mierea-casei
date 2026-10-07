import ProductsHero from "../components/ProducstHero";

import ProductsSection from "../components/ProductSection";

export const metadata = {
  title: "Produse apicole",
  description:
    "Descoperă sortimentele de miere și produsele apicole de la Mierea Casei.",
};

export default function Page() {
  return (
    <div>
      <ProductsHero />
      <ProductsSection />
    </div>
  );
}
