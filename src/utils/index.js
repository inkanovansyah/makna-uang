import { compareDesc, parseISO } from "date-fns";

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs) => {
  // Ambil array dari blogs.data kalau bukan array langsung
  const blogList = Array.isArray(blogs) ? blogs : blogs?.data;

  if (!Array.isArray(blogList)) {
    console.error("sortBlogs: blogs bukan array", blogs);
    return [];
  }

  return blogList
    .slice()
    .filter((blog) => blog?.publishedAt)
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};
