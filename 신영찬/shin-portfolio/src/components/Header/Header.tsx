import styles from './Header.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.title_section}>
                <img className={styles.logo} src={logo}></img>
                <p className={styles.title}>신영찬의 포트폴리오</p>
            </Link>
            <div className={styles.nav_section}>
                <p>Home</p>
                <p>Projects</p>
                <p>Blog</p>
                <p>GuestBook</p>
            </div>
        </header>
    );
}

export default Header;