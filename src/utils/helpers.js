import { compareDesc, parseISO } from "date-fns";

export const sortBlogs = (blogsInput) => {
  // normalisasi: ambil array dari object response API
  const blogs = Array.isArray(blogsInput)
    ? blogsInput
    : blogsInput?.data ?? [];

  return blogs
    .slice()
    .filter((blog) => blog?.publishedAt) // hanya blog yang punya tanggal
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};
