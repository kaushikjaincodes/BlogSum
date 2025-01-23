import React, { Suspense } from "react";
import Image from "next/image";
import styles from "./singlePost.module.css";
import { prisma } from "@/app/lib/db";  
import PostUser from "@/components/postUser/postUser";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type Post = {
  id: bigint;
  title: string;
  desc: string;
  image: string;
  slug: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const getPost = async (slug: string): Promise<Post> => {
  try {
      const post = await prisma.post.findUnique({
        where:{
          slug:slug,
        }
      });

      if (!post) {
        throw new Error("Post not found");
      }

      return {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        image: post.image || ""
      };
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
    userId : post.userId,
  };
};

export default async function SinglePostPage({ params }: {params: Params}) {
  const { slug } = await params;
  const post = await getPost(slug);
 
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={post.image}
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
              <PostUser userId={post.userId}  />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post.createdAt.toString().slice(0, 10)}
            </span>
        </div>
      </div>
      <div className={styles.content}>{post.desc}</div>
    </div>
    </div>
    <Footer/>
    </>
  );
}