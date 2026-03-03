import { techMap } from "../../utils/getIcons";
import styles from "./Skills.module.css";

function Skills() {
  const mySkillSet = [
    { category: "Language", techNames: ["JavaScript", "TypeScript"] },
    { category: "Frontend", techNames: ["React", "React Query", "Redux"] },
    {
      category: "Backend",
      techNames: ["Express", "Node.js"],
    },
    {
      category: "Others",
      techNames: ["MySQL", "PostgreSQL", "Supabase", "Vercel"],
    },
  ];

  return (
    <div className={styles.skills}>
      {/* 각 카테고리 그룹에 대하여 */}
      {mySkillSet.map((group) => {
        const techItems = group.techNames.map((name) =>
          techMap.get(name.toLowerCase()),
        );
        return (
          <section key={group.category} className={styles.section}>
            <div className={styles.categoryName}>{group.category}</div>

            <hr />

            <div className={styles.techList}>
              {/* techList안에 각 item을 보여준다.  */}
              {techItems.map((item) => {
                return (
                  <div key={item.name} className={styles.techItem}>
                    <img
                      key={item.name}
                      src={`https://cdn.simpleicons.org/${item.icon}/${item.color}`}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Skills;
