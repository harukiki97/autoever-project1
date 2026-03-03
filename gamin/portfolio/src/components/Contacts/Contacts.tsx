import styles from "./Contacts.module.css"; // CSS 모듈 불러오기

function Contacts() {
  return (
    <nav className={styles.floatingNav}>
      <a href="mailto:prettygamin@naver.com">email</a>

      {/* 구분선에 스타일 적용 */}
      <div className={styles.divider} />

      <a
        href="https://github.com/gmcha"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>

      <div className={styles.divider} />

      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </nav>
  );
}

export default Contacts;
