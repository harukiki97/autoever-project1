import CareerContent from "../../components/Career/CareerContent";
import styles from "./Career.module.css";

const Career = () => {
  return (
    <div className={styles.careerContainer}>
      <div className={styles.career}>
        <p className="section-title">경력 사항</p>
        <div className={styles.careerContents}>
          <div className={styles.left}>
            <CareerContent title="교육"></CareerContent>
            <CareerContent title="어학 및 자격증"></CareerContent>
          </div>
          <CareerContent title="활동"></CareerContent>
        </div>
      </div>
    </div>
  );
};

export default Career;
