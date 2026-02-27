import { useEffect, useState } from "react";
import type { Project } from "../../types/TopProjects";
import { supabase } from "../../api/supabase";
import { Link } from "react-router-dom";
import { techMap } from "../../utils/getIcons";
import styles from "./TopProjects.module.css";

function TopProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchTopProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("start_date", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data);
    };

    fetchTopProjects();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    return `${year}.${month}`;
  };

  // TechStack 아이콘 렌더링 함수
  const renderTechIcons = (techString: string) => {
    if (!techString) return null;
    const techList = techString
      .split(",")
      .map((tech) => tech.trim().toLocaleLowerCase());

    const resolved = techList
      .map((tech) => techMap.get(tech))
      .filter((item) => item !== undefined);

    return (
      <div className="techIconsWrapper">
        {resolved.map((item) => (
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
    <section className={styles.container}>
      <h1>프로젝트</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article>
            <div className="thumbnailImg">
              {/* 이미지 크기 임시 지정 */}
              <img
                src={project.thumbnail_url}
                alt={project.title}
                width={400}
                height={320}
              />
            </div>
            <div className="cardContent">
              <h3>{project.title}</h3>
              <div className="metaInfo">
                <span>
                  {formatDate(project.start_date)} ~{" "}
                  {formatDate(project.end_date)}
                </span>
                <span>{project.is_team ? "팀 프로젝트" : "개인 프로젝트"}</span>
              </div>
              <p>{project.summary}</p>
              {renderTechIcons(project.tech_stacks)}
            </div>
          </article>
        ))}
      </div>

      <Link to="/projects">→ View All Projects</Link>
    </section>
  );
}

export default TopProjects;
