import profileImg from "../../assets/profile.png";
import styles from "../About/About.module.css";

function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.idCard}>
        <img
          src={profileImg}
          alt="가민의 프로필 사진"
          className={styles.profileImg}
        />
        <div className="idText">
          <div className={styles.name}>차가민</div>
          <p className={styles.role}>Full-stack Developer</p>
        </div>
      </div>

      <div className={styles.bio}>
        <p>
          {" "}
          안녕하세요! 사용자 친화적인 웹 서비스를 만들어가는 풀스택 개발자
          차가민입니다. 프론트엔드와 백엔드를 아우르며 견고한 웹 애플리케이션을
          구축하는 데 관심이 많으며, 주로 React와 TypeScript, 그리고 Supabase를
          활용하여 직관적이고 효율적인 프로덕트를 개발하는 것을 즐깁니다.
        </p>
        <p>
          새로운 기술을 배우고 적용하는 과정을 중요하게 생각하며, 매일 새롭게
          알게 된 내용이나 프로젝트 진행 중 마주한 고민들을 꾸준히 기록하며
          성장하고 있습니다. 단순한 기능 구현을 넘어 '왜 이 기술을 사용하는지'
          깊이 고민하며, 사용자에게 더 나은 경험을 제공할 수 있는 탄탄한
          개발자가 되는 것이 저의 목표입니다.
        </p>
      </div>
    </section>
  );
}

export default About;
