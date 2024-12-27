import React, { Suspense } from "react";
import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";

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
      next: { revalidate: 3600 },
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

type Params = Promise<{ slug: string }>;

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params; 
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.desc,
  };
};

export default async function SinglePostPage({ params }: {params: Params}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={post.img}
          alt={post.title || "Blog post"}
          width={250}
          height={550}
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userID={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.created_at.toString().slice(0, 10)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
}