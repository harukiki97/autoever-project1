import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Guestbook } from './pages/Blog/Guestbook';
import './App.css';

// 방명록 전용 레이아웃 컴포넌트
const GuestbookPage = () => {
  const navigate = useNavigate();

  return (
    <div style={pageContainerStyle}>
      <div style={contentWrapperStyle}>
        <button 
          onClick={() => navigate('/')} 
          style={backButtonStyle}
        >
          ← 메인으로 돌아가기
        </button>
        
        <div style={cardStyle}>
          <Guestbook />
        </div>
      </div>
    </div>
  );
};

function App() {
  // 환경변수 연결 확인
  console.log("주소 연결 확인:", import.meta.env.VITE_SUPABASE_URL);

  return (
    <BrowserRouter>
      <main>
        <Routes>
          {/* 1. 메인 포트폴리오 (자석 스크롤 섹션들이 포함된 페이지) */}
          <Route path="/" element={<Home />} />

          {/* 2. 독립된 방명록 페이지 (버튼 클릭 시 이동) */}
          <Route path="/guestbook" element={<GuestbookPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

// --- 스타일 정의 ---

const pageContainerStyle: React.CSSProperties = {
  minHeight: '100vh',
  backgroundColor: '#f8f9fa', // 가독성을 위해 연한 회색 배경
  padding: '60px 20px',
  boxSizing: 'border-box'
};

const contentWrapperStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'left'
};

const backButtonStyle: React.CSSProperties = {
  marginBottom: '30px',
  padding: '10px 20px',
  fontSize: '15px',
  backgroundColor: '#fff',
  border: '1px solid #e1e4e8',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#555',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'all 0.2s ease'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  border: '1px solid #eee'
};

export default App;