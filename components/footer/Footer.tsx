import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>L&B</div>
      <div className={styles.text}>
        L&B Ltd. &copy All rights reserved.
      </div>
    </div>
  )
}

export default Footer
