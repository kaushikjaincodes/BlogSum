import React from 'react'
import styles from "./postUser.module.css"
import { getUser } from '@/app/lib/data'
import Image from "next/image"
import { ImageProps } from 'next/image';

type PostUserProps = {
  userID: string;
 }

// const getData = async(userID: number) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`, {cache: "no-store"})
//     if(!res.ok) {
//       throw new Error("Something went wrong")
//     }
//     return res.json()
//   }

// const PostUser = async ({ userID }: PostUserProps) => {
//   try {
//     console.log('Fetching user with ID:', userID); // Debug log
//     const user = await getUser(userID);
    
//     if (!user) {
//       console.log('No user found'); // Debug log
//       return <div>No user found</div>;
//     }

//     return (
//       <div className={styles.container}>
//         <Image
//           {...({
//             className: styles.avatar,
//             src: user.img || "/noavatar.png",
//             alt: "",
//             width: 50,
//             height: 50
//           } as ImageProps)}
//         />
//         <div className={styles.texts}>
//           <span className={styles.title}>Author</span>
//           <span className={styles.username}>{user.username}</span>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error in PostUser:", error);
//     return <div>Error loading user</div>;
//   }
// }
const PostUser = async ({ userID }: PostUserProps) => {
  // console.log('Received userID:', userID, typeof userID)
  try {
    if (!userID) return <div>No user ID provided</div>;
    
    const user = await getUser(userID);
    // console.log('Received userID:', userID, typeof userID);
    if (!user) return <div>User not found</div>;

    return (
      <div className={styles.container}>
        <Image
          className={styles.avatar}
          src={user.img || "/noavatar.png"}
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.texts}>
          <span className={styles.title}>Author</span>
          <span className={styles.username}>{user.username}</span>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in PostUser:", error);
    return <div>Error loading user</div>;
  }
}

export default PostUser
