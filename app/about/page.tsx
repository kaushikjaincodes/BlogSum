import React from 'react'
import Image from 'next/image'
import styles from "./about.module.css"
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'

export const metadata = { title: "About Page", description: "Aboout decription"}

const AboutPage = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          When you learn something, blog it up here!
        </h1>
        <p className={styles.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quo doloremque a doloribus soluta odit animi eveniet eligendi fuga voluptatem commodi laborum, alias perspiciatis dolores quas minima, dignissimos atque cupiditate.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}><h1>10 K+</h1><p>Year of experience</p></div>
          <div className={styles.box}><h1>10 K+</h1><p>Year of experience</p></div>
          <div className={styles.box}><h1>10 K+</h1><p>Year of experience</p></div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.jpeg" alt='About Image' fill className={styles.img} />
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default AboutPage
