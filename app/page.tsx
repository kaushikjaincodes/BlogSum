import Image from "next/image";
import styles from "./home.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function  Home() {
  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Learn and Blog</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati atque natus ab? Minima nam nobis, possimus animi cupiditate debitis minus quos, doloribus rem temporibus laudantium quisquam quibusdam, perferendis dolorum fuga.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/home.gif" alt="" fill className={styles.heroImg} />
      </div>
    </div>
    <Footer />
    </>
  );
}