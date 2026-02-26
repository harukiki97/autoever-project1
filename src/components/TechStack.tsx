import React from 'react';

// 기술별 고유 컬러 코드를 포함한 데이터
const stackData = [
  {
    category: "Language",
    items: [
      { name: "TypeScript", icon: "typescript", color: "3178C6" },
      { name: "JavaScript", icon: "javascript", color: "F7DF1E" },
      { name: "Kotlin", icon: "kotlin", color: "7F52FF" },
      { name: "Python", icon: "python", color: "3776AB" },
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react", color: "61DAFB" },
      { name: "Next.js", icon: "nextdotjs", color: "000000" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "06B6D4" },
      { name: "Redux", icon: "redux", color: "764ABC" },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs", color: "339933" },
      { name: "Supabase", icon: "supabase", color: "3ECF8E" },
      { name: "PostgreSQL", icon: "postgresql", color: "4169E1" },
    ]
  }
];

export const TechStack: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h2 style={mainTitleStyle}>기술 스택</h2>
      
      {stackData.map((group, idx) => (
        <div key={idx} style={groupWrapperStyle}>
          <div style={categoryHeaderStyle}>
            <h3 style={categoryTitleStyle}>{group.category}</h3>
            <div style={lineStyle} />
          </div>

          <div style={gridStyle}>
            {group.items.map((item, itemIdx) => (
              <div key={itemIdx} style={itemBoxStyle}>
                <div style={iconWrapperStyle}>
                  {/* 핵심: ?color= 파라미터를 추가하여 색상을 적용합니다 */}
                  <img 
                    src={`https://cdn.simpleicons.org/${item.icon}/${item.color}`} 
                    alt={item.name} 
                    style={iconStyle} 
                  />
                </div>
                <span style={itemNameStyle}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- 스타일 정의 (이미지와 동일하게 정밀 조정) ---
const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '60px 20px',
  textAlign: 'left',
};

const mainTitleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 'bold',
  marginBottom: '50px',
};

const groupWrapperStyle: React.CSSProperties = {
  marginBottom: '60px',
};

const categoryHeaderStyle: React.CSSProperties = {
  marginBottom: '40px',
};

const categoryTitleStyle: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: '600',
  marginBottom: '15px',
  color: '#333',
};

const lineStyle: React.CSSProperties = {
  width: '100%',
  height: '1px',
  backgroundColor: '#DDE4F0', // 이미지 특유의 연한 푸른빛 회색선
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '50px',
};

const itemBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90px',
};

const iconWrapperStyle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '15px',
};

const iconStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#555',
  fontWeight: '500',
};