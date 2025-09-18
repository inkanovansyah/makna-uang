"use client";

import { usePoststag, usePostsByTag } from "../../../components/Hooks/usePosts";
import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import { slug } from "github-slugger";
import React, { use } from "react";

const TagsPage = ({ params }) => {
  const { slug: currentSlug } = use(params); // ✅ ini cara resmi
  // Ambil semua posts → untuk daftar tags & untuk "all"
  const { data: allPostsResponse, isLoading: loadingAll } = usePoststag();

  // Ambil posts berdasarkan tag (hanya kalau bukan "all")
  const {
    data: tagPostsResponse,
    isLoading: loadingTag,
    error,
  } = usePostsByTag(currentSlug, 1, 9); // pastikan ada page & perPage

  // Loading state
  if (loadingAll || (currentSlug !== "all" && loadingTag)) {
    return <p className="px-5">Loading...</p>;
  }

  // Error state
  if (currentSlug !== "all" && error) {
    return <p className="px-5 text-red-500">Error: {error.message}</p>;
  }

  // 🔹 Data posts
  const allPosts = allPostsResponse?.data ?? [];
  const tagPosts = Array.isArray(tagPostsResponse)
  ? tagPostsResponse
  : tagPostsResponse?.data ?? [];


  const blogs = currentSlug === "all" ? allPosts : tagPosts;

  // 🔹 Pagination info
  const pagination =
    currentSlug === "all"
      ? {
          current_page: allPostsResponse?.current_page,
          total_pages: allPostsResponse?.total_pages,
          total_posts: allPostsResponse?.total_posts,
        }
      : {
          current_page: tagPostsResponse?.current_page,
          total_pages: tagPostsResponse?.total_pages,
          total_posts: tagPostsResponse?.total_posts,
        };

  // 🔹 Generate daftar tags
  const allTags = ["all"];
  allPosts?.forEach((post) => {
    post.tags?.forEach((tag) => {
      const slugified = slug(tag);
      if (!allTags.includes(slugified)) {
        allTags.push(slugified);
      }
    });
  });
  allTags.sort();

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      {/* Header */}
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{currentSlug}
        </h1>
        <span className="mt-2 inline-block">
          Discover more tags and expand your knowledge!
        </span>
      </div>

      {/* 🔹 Navigasi tags */}
      <Categories categories={allTags} currentSlug={currentSlug} />

      {/* 🔹 List posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs?.map((blog) => (
          <article key={blog.id} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>

      {/* 🔹 Pagination */}
      {pagination?.total_pages > 1 && (
        <div className="mt-10 px-5 sm:px-10 md:px-24 sxl:px-32 text-center">
          <p>
            Page {pagination.current_page} of {pagination.total_pages} | Total:{" "}
            {pagination.total_posts} posts
          </p>
        </div>
      )}
    </article>
  );
};

export default TagsPage;
