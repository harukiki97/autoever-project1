import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { ProjectCard } from '../../components/Projects/ProjectCard';
import type { Project } from '../../types/database';

export const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      const { data } = await supabase.from('projects').select('*').order('start_date', { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    };
    fetchAllProjects();
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
      <button onClick={() => navigate('/')} style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#888', marginBottom: '20px' }}>← Back to Home</button>
      <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '40px' }}>All Projects</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};