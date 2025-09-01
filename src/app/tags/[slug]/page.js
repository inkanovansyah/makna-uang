"use client";

import React, { use } from "react";  
import { usePosts, usePostsByTag } from "../../../components/Hooks/usePosts";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import { slug } from "github-slugger";

const TagsPage = ({ params }) => {
  const { slug: currentSlug } = use(params); 

  // Ambil semua posts
  const { data: allPosts, isLoading: loadingAll } = usePosts();

  // Ambil posts berdasarkan tag (selalu panggil, meski nanti ga dipake)
  const {
    data: tagPosts,
    isLoading: loadingTag,
    error,
  } = usePostsByTag(currentSlug);

  // Loading state
  if (loadingAll || (currentSlug !== "all" && loadingTag)) {
    return <p className="px-5">Loading...</p>;
  }

  // Error state (hanya kalau bukan "all")
  if (currentSlug !== "all" && error) {
    return <p className="px-5 text-red-500">Error: {error.message}</p>;
  }

  // Generate list tags dari semua posts
  const allTags = ["all"];
  allPosts?.forEach((post) => {
    post.tags.forEach((tag) => {
      const slugified = slug(tag);
      if (!allTags.includes(slugified)) allTags.push(slugified);
    });
  });
  allTags.sort();

  // Pilih posts yang akan ditampilkan
  const blogs = currentSlug === "all" ? allPosts : tagPosts;

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{currentSlug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more tags and expand your knowledge!
        </span>
      </div>

      {/* 🔹 Loop tags sebagai tombol navigasi */}
      <Categories categories={allTags} currentSlug={currentSlug} />

      {/* 🔹 List posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs?.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default TagsPage;
