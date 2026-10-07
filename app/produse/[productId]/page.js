import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import ProductDetail from "@/app/components/ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({ params }) {
  const { productId } = await params;

  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    return {
      title: "Produs negăsit | Mierea Casei",
      description: "Produsul căutat nu a fost găsit.",
    };
  }

  return {
    title: `${product.title} | Mierea Casei`,
    description: product.description,

    openGraph: {
      title: `${product.title} | Mierea Casei`,
      description: product.description,
      type: "website",
      locale: "ro_RO",
      siteName: "Mierea Casei",
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Mierea Casei`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }) {
  const { productId } = await params;

  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    description: product.description,

    image: [`${siteUrl}${product.image}`],

    brand: {
      "@type": "Brand",
      name: "Mierea Casei",
    },

    offers: {
      "@type": "Offer",
      url: `${siteUrl}/produse/${product.id}`,
      priceCurrency: "RON",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <ProductDetail {...product} />
    </>
  );
}
