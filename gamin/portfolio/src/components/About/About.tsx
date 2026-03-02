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
          <h1 className="name">차가민</h1>
          <p className="role">Full-stack Developer</p>
        </div>
      </div>

      <div className={styles.bio}>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent orci
          quam, malesuada nec faucibus scelerisque, laoreet nec eros. Cras
          interdum ut nisl ac fringilla. Suspendisse vel mattis est. Fusce eu
          enim vitae neque elementum pharetra. Aliquam ante ipsum, mollis in
          diam id, iaculis tempus dui. Proin pharetra mi tortor, et varius justo
          molestie id. Etiam malesuada nisi id condimentum bibendum.
        </p>
        <p>
          Quisque scelerisque vulputate pharetra. Praesent nec luctus tortor, ut
          dictum quam. Fusce risus nisi, vulputate ut gravida vel, ornare nec
          urna. Curabitur laoreet molestie orci sit amet tempor. Aenean sed
          tellus porta, pretium magna eu, fermentum dolor. Maecenas sed ligula
          blandit, ornare odio et, lobortis turpis. Maecenas vitae iaculis sem,
          vitae rutrum dui. Etiam aliquam, orci nec iaculis imperdiet, massa
          elit maximus velit, a egestas quam sem ut nunc.
        </p>
      </div>
    </section>
  );
}

export default About;
