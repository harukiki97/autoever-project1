import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        {/* 임시 이미지 크기 지정 */}
        <img src={logoImg} alt="로고 사진 (현대오토에버 고양이)" width={74} />
        <h1>가민's 포트폴리오</h1>
      </div>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blogs">Blog</Link>
        <Link to="/guestbook">GuestBook</Link>
      </nav>
    </header>
  );
}

export default Header;
