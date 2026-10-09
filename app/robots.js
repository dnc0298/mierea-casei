const baseUrl = "https://www.miereacasei.ro";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/checkout/",
        "/cont/",
        "/login/",
        "/cos/",
      ],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
