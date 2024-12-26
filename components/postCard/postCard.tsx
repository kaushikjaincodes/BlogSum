import React from 'react'
import Image from 'next/image'
import styles from "./postCard.module.css"
import Link from 'next/link'

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

// Add this type for the component props
type PostCardProps = {
  post: Post
}

const PostCard = ({post}: PostCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
            <Image src="https://images.pexels.com/photos/28297970/pexels-photo-28297970/free-photo-of-a-totoro-statue-is-sitting-on-a-bench-outside-a-restaurant.jpeg" alt='post' fill className={styles.img} />
        </div>
        <span className={styles.date}>25.12.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard
