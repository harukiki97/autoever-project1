import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <hr className={styles.hr} />
      <p className={styles.text}>Copyright 2026. 차가민 all rights reserved.</p>
    </footer>
  );
}

export default Footer;
