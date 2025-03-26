"use server";

import { getPosts } from "@/lib/api";

export async function fetchPostsServer(limit: number, offset: number, searchQuery = "") {
  try {
    const posts = await getPosts(limit, offset, searchQuery);
    return { posts, hasMore: posts.length > 0 };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [], hasMore: false };
  }
}