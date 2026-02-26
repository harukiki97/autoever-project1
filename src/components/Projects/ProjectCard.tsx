// src/components/ProjectCard.tsx
import React from 'react';
import type { Project } from '../../types/database';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // tech_stacks 문자열을 배열로 변환
  const tags = project.tech_stacks.split(',').map(tag => tag.trim());

  return (
    <div className="card" style={cardStyle}>
      <img src={project.thumbnail_url} alt={project.title} style={imageStyle} />
      <div style={{ padding: '15px' }}>
        <h3>{project.title}</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {project.start_date} ~ {project.end_date}
        </p>
        <div className="tags" style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
          {tags.map(tag => (
            <span key={tag} style={tagStyle}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 스타일 가이드 (CSS 변수 활용 권장)
const cardStyle: React.CSSProperties = {
  border: '1px solid #eee',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'transform 0.2s'
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  objectFit: 'cover'
};

const tagStyle: React.CSSProperties = {
  background: '#f0f0f0',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px'
};