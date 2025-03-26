import BlogList from "@/components/BlogList";

export default async function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
      </header>
      <BlogList />
    </main>
  );
}
