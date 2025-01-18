import React from 'react'
import Image from 'next/image'
import styles from "./postCard.module.css"
import Link from 'next/link'

type Post = {
  id: BigInt
  createdAt: string
  updatedAt: string
  title: string
  desc: string
  image: string
  userId: string  // Changed from number to string
  slug: string
}

// Add this type for the component props
type PostCardProps = {
  post: Post
}

// const PostCard = ({post}: PostCardProps) => {
//   console.log(post)
//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <div className={styles.imgContainer}>
//         <Image 
//               src={post.img} 
//               alt={post.title} 
//               fill 
//               className={styles.img}
//             />
//         </div>
//         <span className={styles.date}>25.12.2024</span>
//       </div>
//       <div className={styles.bottom}>
//         <h1 className={styles.title}>{post.title}</h1>
//         <p className={styles.desc}>{post.desc}</p>
//         <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
//       </div>
//     </div>
//   )
// }

const PostCard = ({post}: PostCardProps) => {
  if (!post) return null;
  
  // console.log('Individual post data:', post); // Add this to debug

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          {post.image && (
            <Image 
              src={post.image} 
              alt={post.title || 'Blog post'} 
              fill 
              className={styles.img}
            />
          )}
        </div>
        <span className={styles.date}>{post.createdAt.toString().slice(2, 10)}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc.slice(0, 25)}...</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard
