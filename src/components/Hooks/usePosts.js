import { useQuery, useInfiniteQuery  } from '@tanstack/react-query';
import { fetchPosts,  fetchPostBySlug, fetchPostsByTag } from '../../utils/api';

// Hook untuk semua posts
export const usePosts = (page = 1, perPage = 4) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page, perPage),
    keepPreviousData: true, // biar data lama tetap ada saat load page baru
    staleTime: 5 * 60 * 1000,
  });
};

export const usePoststag = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page, perPage),
    keepPreviousData: true, // biar data lama tetap ada saat load page baru
    staleTime: 5 * 60 * 1000,
  });
};
// Infinite posts (untuk load more)
export const useInfinitePosts = (perPage = 4) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchPosts(pageParam, perPage); // API ambil per page
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.current_page < lastPage?.total_pages) {
        return lastPage.current_page + 1;
      }
      return undefined; // ga ada lagi
    },
    staleTime: 5 * 60 * 1000,
  });
};
// Trending posts (berdasarkan views, ambil 5 teratas)
export const useTrendingPosts = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const res = await fetchPosts(); // res = { current_page, data, ... }
      const posts = res.data; // ambil array post
      return posts
        .sort((a, b) => b.views - a.views) // urut desc
        .slice(0, 5); // ambil 5 besar
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Detail post by slug
export const usePostBySlug = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug, // hanya fetch kalau slug ada
        retry: false,    // biar gak looping kalau gagal
    staleTime: 5 * 60 * 1000,
  });
};

// ✅ Posts by Tag
export const usePostsByTag = (tagSlug, page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["posts-by-tag", tagSlug, page],
    queryFn: () => fetchPostsByTag(tagSlug, page, perPage),
    enabled: !!tagSlug && tagSlug !== "all",
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};
