export async function getServerSideProps({ res }) {
  const baseUrl = "https://your-domain.com";
  const pages = ["/", "#about", "#skills", "#projects", "#contact"]; // anchors omitted in sitemap
  const urls = ["/"].map((path) => `${baseUrl}${path}`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function SiteMap() {
  return null;
}

