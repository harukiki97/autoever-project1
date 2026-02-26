import React from 'react';

interface HeaderProps {
  onScroll: (ref: React.RefObject<HTMLElement | null>) => void;
  refs: {
    about: React.RefObject<HTMLElement | null>;
    tech: React.RefObject<HTMLElement | null>;
    experience: React.RefObject<HTMLElement | null>; // 추가됨
    projects: React.RefObject<HTMLElement | null>;
    posts: React.RefObject<HTMLElement | null>;     // posts 이름 유지
    guestbook: React.RefObject<HTMLElement | null>;
  };
}

export const Header: React.FC<HeaderProps> = ({ onScroll, refs }) => {
  return (
    <header style={headerStyle}>
      <div style={navContainerStyle}>
        
        {/* 로고 영역: 이미지와 텍스트를 감싸는 wrapper */}
        <div style={logoWrapperStyle} onClick={() => onScroll(refs.about)}>
          <img 
            src="logo.png" // public 폴더에 있는 이미지 파일명을 적어주세요
            alt="Logo" 
            style={logoImageStyle} 
          />
          <span style={logoTextStyle}>My Portfolio</span>
        </div>

        <nav style={navItemsStyle}>
          <button onClick={() => onScroll(refs.about)} style={btnStyle}>About</button>
          <button onClick={() => onScroll(refs.tech)} style={btnStyle}>Tech</button>
          <button onClick={() => onScroll(refs.experience)} style={btnStyle}>Experience</button>
          <button onClick={() => onScroll(refs.projects)} style={btnStyle}>Projects</button>
          <button onClick={() => onScroll(refs.posts)} style={btnStyle}>Blog</button>
          <button onClick={() => onScroll(refs.guestbook)} style={btnStyle}>Guestbook</button>
        </nav>
      </div>
    </header>
  );
};

// --- 스타일 정의 ---

const headerStyle: React.CSSProperties = {
  position: 'fixed', // 스크롤 시 상단 고정을 위해 fixed 권장
  width: '100%',
  top: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid #eee',
  zIndex: 1000,
  padding: '12px 0'
};

const navContainerStyle: React.CSSProperties = {
  maxWidth: '1024px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px'
};

// 로고 이미지 + 텍스트 정렬을 위한 스타일
const logoWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer'
};

const logoImageStyle: React.CSSProperties = {
  width: '32px', // 로고 이미지 크기
  height: '32px',
  objectFit: 'contain',
  borderRadius: '4px'
};

const logoTextStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333'
};

const navItemsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px'
};

const btnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontSize: '15px',
  cursor: 'pointer',
  fontWeight: '500',
  color: '#333'
};