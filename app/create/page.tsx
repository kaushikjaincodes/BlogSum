import { addPost, deletePost } from "../lib/action";
import { supabase } from "../lib/supabaseClient";
import styles from "./create.module.css"

interface User {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

const getUsers = async (): Promise<User[]> => {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    throw new Error('Failed to fetch users: ' + error.message)
  }

  return users || []
}

const Create = async () => {
  const users = await getUsers()
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={styles.head}>Existing Users</h2>
        {users.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.separator}> - </span>
            <span className={styles.userId}>{user.id}</span>
          </div>
        ))}
      </div>

      <div className={styles.formWrapper}>
        <h2 className={styles.head}>Create Post</h2>
        <form action={addPost} className={styles.form}>
          <input type="text" placeholder="Title" name="title" className={styles.input} />
          <textarea placeholder="Description" name="desc" className={styles.input} />
          <input type="text" placeholder="Slug" name="slug" className={styles.input} />
          <input type="text" placeholder="User ID" name="userId" className={styles.input} />
          <input type="text" placeholder="Image URL" name="img" className={styles.input} />
          <button className={styles.button}>Create</button>
        </form>
      </div>

      <div className={styles.formWrapper}>
        <h2 className={styles.head}>Delete Post</h2>
        <form action={deletePost} className={styles.form}>
          <input type="text" placeholder="Post ID" name="id" className={styles.input} />
          <button className={styles.button}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default Create
