import { create } from "zustand";
import { fetchPostsServer } from "@/lib/actions";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface BlogStore {
  posts: Post[];
  searchQuery: string;
  offset: number;
  isLoading: boolean;
  hasMore: boolean;
  setSearchQuery: (query: string) => void;
  resetPosts: (initialPosts?: Post[]) => void;
  loadMorePosts: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  searchQuery: "",
  offset: 0,
  isLoading: false,
  hasMore: true,

  setSearchQuery: (query) => {
    set({ searchQuery: query, offset: 0, posts: [], hasMore: true });
  },

  resetPosts: (initialPosts = []) => {
    set({ posts: initialPosts, offset: initialPosts.length, hasMore: initialPosts.length > 0 });
  },

  loadMorePosts: async () => {
    const { offset, searchQuery, posts } = get();
    set({ isLoading: true });

    try {
      const { posts: newPosts, hasMore } = await fetchPostsServer(10, offset, searchQuery);
      set({
        posts: [...posts, ...newPosts],
        offset: offset + newPosts.length,
        hasMore,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
