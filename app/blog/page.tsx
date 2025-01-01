import React from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

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
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/blog`, {
      next: { revalidate: 3600 }
    })

    if (!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const posts = await res.json();
    return posts as Post[];

  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch blog posts");
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
