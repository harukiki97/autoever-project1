import { techMap } from "../../utils/getIcon";
import styles from "./Skills.module.css";

const Skills = () => {
  const selectedSkills = [
    {
      category: "Language",
      techIds: ["javascript", "typescript", "java", "python"],
    },
    {
      category: "Frontend",
      techIds: ["react", "nextjs", "tailwind"],
    },
    {
      category: "Backend & DB",
      techIds: ["nodejs", "spring", "postgresql", "mysql"],
    },
    {
      category: "Tools & Others",
      techIds: ["git", "github", "docker", "figma"],
    },
  ];

  return (
    <div className={styles.skills}>
      <h1 className="section-title">Skills</h1>
      {selectedSkills.map((group) => {
        const techItems = group.techIds.map((name) =>
          techMap.get(name.toLowerCase()),
        );

        return (
          <section key={group.category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{group.category}</h2>

            <div className={styles.iconGrid}>
              {techItems.map(
                (tech) =>
                  tech && (
                    <div key={tech.id} className={styles.skillItem}>
                      <img
                        key={tech.name}
                        src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                        alt={tech.name}
                        className={styles.icon}
                      />
                      <span className={styles.skillName}>{tech.name}</span>
                    </div>
                  ),
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Skills;
