"use client";

import Link from "next/link";
import { useBlogStore } from "@/lib/store";
import {useEffect, useCallback, useRef, useState, useMemo} from "react";
import debounce from "lodash.debounce";
import SearchBar from "@/components/SearchBar";

const POST_LIMIT = 10;

export default function BlogList() {
  const {
    posts,
    searchQuery,
    isLoading,
    loadMorePosts,
    resetPosts,
    hasMore,
  } = useBlogStore();

  const [hasFetched, setHasFetched] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const prevSearchQuery = useRef<string | null>(null);

  useEffect(() => {
    if (searchQuery !== prevSearchQuery.current) {
      resetPosts();
      prevSearchQuery.current = searchQuery;
      setHasFetched(false);
    }
  }, [searchQuery, resetPosts]);

  const debouncedLoadMore = useMemo(
    () =>
      debounce(async () => {
        try {
          await loadMorePosts();
          setHasFetched(true);
        } catch (error) {
          console.error("Error loading posts:", error);
        }
      }, 800),
    [loadMorePosts, setHasFetched]
  );

  const fetchData = useCallback(async () => {
    try {
      await debouncedLoadMore();
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  }, [debouncedLoadMore]);

  useEffect(() => {
    fetchData();
  }, [searchQuery, fetchData]);

  useEffect(() => {
    if (!hasMore || isLoading || posts.length < POST_LIMIT) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, hasMore, posts.length, loadMorePosts]);

  return (
    <div className="w-full">
      <SearchBar/>

      <section aria-labelledby="blog-list" className="w-full space-y-6">
        <h2 id="blog-list" className="sr-only">
          Blog Posts
        </h2>

        {isLoading && posts.length === 0 ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post.id}
              className="w-full p-4 border-b"
              role="article"
              aria-labelledby={`post-title-${post.id}`}
            >
              <Link
                href={`/blog/${post.id}`}
                className="text-lg font-semibold hover:underline"
                id={`post-title-${post.id}`}
              >
                {post.title}
              </Link>
              <p className="text-gray-600">{post.body.substring(0, 80)}...</p>
            </article>
          ))
        ) : (
          hasFetched && <p className="text-center text-gray-500">No posts found.</p>
        )}
      </section>

      {isLoading && posts.length > 0 && (
        <p className="text-center text-gray-500 mt-4">Loading more posts...</p>
      )}

      {hasMore && posts.length >= POST_LIMIT && <div ref={loadMoreRef} className="h-10"></div>}
    </div>
  );
}
