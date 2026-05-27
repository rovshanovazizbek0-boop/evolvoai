import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://evolvoai-j86e.onrender.com";

  // Get all published blog posts
  let posts: { id: string; updatedAt: Date }[] = [];
  let projects: { slug: string; updatedAt: Date }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, updatedAt: true },
    });

    projects = await prisma.project.findMany({
      where: { status: "COMPLETED" },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    // Database might be offline during build
  }

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const portfolioUrls = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/portfolio`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: "daily" as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogUrls,
    ...portfolioUrls,
  ];
}
