"use client";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import styles from "./style.module.css";

const LoginGoogle = () => {
  return (
    <div
      className={styles.googlebtn}
      onClick={async () => {
        await signIn("google", { redirectTo: "/" });
        revalidatePath("/");
      }}
    >
      <FaGoogle className={styles.icon} />
      <span className={styles.text}>Google</span>
    </div>
  );
};

export default LoginGoogle;
