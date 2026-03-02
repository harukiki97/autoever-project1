import styles from "./FloatingContact.module.css";

export default function FloatingContact() {
  return (
    <div className={styles.floatingContact}>
      <a
        href="mailto:kye1115z@naver.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Email
      </a>

      <a
        href="https://github.com/kye1115z"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>

      <a
        href="https://linkedin.com/in/kye1115z"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  );
}
