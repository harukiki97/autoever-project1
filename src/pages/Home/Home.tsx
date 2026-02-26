import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import type { AdminProfile, Project } from '../../types/database'; // Post 타입은 StudyNotes 내부에서 사용한다면 생략 가능
import { AboutMe } from '../../components/AboutMe';
import { ProjectCard } from '../../components/Projects/ProjectCard';
import { TechStack } from '../../components/TechStack';
import { Header } from '../../components/Header/Header';
import { StudyNotes } from '../../components/StudyNotes';

// 경력 사항 컴포넌트
const ExperienceSection: React.FC = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' }}>경력 사항</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <h3 style={categoryTitleStyle}>교육</h3>
            <div style={itemWrapperStyle}>
              <span style={dateStyle}>1990-1992</span>
              <div>
                <strong style={nameStyle}>한국대학교</strong>
                <p style={subTextStyle}>ABCD 전공, EFGHJK 복수전공</p>
                <ul style={listStyle}>
                  <li>이러이러한 것들을 배우고 이러이러한 것을 학습!</li>
                  <li>어쩌구저쩌고 학습</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 style={categoryTitleStyle}>어학 및 자격증</h3>
            <div style={itemWrapperStyle}>
              <span style={dateStyle}>2024.03.19</span>
              <div>
                <strong style={nameStyle}>OPIc</strong>
                <p style={subTextStyle}>Intermediate HIGH</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <h3 style={categoryTitleStyle}>활동</h3>
            <div style={itemWrapperStyle}>
              <span style={{ ...dateStyle, color: '#3b82f6', fontWeight: 'bold' }}>2025 - 현재</span>
              <div>
                <strong style={nameStyle}>현대오토에버 모빌리티 SW 스쿨</strong>
                <p style={subTextStyle}>웹/앱 개발 과정</p>
                <p style={descTextStyle}>이렇고 저렇고 이런 저런 내용을 배움</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  // Ref 명칭을 posts로 통일 (Header의 요구사항과 일치)
  const aboutRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLElement>(null); // studyNoteRef -> postsRef
  const guestbookRef = useRef<HTMLElement>(null);

  const allRefs = {
    about: aboutRef,
    tech: techRef,
    experience: expRef,
    projects: projectsRef,
    posts: postsRef, // Header가 기대하는 key 값인 'posts'로 전달
    guestbook: guestbookRef
  };

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const [profRes, projRes] = await Promise.all([
        supabase.from('admin_profiles').select('*').single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false })
      ]);
      if (profRes.data) setProfile(profRes.data);
      if (projRes.data) setProjects(projRes.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header onScroll={scrollToSection} refs={allRefs} />
      
      <div className="scroll-container">
        {/* 1. About Me */}
        <section ref={aboutRef} className="section">
          {profile && (
            <AboutMe 
              name={profile.name}
              role={profile.bio} 
              profileImgUrl={profile.profile_img}
              description={`${profile.email} | ${profile.phone}`}
            />
          )}
        </section>

        {/* 2. Tech Stack */}
        <section ref={techRef} className="section">
          <div style={{ width: '100%', maxWidth: '1024px' }}>
            <TechStack />
          </div>
        </section>

        {/* 3. Experience */}
        <section ref={expRef} className="section">
          <ExperienceSection />
        </section>

        {/* 4. Projects */}
        <section ref={projectsRef} className="section">
          <div style={{ width: '100%', maxWidth: '1024px', padding: '0 20px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '40px', textAlign: 'center' }}>My Projects</h2>
            <div className="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Study Notes (지그재그 배치를 위해 스타일 보정) */}
<section 
  ref={postsRef} 
  className="section" 
  style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'stretch', // 중앙 정렬 해제: 자식(StudyNotes)이 전체 너비를 갖게 함
    width: '100%',
    height: 'auto',        // 내용이 길어질 수 있으므로 auto 설정
    padding: '100px 0'     // 상하 여백 확보
}}
>
  <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
    <StudyNotes />
  </div>
</section>

        {/* 6. Guestbook (방명록 이동 버튼) */}
        <section ref={guestbookRef} className="section">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>방명록</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>따뜻한 한마디를 남겨주세요!</p>
            <button 
              onClick={() => navigate('/guestbook')}
              style={guestbookButtonStyle}
            >
              방명록 작성하러 가기
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

// 스타일 가이드
const categoryTitleStyle: React.CSSProperties = { color: '#3b82f6', fontSize: '14px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' };
const itemWrapperStyle: React.CSSProperties = { display: 'flex', gap: '20px', marginBottom: '25px', textAlign: 'left' };
const dateStyle: React.CSSProperties = { minWidth: '100px', fontSize: '14px', color: '#999' };
const nameStyle: React.CSSProperties = { fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '5px' };
const subTextStyle: React.CSSProperties = { fontSize: '14px', color: '#666', margin: '0 0 5px 0' };
const descTextStyle: React.CSSProperties = { fontSize: '14px', color: '#888', margin: 0 };
const listStyle: React.CSSProperties = { fontSize: '14px', color: '#666', paddingLeft: '20px', marginTop: '5px' };

const guestbookButtonStyle: React.CSSProperties = {
  padding: '16px 40px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: '#3b82f6',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
};
