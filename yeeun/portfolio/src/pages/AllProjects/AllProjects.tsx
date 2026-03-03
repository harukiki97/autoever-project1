import styles from "./AllProjects.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import ProjectsContent, {
  type TechDetail,
} from "../../components/Projects/ProjectsContent";
import type { Project } from "../../types";
import { techMap } from "../../utils/getIcon";

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      // 프로젝트 기술 스택 조인해서 가져오기
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
            )
          `,
        )
        .order("start_date", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }
  return (
    <div className={styles.allProjects}>
      <h1 className="section-title">프로젝트</h1>
      <div className={styles.projectList}>
        {projects.map((project) => {
          // project에서 받아온 데이터 중 tech_stacks를 문자열 배열로 변환
          const techNames =
            project.project_stacks?.map((ps: any) => ps.tech_stacks.name) ?? [];

          // tecjNames와 일치하는 아이콘 정보를 techMap에서 찾기
          const techDetails = techNames
            .map((name) => techMap.get(name.toLowerCase()))
            .filter((tech): tech is TechDetail => tech !== undefined);

          return (
            <ProjectsContent
              key={project.id}
              project={project}
              techDetails={techDetails}
              variant="all"
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProjects;
