import { careers } from "../../data/careers";
import type { CareerCategory } from "../../types";
import styles from "./CareerContent.module.css";

const CareerContent = ({ title }: { title: CareerCategory }) => {
  const categoryData = careers.find((career) => career.category === title);

  if (!categoryData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.lineTitle}>
        <span>{categoryData.category}</span>
      </div>

      {categoryData.items.map((item) => {
        const isCurrent = item.period.includes("현재");

        return (
          <div key={item.id} className={styles.item}>
            <div className={styles.date}>
              <img
                src={
                  title !== "활동"
                    ? isCurrent
                      ? "/assets/icons/Star_color.svg"
                      : "/assets/icons/Star.svg"
                    : isCurrent
                      ? "/assets/icons/Octagram_color.svg"
                      : "/assets/icons/Octagram.svg"
                }
              />
              <p>{item.period}</p>
            </div>
            <div className={styles.content}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.desc}>{item.desc}</p>
              {item.desc_detail && (
                <p className={styles.desc_detail}>{item.desc_detail}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CareerContent;
