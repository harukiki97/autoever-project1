import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import type { Project } from "../../types/project";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchTopProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(`*, tech_stacks (*)`)
        .order("start_date", { ascending: false });
      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data as Project[]);
    };

    fetchTopProjects();
  }, []);

  return (
    <section>
      <h1>프로젝트</h1>
      <ProjectGrid projects={projects} variant="list" />
    </section>
  );
}

export default Projects;
