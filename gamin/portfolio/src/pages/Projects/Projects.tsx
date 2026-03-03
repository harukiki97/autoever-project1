import { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import type { Project } from "../../types/project";
import ProjectGrid from "../../components/ProjectGrid/ProjectGrid";
import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
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

    fetchProjects();
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>프로젝트</h1>
      <ProjectGrid projects={projects} variant="list" />
    </section>
  );
}

export default Projects;
