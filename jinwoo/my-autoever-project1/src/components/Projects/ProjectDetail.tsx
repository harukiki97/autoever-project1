import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { FaReact, FaHtml5, FaCss3Alt, FaFigma, FaNodeJs, FaFileAlt } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiSupabase, SiJavascript } from "react-icons/si";
import { SiPython, SiArduino, SiMediapipe } from "react-icons/si";
import { FcBiotech } from "react-icons/fc";

// 🎯 database.ts에서 수정한 정식 Project 타입을 가져옵니다.
import type { Project } from '../../types/database'; 

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
  "Python": { icon: <SiPython />, color: "#3776AB" },
  "Arduino": { icon: <SiArduino />, color: "#00979D" },
  "MediaPipe": { icon: <SiMediapipe />, color: "#4787F3" },
  "Bio": { icon: <FcBiotech />, color: "" }
};

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 🎯 ProjectExtended 대신 정식 Project 타입을 사용합니다.
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (data) {
          // 🔍 고양이 문제를 잡기 위한 로그 (브라우저 콘솔 F12에서 확인하세요)
          console.log("불러온 이미지 URL:", data.thumnail_url);
          setProject(data);
        }
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>데이터를 불러오고 있습니다...</div>;

  if (!project) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <p>프로젝트를 찾을 수 없습니다.</p>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  return (
    <div style={detailContainerStyle}>
      <button onClick={() => navigate(-1)} style={backButtonStyle}>← 뒤로가기</button>
      
      <h1 style={detailTitleStyle}>{project.title}</h1>
      
      <div style={mainImageWrapperStyle}>
        {/* 🖼️ 이미지 출력: thumnail_url이 올바른 주소면 사진이 나오고, 아니면 고양이가 나옵니다. */}
        <img 
          src={project.thumnail_url || '/logo.png'} 
          alt={project.title} 
          style={mainImageStyle} 
          onError={(e) => { 
            console.warn("이미지 경로가 잘못되어 기본 로고를 표시합니다.");
            (e.target as HTMLImageElement).src = '/logo.png'; 
          }}
        />
      </div>

      <section style={infoSectionStyle}>
        <h3 style={subLabelStyle}>기술 스택</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
          {project.tech_stacks?.split(',').map((tech) => {
            const name = tech.trim();
            const data = ICON_MAP[name];
            return (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '36px', display: 'flex', alignItems: 'center' }}>
                  {data ? React.cloneElement(data.icon, { color: data.color }) : (
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ccc' }}>#</span>
                  )}
                </div>
                <span style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>{name}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div style={metaGridStyle}>
        <div>
          <h3 style={subLabelStyle}>기간</h3>
          <p style={metaValueStyle}>{`${project.start_date} ~ ${project.end_date || '진행 중'}`}</p>
        </div>
        <div>
          <h3 style={subLabelStyle}>프로젝트 형태</h3>
          <p style={metaValueStyle}>{project.is_team ? "팀 프로젝트" : "개인 프로젝트"}</p>
        </div>
      </div>

      <hr style={{ border: '0.5px solid #eee', margin: '40px 0' }} />

      {project.github_url && (
        <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
          🔗 프로젝트 결과물 (Github / Demo) 바로가기
        </a>
      )}

      {/* 📝 상세 내용 섹션 (content 우선, 없으면 description 출력) */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a1a1a' }}>상세 내용</h2>
        <div style={longDescStyle}>
          {(project.content || project.description) ? (
            (project.content || project.description)?.split('\n').map((line, index) => (
              <span key={index}>{line}<br /></span>
            ))
          ) : "등록된 상세 내용이 없습니다."}
        </div>
      </section>

      {/* 📎 첨부 파일 섹션 (file_url이 있을 때만 표시) */}
      {project.file_url && (
        <section style={{ marginTop: '40px' }}>
          <h3 style={subLabelStyle}>첨부 파일</h3>
          <div style={fileBoxStyle}>
            <FaFileAlt style={{ fontSize: '24px', color: '#3b82f6' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <a 
                href={project.file_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={fileLinkStyle}
              >
                {project.file_name || '프로젝트 관련 파일 다운로드'}
              </a>
              <span style={{ fontSize: '12px', color: '#999' }}>클릭 시 새 창에서 파일이 열립니다.</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// --- 스타일 정의 (기존과 동일) ---
const detailContainerStyle: React.CSSProperties = { maxWidth: '900px', margin: '0 auto', padding: '60px 20px', textAlign: 'left', lineHeight: '1.6' };
const backButtonStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#999', cursor: 'pointer', marginBottom: '20px', fontSize: '16px' };
const detailTitleStyle: React.CSSProperties = { fontSize: '42px', fontWeight: '800', marginBottom: '40px', color: '#1a1a1a', letterSpacing: '-1px' };
const mainImageWrapperStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0A2647', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', marginBottom: '40px', boxSizing: 'border-box' };
const mainImageStyle: React.CSSProperties = { maxWidth: '100%', maxHeight: '450px', objectFit: 'contain' };
const infoSectionStyle: React.CSSProperties = { marginBottom: '40px', backgroundColor: '#f8f9fa', padding: '30px', borderRadius: '20px' };
const subLabelStyle: React.CSSProperties = { fontSize: '13px', color: '#aaa', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' };
const metaGridStyle: React.CSSProperties = { display: 'flex', gap: '80px', marginTop: '30px', padding: '0 10px' };
const metaValueStyle: React.CSSProperties = { fontSize: '18px', color: '#333', fontWeight: '600' };
const linkStyle: React.CSSProperties = { display: 'inline-block', color: '#3b82f6', fontWeight: 'bold', textDecoration: 'none', fontSize: '17px', padding: '10px 20px', backgroundColor: '#eff6ff', borderRadius: '10px' };
const longDescStyle: React.CSSProperties = { color: '#444', fontSize: '17px', whiteSpace: 'pre-wrap', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid #eee' };
const fileBoxStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '10px' };
const fileLinkStyle: React.CSSProperties = { color: '#2563eb', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' };