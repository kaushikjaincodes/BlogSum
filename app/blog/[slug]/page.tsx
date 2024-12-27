import React, { Suspense } from "react";
import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";

type Params = {
  params: {
    slug: string;
  };
};

// Type definition for Post
type Post = {
  id: string;
  title: string;
  desc: string;
  img: string;
  slug: string;
  userId: string;
  created_at: string;
  updated_at: string;
};

const getPost = async (slug: string): Promise<Post> => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      next: { revalidate: 3600 }, // Optional: Add revalidation logic for caching
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post. Status: ${res.status}`);
    }

    const post: Post = await res.json();
    return post;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw new Error("Something went wrong while fetching the post!");
  }
};

export const generateMetadata = async ({params}: Params) => {
  const { slug } = params;
  const post = await getPost(slug)
  return{
    title: post.title,
    description: post.desc,
  }
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  // console.log('Post userId:', post.userId, typeof post.userId);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src= {post.img}
          alt={post.title || 'Blog post'} 
          width={250}
          height={550}
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {/* <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/28297970/pexels-photo-28297970/free-photo-of-a-totoro-statue-is-sitting-on-a-bench-outside-a-restaurant.jpeg"
            alt=""
            width={50}
            height={50}
          /> */}
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userID={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.created_at.toString().slice(0, 10)}</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
}
