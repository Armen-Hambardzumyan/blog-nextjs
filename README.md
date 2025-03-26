# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```  

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```  

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

You can start editing the project by modifying `app/page.tsx`. Changes are applied automatically.

## ✨ Features

- **Server-Side Rendering (SSR)** to pre-render content on the server for improved SEO and performance.
- **Infinite Scrolling** for seamless data loading as the user scrolls.
- **Light/Dark Theme Toggle** for enhanced user experience and accessibility.
- **State Management with Zustand**.
- **Responsive UI** using Tailwind CSS.
- **Search Functionality** to filter content dynamically.
- **Deployed on Vercel** for easy access and scalability.

## 🌍 Live Demo

The project is deployed on **Vercel** and can be accessed here:

🔗 **[Live Demo](https://blog-nextjs-mu-three.vercel.app/)**

## 📝 Assumptions & Limitations

- **Assumptions**:
    - The project uses **JSONPlaceholder** as a mock API for demonstration purposes.
    - The app assumes that the API will always return data in the expected format.

- **Limitations**:
    - **Mock API**: The data is fetched from a mock API (JSONPlaceholder) and not from a real backend.
    - **No Authentication**: This project does not implement authentication or authorization.

## 📡 API Integration

This project integrates with [`jsonplaceholder.typicode.com`](https://jsonplaceholder.typicode.com), which provides a mock API for posts.

- The **API** is used to fetch a list of posts and display them in the application.
- **Server-Side Rendering (SSR)** is used to fetch the data before the page is rendered.
- **Infinite Scrolling** is implemented for dynamically loading more posts as the user scrolls.

### Tools and Setup
- **JSONPlaceholder API** is used to simulate fetching real-world data.
- **Tailwind CSS** is used for styling the UI.
- **Zustand** is used for managing state across components.
- **Light/Dark Theme Toggle** functionality is implemented using localStorage and Zustand for theme persistence.

