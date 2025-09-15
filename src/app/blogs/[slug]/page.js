// app/blogs/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import Tag from "@/src/components/Elements/Tag";
import { slug as slugify } from "github-slugger";

// --- Fetch SSR ---
async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/myapi/v1/detail/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

// --- Generate Metadata SSR ---
export async function generateMetadata({ params }) {
  const blog = await getPostBySlug(params.slug);
  if (!blog) return { title: "Not Found" };

  const siteUrl = "https://maknauang.com";
  const canonicalUrl = `${siteUrl}/blogs/${params.slug}`;

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || "",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || "",
      url: canonicalUrl,
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
    other: {
      "fb:app_id": process.env.NEXT_PUBLIC_FB_APP_ID || "2917496495115818",
    },
  };
}

// --- Helper untuk parsing konten WordPress ---
const parseContent = (html) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.name === "a" && domNode.attribs?.href) {
        const href = domNode.attribs.href;

        // internal link (absolute atau relative)
        const isInternal =
          href.startsWith("https://maknauang.com") || href.startsWith("/");

        if (isInternal) {
          const path = href.replace("https://maknauang.com", "");
          return (
            <Link href={path}>
              {domNode.children.map((child) =>
                child.data ? child.data : parse(child)
              )}
            </Link>
          );
        }

        // external link tetap <a>
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {domNode.children.map((child) =>
              child.data ? child.data : parse(child)
            )}
          </a>
        );
      }
    },
  });
};

// --- Halaman Blog SSR ---
export default async function BlogPage({ params }) {
  const blog = await getPostBySlug(params.slug);
  if (!blog) return notFound();

  const siteUrl = "https://maknauang.com";
  const canonicalUrl = `${siteUrl}/blogs/${params.slug}`;

  // JSON-LD Schema (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.seo?.title || blog.title,
    description: blog.seo?.description || "",
    keywords: blog.seo?.keywords || undefined,
    image: blog.image ? [blog.image] : [],
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.modifiedAt || blog.publishedAt).toISOString(),
    author: { "@type": "Person", name: blog?.author || "Admin", url: canonicalUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  return (
    <article>
      {/* JSON-LD langsung server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {blog.tags?.length > 0 && (
            <Tag
              name={blog.tags[0]}
              link={`/tags/${slugify(blog.tags[0])}`}
              className="px-6 text-sm py-2"
            />
          )}
          <h1 className="mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl w-5/6">
            {blog.title}
          </h1>
        </div>
        <div className="absolute inset-0 bg-dark/60 dark:bg-dark/40" />
        {blog.image && (
          <Image
            src={blog.image.src || blog.image}
            alt={blog.title}
            width={blog.image.width || 1200}
            height={blog.image.height || 630}
            className="w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* Detail + Konten */}
      <BlogDetails blog={blog} slug={params.slug} />

      {/* Konten WordPress */}
      <div className="mt-8 px-5 md:px-10 prose dark:prose-invert max-w-none relative">
        {parseContent(blog.content)}
      </div>
    </article>
  );
}
