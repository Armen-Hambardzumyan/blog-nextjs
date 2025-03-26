import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getPosts(limit = 10, offset = 0, searchQuery = "") {
  try {
    const response = await api.get("/posts", {
      params: {
        _limit: limit,
        _start: offset,
        q: searchQuery || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostById(id: number) {
  try {
    const postResponse = await api.get(`/posts/${id}`);
    const post = postResponse.data;

    const userResponse = await api.get(`/users/${post.userId}`);
    const author = userResponse.data?.name || "Unknown";

    return { ...post, author };
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}
