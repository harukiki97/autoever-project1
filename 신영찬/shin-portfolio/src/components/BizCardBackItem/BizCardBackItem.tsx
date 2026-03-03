import styles from './BizCardBackItem.module.css';
import PhoneIcon from '../../assets/phone.svg';
import GithubIcon from '../../assets/github.svg';
import LinkedInIcon from '../../assets/linkedin.svg';
import GlobeIcon from '../../assets/globe.svg';
import { useRef, useState } from 'react';

const BizCardBackItem = () => {

    const cardRef = useRef<HTMLElement>(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        // 카드 내 마우스 좌표 상대값 (0 ~ 1)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;

        // 기울기 계산 (-15도 ~ 15도 사이로 회전)
        const rotateX = (py - 0.5) * -30;
        const rotateY = (px - 0.5) * 30;

        // CSS 변수로 전달
        setStyle({
            '--px': `${px * 100}%`,
            '--py': `${py * 100}%`,
            '--rx': `${rotateX}deg`,
            '--ry': `${rotateY}deg`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            '--px': '50%',
            '--py': '50%',
            '--rx': '0deg',
            '--ry': '0deg',
        });
    };

    return (
        <div className={styles.wrapper}>
            <article
                ref={cardRef}
                className={styles.container}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
            >
                <div className={styles.profile_section}>
                    <h1 className={styles.name}>신영찬</h1>
                    <div className={styles.info_section}>
                        <div className={styles.info_item}>
                            <img className={styles.info_label} src={PhoneIcon} />
                            <p className={styles.info_value}>010-3144-1488</p>
                        </div>
                        <div className={styles.info_item}>
                            <img className={styles.info_label} src={GithubIcon} />
                            <a className={styles.info_value} href='https://github.com/shin1488'>https://github.com/shin1488</a>
                        </div>
                        <div className={styles.info_item}>
                            <img className={styles.info_label} src={LinkedInIcon} />
                            <a className={styles.info_value} href='https://www.linkedin.com/in/%EC%98%81%EC%B0%AC-%EC%8B%A0-9aa85b3b3/'>https://www.linkedin.com/in/%EC%98%81%EC%B0%AC-%EC%8B%A0-9aa85b3b3/</a>
                        </div>
                        <div className={styles.info_item}>
                            <img className={styles.info_label} src={GlobeIcon} />
                            <a className={styles.info_value} href='https://shin-portfolio-lyart.vercel.app/'>https://shin-portfolio-lyart.vercel.app/</a>
                        </div>
                    </div>
                    <hr className={styles.divider} />
                    <p className={styles.introduce}>ㅎㅇ</p>

                </div>
            </article>
        </div>
    );
}

export default BizCardBackItem;