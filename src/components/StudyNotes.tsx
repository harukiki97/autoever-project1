import React from 'react';

export const StudyNotes: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Study Note</h2>

      {/* 지그재그 배치를 위한 컨테이너 */}
      <div style={cardWrapperStyle}>
        
        {/* 카드 1: 왼쪽 정렬 + 살짝 위쪽 기울기 */}
        <div style={{ ...cardStyle, alignSelf: 'flex-start', transform: 'rotate(-3deg)' }}>
          <h3 style={cardTitleStyle}>Study Title</h3>
          <h4 style={cardSubTitleStyle}>Study Title 해보기</h4>
          <p style={cardDescStyle}>한 줄 소개 한 줄 소개 한 줄 소개<br/>한 줄 소개 한 줄 소개 한 줄 ...</p>
          <span style={detailsLinkStyle}>→ details</span>
        </div>

        {/* 카드 2: 오른쪽 정렬 + 아래쪽 기울기 + 중간 여백 */}
        <div style={{ ...cardStyle, alignSelf: 'flex-end', transform: 'rotate(2deg)', marginTop: '-20px' }}>
          <h3 style={cardTitleStyle}>Study Title</h3>
          <h4 style={cardSubTitleStyle}>Study Title 해보기</h4>
          <p style={cardDescStyle}>한 줄 소개 한 줄 소개 한 줄 소개<br/>한 줄 소개 한 줄 소개 한 줄 ...</p>
          <span style={detailsLinkStyle}>→ details</span>
        </div>

        {/* 카드 3: 다시 왼쪽 정렬 + 살짝 기울기 */}
        <div style={{ ...cardStyle, alignSelf: 'flex-start', transform: 'rotate(-1deg)', marginTop: '-20px' }}>
          <h3 style={cardTitleStyle}>Study Title</h3>
          <h4 style={cardSubTitleStyle}>Study Title 해보기</h4>
          <p style={cardDescStyle}>한 줄 소개 한 줄 소개 한 줄 소개<br/>한 줄 소개 한 줄 소개 한 줄 ...</p>
          <span style={detailsLinkStyle}>→ details</span>
        </div>
      </div>

      {/* 하단 푸터 (이미지 디자인 반영) */}
      <div style={footerStyle}>
        <div style={footerLineStyle} />
        <div style={socialIconWrapperStyle}>
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="email" style={socialIconStyle} />
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" style={socialIconStyle} />
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedin" style={socialIconStyle} />
        </div>
        <p style={copyrightStyle}>Copyright 2026. [개발자명] all rights reserved.</p>
      </div>
    </div>
  );
};

// --- 스타일 정의 ---
const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px', // 너무 퍼지지 않게 조절
  margin: '0 auto',
  padding: '100px 20px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '64px', // 이미지처럼 크게
  fontWeight: '800',
  textAlign: 'left',
  marginBottom: '80px',
};

const cardWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px', // 카드 사이 간격
  padding: '0 40px',
};

const cardStyle: React.CSSProperties = {
  width: '450px', // 카드의 너비
  backgroundColor: '#fff',
  padding: '50px 40px',
  borderRadius: '15px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', // 부드러운 그림자
  border: '1px solid #f0f0f0',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
};

const cardTitleStyle: React.CSSProperties = { fontSize: '24px', fontWeight: '700', margin: 0 };
const cardSubTitleStyle: React.CSSProperties = { fontSize: '22px', fontWeight: '700', marginBottom: '20px' };
const cardDescStyle: React.CSSProperties = { fontSize: '15px', color: '#888', lineHeight: '1.6', marginBottom: '30px' };
const detailsLinkStyle: React.CSSProperties = { fontSize: '16px', color: '#3b82f6', cursor: 'pointer', fontWeight: '500' };

// 푸터 스타일
const footerStyle: React.CSSProperties = { marginTop: '150px', textAlign: 'center' };
const footerLineStyle: React.CSSProperties = { width: '100%', height: '1px', backgroundColor: '#3b82f6', marginBottom: '50px' };
const socialIconWrapperStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' };
const socialIconStyle: React.CSSProperties = { width: '40px', height: '40px', cursor: 'pointer', opacity: 0.8 };
const copyrightStyle: React.CSSProperties = { fontSize: '14px', color: '#cbd5e0' };