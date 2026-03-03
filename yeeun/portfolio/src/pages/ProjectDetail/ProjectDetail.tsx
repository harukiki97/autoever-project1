import styles from "./ProjectDetail.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../../types";
import { supabase } from "../../api/supabase";
import { techMap } from "../../utils/getIcon";
import type { TechDetail } from "../../components/Projects/ProjectsContent";
import MarkdownViewer from "../../components/MarkDownViewer/MarkDownViewer";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      setLoading(true);

      // "slug"에 맞춰서 데이터 가져오기
      // project_stacks 조인해서 가져오기 (프로젝트에서 사용되는 기술 스택을 가져오기 위해)
      // project_details 조인해서 가져오기 (slug에서 담고 있는 content를 얻기 위해)
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
            *,
            project_stacks (
              tech_stacks (
                id,
                name
              )
            ),
            project_details (
              content
            )
          `,
        )
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setProject(null);
      } else {
        setProject(data);
      }

      setLoading(false);
    };

    fetchProjects();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  // 프로젝트 없을 때 띄워주기
  if (!project) return <div>Project not found</div>;

  // 프로젝트 기술 스택을 하나의 배열로 묶는 코드.
  const techNames =
    project.project_stacks?.map((ps: any) => ps.tech_stacks.name) ?? [];

  const techDetails = techNames
    .map((name) => techMap.get(name.toLowerCase()))
    .filter((tech): tech is TechDetail => tech !== undefined);

  // 마크다운 내용
  const markdownContent = project.project_details?.[0]?.content ?? "";

  return (
    <div className={styles.projectDetail}>
      <h2 className={styles.title}>{project?.title}</h2>
      <div className={styles.infoContainer}>
        <div className={styles.infoComp}>
          <p className={styles.infoTitle}>프로젝트 설명</p>
          <p className={styles.infoContent}>{project?.summary}</p>
        </div>
        <div className={styles.infoComp}>
          <p className={styles.infoTitle}>기술 스택</p>
          <div className={styles.techIcons}>
            {techDetails.map((tech) => (
              <img
                key={tech.id}
                src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                alt={tech.name}
                title={tech.name}
              />
            ))}
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.infoComp}>
            <p className={styles.infoTitle}>기간</p>
            <p className={styles.infoContent}>
              {project?.start_date} - {project?.end_date ?? "진행 중"}
            </p>
          </div>
          <div className={styles.infoComp}>
            <p className={styles.infoTitle}>프로젝트 형태</p>
            <p className={styles.infoContent}>
              {project.is_team ? "팀 프로젝트" : "개인 프로젝트"}
            </p>
          </div>
        </div>
      </div>
      <MarkdownViewer content={markdownContent} />

      <footer className={styles.footer}>
        <button onClick={() => navigate("/projects")} className={`backBtn`}>
          목록으로 돌아가기
        </button>
      </footer>
    </div>
  );
};

export default ProjectDetail;
