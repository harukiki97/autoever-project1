import React from 'react';

interface AboutMeProps {
  name: string;
  role: string;
  description: string;
  profileImgUrl?: string;
}

export const AboutMe: React.FC<AboutMeProps> = ({ name, role, description, profileImgUrl }) => {
  return (
    <section style={sectionStyle}>
      {/* 프로필 이미지 영역 */}
      <div style={imageContainerStyle}>
        {profileImgUrl ? (
          <img src={profileImgUrl} alt={`${name} 프로필`} style={imageStyle} />
        ) : (
          <div style={placeholderStyle}></div>
        )}
      </div>

      {/* 프로필 정보 영역 */}
      <div style={infoStyle}>
        <h2 style={nameStyle}>{name}</h2>
        <h4 style={roleStyle}>{role}</h4>
        <p style={descriptionStyle}>{description}</p>
      </div>
    </section>
  );
};

// --- 스타일 정의 ---

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px 20px',
  textAlign: 'center',
  backgroundColor: '#fff',
};

const imageContainerStyle: React.CSSProperties = {
  width: '280px',         // 예시 화면의 회색 원 크기
  height: '280px',
  borderRadius: '50%',    // 동그란 원형 만들기
  overflow: 'hidden',     // 원 밖으로 나가는 이미지 커팅
  backgroundColor: '#eee', // 이미지 없을 때 회색 배경
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)', // 약간의 입체감
};

const imageStyle: React.CSSProperties = {
  width: '100%',          // 컨테이너 너비에 맞춤
  height: '100%',         // 컨테이너 높이에 맞춤
  objectFit: 'cover',     // 이미지가 비율대로 꽉 차게 (중요!)
};

const placeholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#ccc',
};

const infoStyle: React.CSSProperties = {
  maxWidth: '600px',
};

const nameStyle: React.CSSProperties = {
  fontSize: '42px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#222',
};

const roleStyle: React.CSSProperties = {
  fontSize: '20px',
  color: '#555',
  marginBottom: '20px',
  fontWeight: '600',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#666',
  whiteSpace: 'pre-wrap', // 줄바꿈 적용
};