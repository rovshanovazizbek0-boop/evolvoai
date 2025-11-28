import { prisma } from "@/lib/prisma";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://evolvoai.uz";

  try {
    // Fetch all published blog posts
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    // Fetch all completed projects
    const projects = await prisma.project.findMany({
      where: { status: "COMPLETED" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    // Static pages
    const staticPages = [
      { url: "", changefreq: "daily", priority: 1.0 },
      { url: "/blog", changefreq: "daily", priority: 0.9 },
      { url: "/portfolio", changefreq: "weekly", priority: 0.9 },
      { url: "/chatbot", changefreq: "monthly", priority: 0.7 },
    ];

    // Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
${posts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
${projects
  .map(
    (project) => `  <url>
    <loc>${baseUrl}/portfolio/${project.slug}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
