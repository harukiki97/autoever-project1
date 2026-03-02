import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import { techMap } from "../../utils/getIcons";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  layout: "vertical" | "horizontal";
}

function ProjectCard({ project, layout }: ProjectCardProps) {
  const isVertical = layout === "vertical";
  const layoutClass = isVertical ? styles.vertical : styles.horizontal;

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
      <div className="techIconsWrapper">
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
    <Link to={`/projects/${project.slug}`} className={`${layoutClass}`}>
      {/* 썸네일 */}
      <div>
        {project.thumbnail_url ? (
          // 사진 크기 임의 지정
          <img
            src={project.thumbnail_url}
            alt={project.title}
            width={400}
            height={320}
          />
        ) : (
          <div></div>
        )}
      </div>

      {/* 텍스트 부분 */}
      <div>
        <div>
          <h3>{project.title}</h3>
          <div>
            <span>
              {formatDate(project.start_date)} ~{" "}
              {project.end_date ? formatDate(project.end_date) : ""}
            </span>
            <span>{project.is_team ? "팀 프로젝트" : "개인 프로젝트"}</span>
          </div>
          <p>{project.summary}</p>
        </div>
      </div>

      {/* 기술 스택 부분 */}
      <div>{renderTechIcons()}</div>
    </Link>
  );
}

export default ProjectCard;
