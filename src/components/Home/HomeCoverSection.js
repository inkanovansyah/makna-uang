// components/HomeCoverSection.js
'use client'

import { sortBlogs } from '@/src/utils'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';
import { usePosts } from '../Hooks/usePosts';

const HomeCoverSection = () => {
  const { data: blogs, isLoading, error } = usePosts(); // ✅ Ambil data dari usePosts()

  // Debug log
  // console.log("Blogs data from usePosts:", blogs);
  // console.log("Loading state:", isLoading);
  // console.log("Error state:", error);

  // 🌀 Loading State
  if (isLoading) {
    return (
      <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
          <div className='w-full h-full bg-gray-200 rounded-3xl flex items-center justify-center'>
            <div className="animate-pulse text-center">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 mx-auto"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading blogs...</p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
          <div className='w-full h-full bg-red-100 rounded-3xl flex items-center justify-center'>
            <div className="text-center">
              <span className='text-red-600 font-bold'>Error loading blogs!</span>
              <p className="text-red-500 mt-2">{error.message}</p>
              <p className="text-sm text-gray-600 mt-4">Please check your API connection</p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // 🟡 Kalau blogs kosong
  if (!blogs || blogs.length === 0) {
    return (
      <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
          <div className='w-full h-full bg-gray-200 rounded-3xl flex items-center justify-center'>
            <span className='text-gray-500'>No blog posts available</span>
          </div>
        </article>
      </div>
    );
  }

  // 🔽 Sort dan ambil blog pertama
  const sortedBlogs = sortBlogs(blogs);

  if (!sortedBlogs || sortedBlogs.length === 0) {
    return (
      <div className='w-full inline-block'>
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
          <div className='w-full h-full bg-gray-200 rounded-3xl flex items-center justify-center'>
            <span className='text-gray-500'>No sorted blog available</span>
          </div>
        </article>
      </div>
    );
  }

  const blog = sortedBlogs[0];

  // Debug log
  console.log("Selected blog:", blog);

  return (
    <div className='w-full inline-block'>
      <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
        <div className='absolute top-0 left-0 bottom-0 right-0 h-full
        bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0
        '/>
        
        {/* 🖼️ Image / fallback */}
        {blog?.image ? (
          <Image
            src={blog.image}
            alt={blog.title || "No title"}
            fill
            className="w-full h-full object-center object-cover rounded-3xl -z-10"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-3xl flex items-center justify-center -z-10">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {/* 📝 Content */}
        <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
         <div className="flex gap-2">
            {blog?.tags?.length > 0 ? (
                blog.tags.map((tag, index) => (
                <Tag key={index} link={`/tags/${slug(tag)}`} name={tag} />
                ))
            ) : (
                <Tag link="#" name="No Tag" />
            )}
        </div>

          
          <Link href={blog?.slug ? `/blogs/${blog.slug}` : "#"} className='mt-6'>
            <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
              <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                dark:to-accentDark/50 bg-[length:0px_6px]
                hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                {blog?.title || "Untitled"}
              </span>
            </h1>
          </Link>

          <p className='hidden sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
            {blog?.description || "No Description"}
          </p>

          {/* Debug info - hapus di production */}
          {/* <div className="mt-4 p-2 bg-black/50 rounded text-xs">
            <p>Slug: {blog?.slug || "No Slug"}</p>
            <p>Tags: {blog?.tags?.join(', ') || 'None'}</p>
          </div> */}
        </div>
      </article>
    </div>
  )
}

export default HomeCoverSection;