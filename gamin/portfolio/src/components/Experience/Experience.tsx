import { leftSections, rightSections } from "./data";
import HistorySection from "./HistorySection";
import styles from "./Experience.module.css";

function Experience() {
  return (
    <section className={styles.section}>
      <div className={styles.title}>경력사항</div>
      <div className={styles.gridContainer}>
        {/* 왼쪽 단 */}
        <div className={styles.column}>
          {leftSections.map((section) => (
            // 교육 / 어학 및 자격증
            <HistorySection
              key={section.sectionTitle}
              title={section.sectionTitle}
              items={section.items}
            />
          ))}
        </div>
        {/* 오른쪽 단 */}
        <div className={styles.column}>
          {rightSections.map((section) => (
            // 활동
            <HistorySection
              key={section.sectionTitle}
              title={section.sectionTitle}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
