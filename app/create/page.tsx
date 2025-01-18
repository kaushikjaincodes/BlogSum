"use client"
import Navbar from "@/components/navbar/Navbar";
// import { addPost, deletePost } from "../../actions/action";
import styles from "./create.module.css"
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
interface FormData{
  title : string;
  desc : string;
  img : string;
  email:string;
}
interface User {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

const Create = () => {
  const {data: session} = useSession();
  const [formData, setFormData] =useState<FormData>({
    title :'',
    desc:'',
    img:'',
    email:session?.user?.email || "",
  });
  const [responseMesage, setResponseMesage] = useState<string>('');

  const handleChange =  (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name , value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const addPost = async (e : React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try{
      const response  = await axios.post('api/blog/addpost',formData);
      setResponseMesage(response.data.message);
      alert(response.data.message);
    }catch(error){
      console.log(error);
      alert(responseMesage);
   }
  }
  return (
    <>
    <Navbar/>
    <div className={styles.wrapper}>
      {/* <div>
        <h2 className={styles.head}>Existing Users</h2>
        {users.map((user) => (
          <div key={user.id} className={styles.userRow}>
            <span className={styles.username}>{user.username}</span>
            <span className={styles.separator}> - </span>
            <span className={styles.userId}>{user.id}</span>
          </div>
        ))}
      </div> */}

      <div className={styles.formWrapper}>
        <h2 className={styles.head}>Create Post</h2>
        <form onSubmit={addPost} className={styles.form}>
          <input type="text" placeholder="Title" name="title" className={styles.input} value={formData.title} onChange={handleChange}/>
          <textarea placeholder="Description" name="desc" className={styles.input} value={formData.desc} onChange={handleChange}/>
          <input type="text" placeholder="Image URL" name="img" className={styles.input} value={formData.img} onChange={handleChange}/>
          <button className={styles.button}>Create</button>
        </form>
      </div>

      {/* <div className={styles.formWrapper}>
        <h2 className={styles.head}>Delete Post</h2>
        <form action={deletePost} className={styles.form}>
          <input type="text" placeholder="Post ID" name="id" className={styles.input} />
          <button className={styles.button}>Delete</button>
        </form>
      </div> */}
    </div>
    <Footer/>
    </>
  )
}

export default Create
