import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaReact, FaHtml5, FaFigma, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiSupabase, SiJavascript } from "react-icons/si";
import type { Project as DBProject } from '../../types/database';
// 1. 파일 상단에 아이콘 import 추가
import { SiPython, SiArduino, SiMediapipe } from "react-icons/si";
import { FcBiotech } from "react-icons/fc";

/** * 🎯 아이콘 매핑 타입 정의 
 * React.ReactElement<{ color?: string }>를 사용하여 
 * cloneElement 시 color 속성 주입 에러를 방지합니다.
 */
interface IconData {
  icon: React.ReactElement<{ color?: string }>;
  color: string;
}

const ICON_MAP: Record<string, IconData> = {
  "React": { icon: <FaReact />, color: "#61DAFB" },
  "TypeScript": { icon: <SiTypescript />, color: "#3178C6" },
  "JavaScript": { icon: <SiJavascript />, color: "#F7DF1E" },
  "HTML5": { icon: <FaHtml5 />, color: "#E34F26" },
  "CSS3": { icon: <FaCss3Alt />, color: "#1572B6" },
  "Tailwind": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Figma": { icon: <FaFigma />, color: "#F24E1E" },
  "Supabase": { icon: <SiSupabase />, color: "#3ECF8E" },
  "Node.js": { icon: <FaNodeJs />, color: "#339933" },
  // ... 기존 아이콘들 (React, TS 등)
  "Python": { icon: <SiPython />, color: "#3776AB" },
  "Arduino": { icon: <SiArduino />, color: "#00979D" },
  "MediaPipe": { icon: <SiMediapipe />, color: "#4787F3" },
  "Bio": { icon: <FcBiotech />, color: "" }
};

export const ProjectCard: React.FC<{ project: DBProject }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // 🎯 날짜 포맷팅 (DB: 2026-02-28 -> UI: 2026.02)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return dateStr.substring(0, 7).replace('-', '.');
  };

  return (
    <div 
      style={{
        ...cardStyle, 
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.06)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* 상단 이미지 영역 (DB의 thumnail_url 연결) */}
      <div style={imageWrapperStyle}>
        <img 
          src={project.thumnail_url || '/logo.png'} 
          alt={project.title} 
          style={projectImageStyle} 
          onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }} // 이미지 로드 실패 시 대체
        />
      </div>

      <div style={contentStyle}>
        <h3 style={titleStyle}>{project.title}</h3>
        
        <div style={metaStyle}>
          <span style={periodStyle}>
            {`${formatDate(project.start_date)} ~ ${formatDate(project.end_date) || '진행 중'}`}
          </span>
          <span style={typeStyle}>
            {project.is_team ? "팀 프로젝트" : "개인 프로젝트"}
          </span>
        </div>
        
        <p style={descStyle}>{project.description || "상세 설명이 등록되지 않았습니다."}</p>
        
        {/* 기술 스택 아이콘 렌더링 영역 */}
        <div style={tagBoxStyle}>
          {project.tech_stacks ? (
            project.tech_stacks.split(',').map((tech, i) => {
              const name = tech.trim();
              const data = ICON_MAP[name];
              return (
                <div key={i} style={tagWrapperStyle} title={name}>
                  {data ? (
                    React.cloneElement(data.icon, { color: data.color })
                  ) : (
                    <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold' }}>#{name}</span>
                  )}
                </div>
              );
            })
          ) : (
            <span style={{ fontSize: '12px', color: '#ccc' }}>No Stack Info</span>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 스타일 정의 ---
const cardStyle: React.CSSProperties = { 
  backgroundColor: '#fff', 
  borderRadius: '24px', 
  overflow: 'hidden', 
  display: 'flex', 
  flexDirection: 'column', 
  width: '100%', 
  maxWidth: '380px', 
  margin: '0 auto', 
  textAlign: 'left', 
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
  height: '100%', 
  cursor: 'pointer',
  border: '1px solid #f0f0f0'
};

const imageWrapperStyle: React.CSSProperties = { 
  backgroundColor: '#0A2647', 
  height: '220px', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  padding: '30px' 
};

const projectImageStyle: React.CSSProperties = { 
  maxWidth: '100%', 
  maxHeight: '100%', 
  objectFit: 'contain' 
};

const contentStyle: React.CSSProperties = { 
  padding: '28px', 
  flexGrow: 1, 
  display: 'flex', 
  flexDirection: 'column' 
};

const titleStyle: React.CSSProperties = { 
  fontSize: '22px', 
  fontWeight: '800', 
  marginBottom: '12px', 
  color: '#1a1a1a',
  letterSpacing: '-0.5px'
};

const metaStyle: React.CSSProperties = { 
  display: 'flex', 
  gap: '12px', 
  fontSize: '14px', 
  marginBottom: '20px',
  alignItems: 'center'
};

const periodStyle: React.CSSProperties = { color: '#999', fontWeight: '500' };

const typeStyle: React.CSSProperties = { 
  color: '#4cc38a', 
  fontWeight: '700',
  backgroundColor: '#e6f7ef',
  padding: '2px 8px',
  borderRadius: '6px',
  fontSize: '12px'
};

const descStyle: React.CSSProperties = { 
  color: '#555', 
  fontSize: '15px', 
  lineHeight: '1.6', 
  marginBottom: '24px', 
  flexGrow: 1,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
};

const tagBoxStyle: React.CSSProperties = { 
  display: 'flex', 
  gap: '14px', 
  marginTop: 'auto', 
  alignItems: 'center',
  flexWrap: 'wrap'
};

const tagWrapperStyle: React.CSSProperties = { 
  fontSize: '26px', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  transition: 'transform 0.2s ease'
};