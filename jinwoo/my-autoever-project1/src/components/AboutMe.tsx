import React from 'react';

interface AboutMeProps {
  name: string;
  role: string;
  description: string;
  profileImgUrl?: string;
  email?: string; 
  phone?: string;
}

export const AboutMe: React.FC<AboutMeProps> = ({ 
  name, 
  role, 
  description, 
  profileImgUrl, 
  email, 
  phone 
}) => {
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

        {/* 📧 연락처 정보 영역 추가 */}
        <div style={contactAreaStyle}>
          {email && (
            <div style={contactItemStyle}>
              <span style={iconStyle}>📧</span>
              <a href={`mailto:${email}`} style={contactLinkStyle}>{email}</a>
            </div>
          )}
          {phone && (
            <div style={contactItemStyle}>
              <span style={iconStyle}>📞</span>
              <span style={contactTextStyle}>{phone}</span>
            </div>
          )}
        </div>
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
  width: '280px',
  height: '280px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#eee',
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
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
  whiteSpace: 'pre-wrap',
  marginBottom: '25px', // 연락처와 간격을 띄우기 위해 추가
};

// ✨ 새로 추가된 연락처 관련 스타일
const contactAreaStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
};

const contactItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  color: '#444',
};

const iconStyle: React.CSSProperties = {
  fontSize: '18px',
};

const contactTextStyle: React.CSSProperties = {
  fontWeight: '500',
};

const contactLinkStyle: React.CSSProperties = {
  fontWeight: '500',
  color: '#444',
  textDecoration: 'none',
  cursor: 'pointer',
};