"use client";

import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";
import { useTrendingPosts } from "../Hooks/usePosts";

const BlogLayoutOne = () => {
  const { data: blogs, isLoading, error } = useTrendingPosts(); // ✅ ambil trending
  // 🌀 Loading State
  if (isLoading) {
    return (
      <div className="w-full h-60 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
        Loading blog...
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="w-full h-60 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
        Failed to load blog!
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full h-60 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        No blog posts available
      </div>
    );
  }

  // ambil blog pertama (atau bisa map list)
  const blog = blogs[0];

  return (
    <div className="group relative inline-block overflow-hidden rounded-xl">
      {/* Overlay */}
      <div
        className="absolute top-0 left-0 bottom-0 right-0 h-full
          bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10"
      />

      {/* Gambar */}
      {blog.image ? (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={600}
          className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 1180px) 100vw, 50vw"
        />
      ) : (
        <div className="w-full h-60 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Konten */}
      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20">
        {blog.tags?.length > 0 && (
          <Tag
            link={`/categories/${slug(blog.tags[0])}`}
            name={blog.tags[0]}
            className="px-6 text-xs sm:text-sm py-1 sm:py-2 !border"
          />
        )}

        <Link href={blog.slug ? `/blogs/${blog.slug}` : "#"} className="mt-6 block">
          <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] 
              dark:from-accentDark/50 dark:to-accentDark/50
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat 
              transition-[background-size] duration-500"
            >
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;