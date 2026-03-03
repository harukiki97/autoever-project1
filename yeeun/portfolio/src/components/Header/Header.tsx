import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        김예은의 포트폴리오
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navLink}>
          Home
        </NavLink>

        <NavLink to="/projects" className={styles.navLink}>
          Projects
        </NavLink>

        <NavLink to="/blog" className={styles.navLink}>
          Blog
        </NavLink>

        <NavLink to="/guestbook" className={styles.navLink}>
          GuestBook
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
