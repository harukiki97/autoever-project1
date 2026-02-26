import SkillCategory from "../SkillCategory/SkillCategory";
import { SKILLS_DATA } from "./data";
import styles from "./Skills.module.css";

function Skills() {
  return (
    <div className={styles.skills}>
      {SKILLS_DATA.map((data) => (
        <SkillCategory
          key={data.category}
          category={data.category}
          items={data.items}
        />
      ))}
    </div>
  );
}

export default Skills;
