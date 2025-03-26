"use client";

import { useBlogStore } from "@/lib/store";
import { useState, useMemo } from "react";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const { setSearchQuery } = useBlogStore();
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((query) => setSearchQuery(query), 800),
    [setSearchQuery]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useMemo(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={inputValue}
      onChange={handleChange}
      className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
    />
  );
}
