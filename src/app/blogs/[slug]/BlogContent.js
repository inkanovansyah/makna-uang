// app/blogs/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import Tag from "@/src/components/Elements/Tag";
import { slug as slugify } from "github-slugger";

// Ambil data blog by slug dari API
async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function BlogContent({ params }) {
  // ✅ Ambil slug dari params
  const { slug } = params;

  const blog = await getBlog(slug);
  if (!blog) return notFound();

  return (
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

      {/* Render konten HTML */}
      <div className="mt-8 px-5 md:px-10 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </article>
  );
}
