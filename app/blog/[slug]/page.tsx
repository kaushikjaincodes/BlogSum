import React, { Suspense } from 'react';
import Image from 'next/image';
import styles from './singlePost.module.css';
import PostUser from '@/components/postUser/postUser';
import { getPost } from '@/app/lib/data';

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/28297970/pexels-photo-28297970/free-photo-of-a-totoro-statue-is-sitting-on-a-bench-outside-a-restaurant.jpeg"
          alt=""
          width={250}
          height={550}
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            className={styles.avatar}
            src="https://images.pexels.com/photos/28297970/pexels-photo-28297970/free-photo-of-a-totoro-statue-is-sitting-on-a-bench-outside-a-restaurant.jpeg"
            alt=""
            width={50}
            height={50}
          />
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userID={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>25.12.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.body}</div>
      </div>
    </div>
  );
}