import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { ProjectList } from './components/Projects/ProjectList'; 
import { ProjectDetail } from './components/Projects/ProjectDetail'; 
import { Guestbook } from './pages/Blog/Guestbook';
import { StudyNoteList } from './components/StudyNoteList';
import { StudyNoteDetail } from './components/StudyNoteDetail';
import { GuestbookCardDetail } from './pages/Blog/GuestbookCardDetail';
import './App.css';

/**
 * 🎯 정밀 스크롤 제어 컴포넌트
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1. 브라우저의 자동 스크롤 복원 기능 끄기 (새로고침 버그 방지)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. 해시(#)가 없으면 최상단으로
    if (!hash) {
      window.scrollTo(0, 0);
    } 
    // 3. 해시가 있으면 해당 섹션이 렌더링될 때까지 감시 (최대 1.5초)
    else {
      const targetId = hash.replace('#', '');
      let attempts = 0;

      const scrollInterval = setInterval(() => {
        const element = document.getElementById(targetId);
        attempts++;

        if (element) {
          const headerOffset = 90; // 헤더 높이 여백
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          clearInterval(scrollInterval);
        }

        if (attempts >= 15) clearInterval(scrollInterval);
      }, 100);

      return () => clearInterval(scrollInterval);
    }
  }, [pathname, hash]);

  return null;
};

const PageLayout: React.FC<{ children: React.ReactNode; wide?: boolean }> = ({ children, wide }) => {
  const navigate = useNavigate();
  return (
    <div style={pageContainerStyle}>
      <div style={{ ...contentWrapperStyle, maxWidth: wide ? '1000px' : '800px' }}>
        <button onClick={() => navigate(-1)} style={backButtonStyle}>
          ← 이전으로 돌아가기
        </button>
        <div style={cardStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/project/:id" element={<PageLayout wide><ProjectDetail /></PageLayout>} />
          <Route path="/projects/:id" element={<PageLayout wide><ProjectDetail /></PageLayout>} />
          <Route path="/study-notes" element={<StudyNoteList />} />
          <Route path="/study-notes/:id" element={<StudyNoteDetail />} />
          <Route path="/guestbook/:id" element={<PageLayout><GuestbookCardDetail /></PageLayout>} />
          <Route path="/guestbook" element={<PageLayout><Guestbook /></PageLayout>} />
        </Routes>
      </main>
    </Router>
  );
}

// 스타일 변수
const pageContainerStyle: React.CSSProperties = { minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '60px 20px', boxSizing: 'border-box' };
const contentWrapperStyle: React.CSSProperties = { maxWidth: '800px', margin: '0 auto', textAlign: 'left' };
const backButtonStyle: React.CSSProperties = { marginBottom: '30px', padding: '10px 20px', fontSize: '15px', backgroundColor: '#fff', border: '1px solid #e1e4e8', borderRadius: '8px', cursor: 'pointer', color: '#555', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
const cardStyle: React.CSSProperties = { backgroundColor: '#ffffff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #eee' };

export default App;