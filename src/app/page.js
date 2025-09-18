import {blogs} from "@/.velite/generated";
// import { fetchPosts } from "@/utils/api";
import { fetchPosts } from "../utils/api";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default async function Home() {
  const blogs = await fetchPosts(); // ambil dari WP REST API
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs.data} />
      <RecentPosts blogs={blogs} />
    </main>
  )
}
