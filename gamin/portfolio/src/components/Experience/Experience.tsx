import { leftSections, rightSections } from "./data";
import HistorySection from "./HistorySection";
import styles from "./Experience.module.css";

function Experience() {
  return (
    // h1~h6 태그는 스타일 적용 때 고려할거임
    <section>
      <h1>경력사항</h1>
      <div className="styles.gridContainer">
        {/* 왼쪽 단 */}
        <div className="column">
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
        <div className="column">
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
