import FloatingContact from "../../components/Contact/FloatingContact";
import Footer from "../../components/Footer/Footer";
import AboutMe from "../AbooutMe/AboutMe";
import Career from "../Career/Career";
import Posts from "../Posts/Posts";
import Projects from "../Projects/Projects";
import Skills from "../Skills/Skills";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <section id="about" className={styles.section}>
        <AboutMe />
      </section>
      <section id="skills" className={styles.section}>
        <Skills />
      </section>
      <section id="career" className={styles.section}>
        <Career />
      </section>
      <section id="project" className={styles.section}>
        <Projects />
      </section>
      <section id="blog" className={styles.section}>
        <Posts />
      </section>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Home;
