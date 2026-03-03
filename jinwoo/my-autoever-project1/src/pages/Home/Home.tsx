import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';
import { Header } from '../../components/Header/Header';
import { AboutMe } from '../../components/AboutMe';
import { TechStack } from '../../components/TechStack';
import { Experience } from '../../components/Experience/Experience';
import { ProjectCard } from '../../components/Projects/ProjectCard';
import { StudyNotes } from '../../components/StudyNotes';
import { Guestbook } from '../Blog/Guestbook';

import type { Project, AdminProfile } from '../../types/database'; 

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [studies, setStudies] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  const refs = {
    about: useRef<HTMLElement>(null),
    tech: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    posts: useRef<HTMLElement>(null),
    guestbook: useRef<HTMLElement>(null)
  };

  const handleScroll = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. 프로필 정보
        const { data: p } = await supabase.from('admin_profiles').select('*').single();
        if (p) setProfile(p);

        // 2. 프로젝트 (순서: 정방향 정렬)
        const { data: proj } = await supabase
          .from('projects')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: true });
        if (proj) setProjects(proj);

        // 3. 스터디 노트 (순서: 정방향 정렬 '첫 번째'가 가장 위로)
        const { data: std } = await supabase
          .from('posts')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: true }); // ✅ ascending: true로 변경
        if (std) setStudies(std);

      } catch (err) {
        console.error("데이터 로딩 중 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', display: 'flex', justifyContent: 'center', 
        alignItems: 'center', fontSize: '18px', color: '#888' 
      }}>
        Loading Content...
      </div>
    );
  }

  return (
    <div className="scroll-container">
      <Header onScroll={handleScroll} refs={refs} />
      
      {/* 👤 1. About Me 섹션 */}
      <section ref={refs.about} id="about" className="section">
        {profile ? (
          <AboutMe 
            name={profile.name} 
            role={profile.role || "Developer"} 
            description={profile.bio} 
            profileImgUrl={profile.profile_img || "/profile.png"}
            email={profile.email}
            phone={profile.phone} 
          />
        ) : (
          <div style={{ padding: '100px', textAlign: 'center' }}>프로필 정보가 없습니다.</div>
        )}
      </section>
      
      <section ref={refs.tech} id="tech" className="section" style={{backgroundColor:'#f9fafb'}}>
        <TechStack />
      </section>
      
      <section ref={refs.experience} id="experience" className="section">
        <Experience />
      </section>
      
      {/* 📂 2. Projects 섹션 */}
      <section ref={refs.projects} id="projects" className="section">
        <h2 style={sectionTitleStyle}>Projects</h2>
        <div style={gridStyle}>
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        <div style={btnContainer}>
          <button onClick={() => navigate('/projects')} style={viewAllBtn}>
            View All Projects →
          </button>
        </div>
      </section>

      {/* 📝 3. Study Notes 섹션 (지그재그 배치 보강) */}
      <section ref={refs.posts} id="study" className="section">
        <h2 style={{ fontSize: '64px', fontWeight: '800', textAlign: 'left', marginBottom: '60px' }}>Study Note</h2>
        <div style={zigzagContainerStyle}>
          {studies.length > 0 ? (
            studies.map((s, idx) => (
              <StudyNotes 
                key={s.id} 
                data={s} 
                style={{ 
                  // 💡 0, 2번은 왼쪽 / 1번은 오른쪽 배치
                  alignSelf: idx % 2 === 0 ? 'flex-start' : 'flex-end', 
                  // 💡 겹치는 지그재그 느낌을 위해 음수 마진 활용
                  marginTop: idx === 0 ? '0' : '-60px', 
                  marginBottom: '40px',
                  // 💡 회전각을 주어 리드미컬하게 표현
                  transform: `rotate(${idx % 2 === 0 ? -1.5 : 1.5}deg)`,
                  zIndex: idx
                }} 
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#aaa' }}>작성된 스터디 노트가 없습니다.</p>
          )}
        </div>
        <div style={btnContainer}>
          <button onClick={() => navigate('/study-notes')} style={viewAllBtn}>
            View All Study Notes →
          </button>
        </div>
      </section>

      {/* 💬 4. Guestbook 섹션 */}
      <section ref={refs.guestbook} id="guestbook" className="section" style={{backgroundColor:'#f8f9fa'}}>
        <Guestbook />
      </section>
    </div>
  );
};

// --- 스타일 정의 ---
const sectionTitleStyle: React.CSSProperties = { 
  fontSize: '48px', fontWeight: '800', marginBottom: '60px' 
};

const gridStyle: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
  gap: '40px', width: '100%', maxWidth: '1200px' 
};

// ✅ 스터디 노트를 위한 새로운 컨테이너 스타일
const zigzagContainerStyle: React.CSSProperties = {
  display: 'flex', 
  flexDirection: 'column', 
  padding: '0 20px',
  width: '100%',
  maxWidth: '900px', // 너무 넓으면 지그재그가 잘 안보이니 폭 제한
  margin: '0 auto'
};

const btnContainer: React.CSSProperties = { 
  display: 'flex', justifyContent: 'center', marginTop: '60px', width: '100%' 
};

const viewAllBtn: React.CSSProperties = { 
  padding: '14px 40px', fontSize: '16px', fontWeight: '700', color: '#555',
  border: '1px solid #ddd', borderRadius: '50px', backgroundColor: '#fff', 
  cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
};