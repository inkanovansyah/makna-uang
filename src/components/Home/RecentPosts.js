"use client";

import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import { useInfinitePosts } from "../Hooks/usePosts";
import { useInView } from "react-intersection-observer";

const RecentPosts = () => {
  // Infinite query
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts(9); // ambil 8 per page misalnya

  // Ambil semua data hasil load (gabung semua page)
  const blogList = data?.pages.flatMap((page) => page.data) || [];

  // skip post pertama (misalnya buat cover)
  const recentBlogs = blogList.slice(1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (recentBlogs.length === 0) return <p>No posts available</p>;

  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-between">
        <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          Fresh Updates
        </h2>
        <Link
          href="/tags/all"
          className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2 text-base md:text-lg"
        >
          view all
        </Link>
      </div>

      {/* Grid posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {recentBlogs.map((blog, index) => (
          <article key={blog.id ?? index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>

      {/* Tombol Load More */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 border rounded shadow hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 mb-6">
        <a
          href="https://www.magecine.com/wp-content/uploads/2025/03/baner-1-1-1.png"
          className="block w-full"
        >
          <img
            src="https://www.magecine.com/wp-content/uploads/2025/03/baner-1-1-1.png"
            alt="Banner 1"
            className="w-full h-auto rounded-lg"
          />
        </a>

        <a
          href="https://www.magecine.com/wp-content/uploads/2025/03/baner-1-1-1.png"
          className="block w-full"
        >
          <img
            src="https://www.magecine.com/wp-content/uploads/2025/03/baner-1-1-1.png"
            alt="Banner 2"
            className="w-full h-auto rounded-lg"
          />
        </a>
      </div>
    </section>
  );
};

export default RecentPosts;
