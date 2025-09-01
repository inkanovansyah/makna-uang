"use client";

import { useParams } from "next/navigation";
import { usePostBySlug } from "../../../components/Hooks/usePosts";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import Tag from "@/src/components/Elements/Tag";
import siteMetadata from "@/src/utils/siteMetaData";
import { slug as slugify } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function BlogPage() {
  const { slug } = useParams();
  const { data: blog, isLoading, isError } = usePostBySlug(slug);

  // Debug logging
  // console.log("📌 Slug param:", slug);
  // console.log("✅ Blog response:", blog);
  // console.log("⚠️ Error status:", isError);

  // Handle loading state
  if (isLoading) return <p className="text-center">Loading...</p>;
  
  // Handle error state and not found
  if (isError || !blog) {
    notFound();
    return null; // Return null setelah notFound()
  }

  // Pastikan blog.image ada sebelum menggunakannya
  let imageList = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList =
      typeof blog.image === "string"
        ? [siteMetadata.siteUrl + blog.image]
        : blog.image;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog.title,
    description: blog.description || "",
    image: imageList,
    datePublished: new Date(blog.publishedAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    author: [
      {
        "@type": "Person",
        name: blog?.author || siteMetadata.author,
        url: siteMetadata.twitter,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
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

        {/* Detail + Content */}
        <BlogDetails blog={blog} slug={slug} />

        {/* Render content HTML dari WordPress */}
        <div className="mt-8 px-5 md:px-10 prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </>
  );
}
