import React from 'react'
import styles from "./postUser.module.css"

type PostUserProps = {
  userID: number;
 }

const getData = async(userID: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`, {cache: "no-store"})
    if(!res.ok) {
      throw new Error("Something went wrong")
    }
    return res.json()
  }

const PostUser = async ({ userID }: PostUserProps) => {
  const user = await getData(userID)
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.uername}>{user.username}</span>
      </div>
    </div>
  )
}

export default PostUser
