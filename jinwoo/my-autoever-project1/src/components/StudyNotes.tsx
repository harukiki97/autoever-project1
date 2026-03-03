import React from 'react';
import { useNavigate } from 'react-router-dom';

interface StudyNoteProps {
  data?: any;
  style?: React.CSSProperties;
}

export const StudyNotes: React.FC<StudyNoteProps> = ({ data, style }) => {
  const navigate = useNavigate();

  // DB 데이터 매칭 (slug를 이동 경로로 사용)
  const title = data?.title || "Untitled";
  const summary = data?.summary || "등록된 요약 내용이 없습니다.";
  const slug = data?.slug; 

  return (
    <div style={{ ...cardStyle, ...style }}>
      <h3 style={cardTitleStyle}>{title}</h3>
      
      {/* ✅ '한 줄 소개' 자리에 실제 summary 반영 & 디자인 깔끔하게 수정 */}
      <p style={cardDescStyle}>
        {summary.length > 80 ? `${summary.substring(0, 80)}...` : summary}
      </p>
      
      {/* 🔥 클릭 시 id 대신 slug를 사용하여 주소창 변경 */}
      <span 
        onClick={() => slug ? navigate(`/study-notes/${slug}`) : navigate('/study-notes')} 
        style={detailsLinkStyle}
      >
        → details
      </span>
    </div>
  );
};

// --- 스타일 디자인 ---
const cardStyle: React.CSSProperties = {
  width: '400px', backgroundColor: '#fff', padding: '40px', borderRadius: '15px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)', border: '1px solid #f0f0f0', 
  textAlign: 'center', transition: 'transform 0.3s ease'
};
const cardTitleStyle: React.CSSProperties = { fontSize: '24px', fontWeight: '700', marginBottom: '20px', color: '#1a1a1a' };
const cardDescStyle: React.CSSProperties = { fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '25px', minHeight: '48px' };
const detailsLinkStyle: React.CSSProperties = { fontSize: '15px', color: '#3b82f6', cursor: 'pointer', fontWeight: '600', display: 'inline-block' };