import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <h1 className="text-xl font-bold">My Blog</h1>
      <ThemeToggle />
    </header>
  );
}
