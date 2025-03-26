import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
    <body className="h-full flex flex-col">
    <ThemeProvider>
      <header className={`${geistSans.variable} ${geistMono.variable} antialiased w-full p-4 flex justify-end border-b`}>
        <ThemeToggle />
      </header>

      <main className="w-full max-w-3xl mx-auto p-6 flex-grow">
        {children}
      </main>

      <footer className="w-full p-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Blog App. All rights reserved.
      </footer>
    </ThemeProvider>
    </body>
    </html>
  );
}
