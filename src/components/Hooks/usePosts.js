import { useQuery } from '@tanstack/react-query';
import { fetchPosts,  fetchPostBySlug, fetchPostsByTag } from '../../utils/api';

// Hook untuk semua posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 menit
  });
};

// Trending posts (berdasarkan views, ambil 5 teratas)
export const useTrendingPosts = () => {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const posts = await fetchPosts();
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
export const usePostsByTag = (tagSlug) => {
  return useQuery({
    queryKey: ["posts-by-tag", tagSlug],
    queryFn: () => fetchPostsByTag(tagSlug),
    enabled: !!tagSlug, // hanya jalan kalau ada tag
    staleTime: 5 * 60 * 1000,
  });
};