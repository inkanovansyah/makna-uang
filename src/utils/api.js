// // lib/api.js
// const BASE_URL = process.env.NEXT_PUBLIC_WP_API;

// async function apiClient(endpoint) {
//   try {
//     const res = await fetch(`${BASE_URL}/${endpoint}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 60 },
//     });

//     if (!res.ok) {
//       throw new Error(`Error API: ${res.status} ${res.statusText}`);
//     }

//     const data = await res.json();
//      // jika data kosong, throw error agar React Query bisa tangani
//     if (!data || Object.keys(data).length === 0) {
//       throw new Error("Data tidak ditemukan");
//     }
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// export const fetchPosts = () => apiClient("myapi/v1/posts");
// export const fetchTrendingPosts = () => apiClient("myapi/v1/trending");
// export const fetchPostBySlug = (slug) => apiClient(`myapi/v1/detail/${slug}`);
// export const fetchPostsByTag = (tagSlug) => apiClient(`myapi/v1/posts-by-tag/${tagSlug}`);

// // export const fetchPostsByCategory = (category) => apiClient(`myapi/v1/posts?category=${category}`);
const BASE_URL = process.env.NEXT_PUBLIC_WP_API;

async function apiClient(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Error API: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // ✅ Cek kalau data kosong
    if (
      !data || // null / undefined
      (Array.isArray(data) && data.length === 0) || // array kosong
      (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length === 0) // object kosong
    ) {
      // return kosong aja, jangan error
      return [];
    }

    return data;
  } catch (error) {
    // console.error("Error fetching data:", error);
    throw error;
  }
}

// ✅ versi baru
export const fetchPosts = (page = 1, perPage = 8) =>
  apiClient(`myapi/v1/posts?page=${page}&per_page=${perPage}`);
export const fetchTrendingPosts = () => apiClient("myapi/v1/trending");
export const fetchPostBySlug = (slug) => apiClient(`myapi/v1/detail/${slug}`);
// export const fetchPostsByTag = (tagSlug) =>
//   apiClient(`myapi/v1/posts-by-tag/${tagSlug}`);
export const fetchPostsByTag = (tagSlug, page = 1, perPage = 50) =>
  apiClient(`myapi/v1/posts-by-tag/${tagSlug}?page=${page}&per_page=${perPage}`);
