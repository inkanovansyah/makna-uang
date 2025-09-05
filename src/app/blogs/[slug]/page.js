import { notFound } from "next/navigation";
import BlogContent from "./BlogContent"; // langsung import Client Component

// --- Fetch Server Side untuk SEO ---
async function getPostBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/myapi/v1/detail/${slug}`, {
    next: { revalidate: 60 }, // cache 1 menit
  });

  if (!res.ok) return null;
  return res.json();
}

// --- Generate Metadata SEO ---
export async function generateMetadata({ params }) {
  // Pastikan params di-resolve
  const resolvedParams = await params; // <-- ini kuncinya
  const blog = await getPostBySlug(resolvedParams.slug);

  if (!blog) return { title: "Not Found" };

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || "",
    openGraph: {
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || "",
      url: blog.url,
      type: "article",
      publishedTime: blog.publishedAt,
      modifiedTime: blog.modifiedAt,
      images: [blog.image],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || "",
      images: [blog.image],
    },
  };
}


// --- Halaman Blog ---
export default async function BlogPage({ params }) {
  const blog = await getPostBySlug(params.slug);
  if (!blog) return notFound();

  // --- JSON-LD Schema ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.seo?.title || blog.title,
    description: blog.seo?.description || "",
    keywords: blog.seo?.keywords || undefined,
    image: blog.image ? [blog.image] : [],
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.modifiedAt || blog.publishedAt).toISOString(),
    author: {
      "@type": "Person",
      name: blog?.author || "Admin",
      url: blog.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blog.seo?.canonical || blog.url,
    },
  };

  return (
    <>
      {/* ✅ JSON-LD server side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ Artikel tetap render via Client Component */}
      <BlogContent slug={params.slug} />
    </>
  );
}
