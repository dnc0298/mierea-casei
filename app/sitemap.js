import { products } from "@/app/data/products";

const baseUrl = "https://www.miereacasei.ro";

export default function sitemap() {
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/produse/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/produse`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/despre-noi`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...productUrls,
  ];
}
