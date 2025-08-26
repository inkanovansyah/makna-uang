import { useQuery } from '@tanstack/react-query';
import { fetchPosts,  } from '../../utils/api';

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

// // Hook untuk posts by category
// export const usePostsByCategory = (category) => {
//   return useQuery({
//     queryKey: ['posts', category],
//     queryFn: () => fetchPostsByCategory(category),
//     enabled: !!category, // Hanya fetch jika category ada
//     staleTime: 5 * 60 * 1000,
//   });
// };