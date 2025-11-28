export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || "https://evolvoai.uz"}/sitemap.xml

# Disallow admin pages
User-agent: *
Disallow: /admin/
Disallow: /api/

# Allow specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
