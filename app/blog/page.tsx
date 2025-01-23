import React from "react";
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { auth } from "@/auth";
import axios from "axios";
import {prisma} from "@/app/lib/db";
type Post = {
  id: BigInt;
  createdAt: string;
  updatedAt: string;
  title: string;
  desc: string;
  image: string;
  userId: string;
  slug: string;
}

const getPosts = async(): Promise<Post[]> => {
  const posts = await prisma.post.findMany({});
  const formattedPosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    image: post.image || "",
  }));

  return formattedPosts;
}

const BlogPage = async () => {

  try {
    const posts = await getPosts();
    
    return (
      <>
      <Navbar/>
      <div className={styles.container}>
        {posts.map((post) => (
          <div className={styles.post} key={post.id.toString()}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
      <Footer/>
      </>
  
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return <div>Error loading posts</div>;
  }
};

export default BlogPage;
