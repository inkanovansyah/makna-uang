"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/** Utility: format tanggal di client agar SSR dan client tidak beda */
function useFormattedDate(dateString) {
  const [formatted, setFormatted] = useState("Unknown date");

  useEffect(() => {
    if (dateString) {
      const d = new Date(dateString);
      setFormatted(
        d.toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      );
    }
  }, [dateString]);

  return formatted;
}

const BlogLayoutThree = ({ blog }) => {
  const dateText = useFormattedDate(blog.publishedAt);
  if (!blog) return null; // ✅ perbaikan, bukan `blogs`


  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      <Link href={blog.slug ? `/blogs/${blog.slug}` : "#"} className="h-full rounded-xl overflow-hidden">
        <Image
          src={blog.image }
          alt={blog.title }
          width={400}
          height={300}
          className="aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog.tags?.[0] || "Uncategorized"}
        </span>

        <Link href={blog.slug ? `/blogs/${blog.slug}` : "#"} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span
              className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50
              dark:to-accentDark/50
              bg-[length:0px_6px]
              group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
            >
              {blog.title || "Untitled"}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base">
          {dateText}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutThree;
