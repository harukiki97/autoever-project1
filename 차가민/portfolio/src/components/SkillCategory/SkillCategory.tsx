import styles from "./SkillCategory.module.css";

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategoryProps {
  category: string;
  items: SkillItem[];
}

function SkillCategory({ category, items }: SkillCategoryProps) {
  return (
    <div className={styles.categoryBlock}>
      <h2>{category}</h2>
      <hr className={styles.hr} />

      <div className={styles.skillList}>
        {items.map((skill) => (
          <div className={styles.skillItem}>
            <img src={skill.icon} alt={`${skill.name} 아이콘`} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillCategory;
