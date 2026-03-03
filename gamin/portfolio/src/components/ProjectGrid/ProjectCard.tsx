import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { techMap } from "../../utils/getIcons";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    return `${year}.${month}`;
  };

  const renderTechIcons = () => {
    if (!project.tech_stacks || !Array.isArray(project.tech_stacks))
      return null;
    const resolvedTechIcons = project.tech_stacks
      .map((stack) => {
        const techName = stack.name.trim().toLowerCase();
        return techMap.get(techName);
      })
      .filter((iconData) => iconData !== undefined);

    return (
      <div className={styles.iconWrapper}>
        {resolvedTechIcons.map((item) => (
          <img
            key={item.name}
            src={`https://cdn.simpleicons.org/${item.icon}/${item.color}`}
            alt={item.name}
            title={item.name}
            width={24}
          />
        ))}
      </div>
    );
  };

  return (
    <Link to={`/projects/${project.slug}`} className={`${styles.card}`}>
      {/* 썸네일 */}
      <div className={styles.thumbnailWrapper}>
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className={
              styles.thumbnail
            } /* width 하드코딩 제거, CSS 클래스 적용 */
          />
        ) : (
          <div className={styles.thumbnail}></div>
        )}
      </div>

      <div className={styles.fullContent}>
        {/* 텍스트 부분 */}
        <div className={styles.textContent}>
          <div className={styles.title}>{project.title}</div>
          <div className={styles.meta}>
            <span>
              {formatDate(project.start_date)} ~{" "}
              {project.end_date ? formatDate(project.end_date) : ""}
            </span>
            <span className={project.is_team ? styles.team : styles.personal}>
              {project.is_team ? "팀 프로젝트" : "개인 프로젝트"}
            </span>
          </div>
          <p className={styles.summary}>{project.summary}</p>
        </div>

        {/* 기술 스택 부분 */}
        {renderTechIcons()}
      </div>
    </Link>
  );
}

export default ProjectCard;
