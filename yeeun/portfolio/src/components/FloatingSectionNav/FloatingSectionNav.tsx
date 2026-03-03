// components/FloatingSectionNav.tsx

import styles from "./FloatingSectionNav.module.css";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skill" },
  { id: "experience", label: "Experience" },
  { id: "project", label: "Project" },
  { id: "blog", label: "Blog" },
];

export default function FloatingSectionNav() {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.floatingNav}>
      {sections.map((section) => (
        <button key={section.id} onClick={() => handleClick(section.id)}>
          {section.label}
        </button>
      ))}
    </div>
  );
}
