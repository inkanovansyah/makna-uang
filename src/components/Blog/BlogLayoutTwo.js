"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTrendingPosts } from "../Hooks/usePosts";

const BlogLayoutTwo = () => {
  const { data: blogs, isLoading, error } = useTrendingPosts(); // ✅ ambil trending

  if (isLoading) {
    return (
      <>
        {[1, 2].map((item) => (
          <article
            key={item}
            className="group grid grid-cols-12 gap-4 items-center mb-6"
          >
            <div className="col-span-12 lg:col-span-4 h-[200px] bg-gray-800 animate-pulse rounded-xl" />
            <div className="col-span-12 lg:col-span-8 space-y-2">
              <div className="h-4 w-20 bg-gray-800 animate-pulse rounded" />
              <div className="h-6 w-2/3 bg-gray-800 animate-pulse rounded" />
              <div className="h-4 w-32 bg-gray-700 animate-pulse rounded" />
            </div>
          </article>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 border border-red-300 rounded-xl">
        Error: {error?.message || "Gagal memuat data"}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-4 text-orange-500 border border-orange-300 rounded-xl">
        Tidak ada blog yang tersedia.
      </div>
    );
  }

  const displayedBlogs = blogs.slice(1, 3);

  return (
    <>
    
        {displayedBlogs.map((blog, index) => {
          const blogUrl = blog.url || (blog.slug ? `/blogs/${blog.slug}` : "#");
          const imageSrc = blog.image || "/default.jpg";

          return (
            <article
                key={blog.id || index}
                className="group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 items-center text-dark dark:text-light mb-6"
              >
              <Link
                href={blog.slug ? `/blogs/${blog.slug}` : "#"}
                className="col-span-1 lg:col-span-4 h-full rounded-xl overflow-hidden"
              >
                <Image
                  src={imageSrc.startsWith("http") ? imageSrc : "/placeholder.png"}
                  alt={blog.title || "No title"}
                  width={1920}
                  height={1280}
                  className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
                  sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
                />
              </Link>

              <div className="col-span-1 lg:col-span-8 w-full">
                <span className="inline-block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                  {blog.tags?.[0] || "No Tag"}
                </span>
                <Link href={blog.slug ? `/blogs/${blog.slug}` : "#"} className="inline-block my-1">
                  <h2 className="font-semibold capitalize text-base sm:text-lg">
                    <span
                      className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px]
                        group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
                    >
                      {blog.title || "Untitled"}
                    </span>
                  </h2>
                </Link>
                <span className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold text-xs sm:text-base">
                  {blog.publishedAt
                    ? format(new Date(blog.publishedAt), "MMMM dd, yyyy")
                    : "No date"}
                </span>
              </div>
            </article>
        );
      })}
    </>
  );
};

export default BlogLayoutTwo;