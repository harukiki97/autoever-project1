import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import type { Project as DBProject } from '../../types/database';

interface ProjectsProps {
  projects: DBProject[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <section style={sectionStyle}>
      <h1 style={titleStyle}>Projects</h1>
      <div style={gridStyle}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <button onClick={() => navigate('/projects')} style={viewAllBtnStyle}>
        → View All Projects
      </button>
    </section>
  );
};

const sectionStyle: React.CSSProperties = { padding: '80px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' };
const titleStyle: React.CSSProperties = { fontSize: '48px', fontWeight: 'bold', marginBottom: '60px' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' };
const viewAllBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };