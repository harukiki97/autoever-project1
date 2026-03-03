import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
  variant?: "main" | "list"; // main -> 3열, list -> 2열
}

function ProjectGrid({ projects, variant = "list" }: ProjectGridProps) {
  const isMain = variant === "main";

  return (
    <div
      className={`${styles.gridContainer} ${isMain ? styles.main : styles.list}`}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
