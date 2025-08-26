// lib/api.js
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
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const fetchPosts = () => apiClient("myapi/v1/posts");
export const fetchTrendingPosts = () => apiClient("myapi/v1/trending");
// export const fetchPostBySlug = (slug) => apiClient(`myapi/v1/posts/${slug}`);
// export const fetchPostsByCategory = (category) => apiClient(`myapi/v1/posts?category=${category}`);