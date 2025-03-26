import { getPostById } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post: Post | null = await getPostById(Number(id));

  if (!post) {
    return <p className="text-center text-red-500" role="alert">Post not found.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto p-6" aria-labelledby="post-title">
      <header>
        <h1 id="post-title" className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-4" aria-label="Author">Author: {post.author}</p>
      </header>
      <p className="text-gray-600">{post.body}</p>
    </article>
  );
}
