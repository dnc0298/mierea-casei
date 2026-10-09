import { notFound } from "next/navigation";
import { products } from "@/app/data/products";
import ProductDetail from "@/app/components/ProductDetail";

const siteUrl = "https://www.miereacasei.ro";

export function generateStaticParams() {
  return products.map((product) => ({
    productId: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const { productId } = await params;

  const product = products.find((p) => String(p.id) === String(productId));

  if (!product) {
    return {
      title: "Produs negăsit | Mierea Casei",
      description: "Produsul căutat nu a fost găsit.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${siteUrl}/produse/${product.id}`;
  const productTitle = `${product.title} | Mierea Casei`;

  return {
    title: productTitle,
    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      title: productTitle,
      description: product.description,
      url: productUrl,
      type: "website",
      locale: "ro_RO",
      siteName: "Mierea Casei",
      images: [
        {
          url: product.image.startsWith("http")
            ? product.image
            : `${siteUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: productTitle,
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

  const productUrl = `${siteUrl}/produse/${product.id}`;

  const productImage = product.image.startsWith("http")
    ? product.image
    : `${siteUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [productImage],

    brand: {
      "@type": "Brand",
      name: "Mierea Casei",
    },

    offers: {
      "@type": "Offer",
      url: productUrl,
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
