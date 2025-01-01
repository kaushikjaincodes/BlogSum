import React from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
// import { getPosts } from "../lib/data";

// Define the post interface
// interface Post {
//   id: number
//   title: string
//   body: string
//   userId: number
// }

// const getData = async() => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {next:{revalidate:3600}})
//   if(!res.ok) {
//     throw new Error("Something went wrong")
//   }
//   return res.json()
// }

// const BlogPage = async () => {
//   const posts = await getPosts();
//   return (
//     <div className={styles.container}>
//       {posts.map((post) => (
//         <div className={styles.post} key={post.id}>
//           <PostCard post={post} />
//         </div>
//       ))}
//     </div>
//   );
// };

type Post = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  desc: string;
  img: string;
  userId: string;
  slug: string;
}

const getPosts = async(): Promise<Post[]> => {
  try {
    // Get the origin with a fallback to localhost if needed
    let origin = typeof window !== 'undefined' ? window.location.origin : '';
    if (!origin) {
      origin = 'http://localhost:3000'; // Fallback for development
    }
    
    // Create the full URL by combining origin and path
    const url = `${origin}/api/blog`;
    console.log('Fetching from:', url); // This should now show the   full URL
    
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const posts = await res.json();
    return posts as Post[];

  } catch (error) {
    console.error("Detailed fetch error:", error);
    throw error;
  }
}

const BlogPage = async () => {
  try {
    const posts = await getPosts();
    
    if (!posts || posts.length === 0) {
      return <div>No posts found</div>;
    }

    console.log('Posts data:', posts); // Add this to debug

    return (
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <div>Error loading posts</div>;
  }
};

export default BlogPage;
