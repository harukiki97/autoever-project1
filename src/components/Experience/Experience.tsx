// src/components/Experience/Experience.tsx
import React from 'react';

export const Experience: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>경력 사항</h2>
      
      <div style={gridStyle}>
        {/* 왼쪽 컬럼: 교육 및 자격증 */}
        <div style={columnStyle}>
          <div style={categoryWrapper}>
            <h3 style={categoryTitle}>교육</h3>
            <div style={itemStyle}>
              <span style={dateStyle}>1990-1992</span>
              <div>
                <strong style={nameStyle}>한국대학교</strong>
                <p style={subStyle}>ABCD 전공, EFGHJK 복수전공</p>
                <ul style={listStyle}>
                  <li>이러이러한 것들을 배우고 이러이러한 것을 학습!</li>
                  <li>어쩌구저쩌고 학습</li>
                </ul>
              </div>
            </div>
            <div style={itemStyle}>
              <span style={dateStyle}>2002-2022</span>
              <strong style={nameStyle}>현토에버고등학교</strong>
            </div>
          </div>

          <div style={categoryWrapper}>
            <h3 style={categoryTitle}>어학 및 자격증</h3>
            <div style={itemStyle}>
              <span style={dateStyle}>2024.03.19</span>
              <div>
                <strong style={nameStyle}>OPIc</strong>
                <p style={subStyle}>Intermediate HIGH</p>
              </div>
            </div>
            <div style={itemStyle}>
              <span style={dateStyle}>2024.03.19</span>
              <div>
                <strong style={nameStyle}>TOEIC</strong>
                <p style={subStyle}>990 점</p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 컬럼: 활동 */}
        <div style={columnStyle}>
          <div style={categoryWrapper}>
            <h3 style={categoryTitle}>활동</h3>
            <div style={itemStyle}>
              <span style={activeDateStyle}>2025 - 현재</span>
              <div>
                <strong style={nameStyle}>현대오토에버 모빌리티 SW 스쿨</strong>
                <p style={subStyle}>웹/앱 개발 과정</p>
                <p style={descStyle}>이렇고 저렇고 이런 저런 내용을 배움</p>
              </div>
            </div>
            <div style={itemStyle}>
              <span style={dateStyle}>2024 - 2025</span>
              <div>
                <strong style={nameStyle}>현대오토에버</strong>
                <p style={subStyle}>ABCD팀, Frontend-Engineer</p>
                <p style={descStyle}>이렇고 저렇고 이렇고 저런 업무를 담당</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const containerStyle: React.CSSProperties = { width: '100%', maxWidth: '1100px', margin: '0 auto' };
const titleStyle: React.CSSProperties = { fontSize: '36px', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' };
const columnStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '40px' };
const categoryWrapper: React.CSSProperties = { borderTop: '1px solid #eee', paddingTop: '20px' };
const categoryTitle: React.CSSProperties = { color: '#3b82f6', fontSize: '14px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' };
const itemStyle: React.CSSProperties = { display: 'flex', gap: '20px', marginBottom: '25px', textAlign: 'left' };
const dateStyle: React.CSSProperties = { minWidth: '100px', fontSize: '14px', color: '#999' };
const activeDateStyle: React.CSSProperties = { ...dateStyle, color: '#3b82f6', fontWeight: 'bold' };
const nameStyle: React.CSSProperties = { fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '5px' };
const subStyle: React.CSSProperties = { fontSize: '14px', color: '#666', margin: '0 0 5px 0' };
const descStyle: React.CSSProperties = { fontSize: '14px', color: '#888', margin: 0 };
const listStyle: React.CSSProperties = { fontSize: '14px', color: '#666', paddingLeft: '20px', marginTop: '5px' };