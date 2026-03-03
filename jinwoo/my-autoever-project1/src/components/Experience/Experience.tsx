import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase';

export const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setExperiences(data || []);
      } catch (err) {
        console.error("경력 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  // 🔥 핵심: DB에 존재하는 카테고리 명단만 중복 없이 추출
  // 예: DB에 '교육'만 있으면 ['교육']만 생성됨
  // const activeCategories = Array.from(new Set(experiences.map(exp => exp.category)));
  // ✅ 해결 방식: 내가 원하는 순서를 미리 정해두고, 데이터가 있는 것만 필터링
const fixedOrder = ['교육', '어학 및 자격증', '활동'];
const activeCategories = fixedOrder.filter(cat => 
  experiences.some(exp => exp.category === cat)
);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>경력 사항</h2>
      
      <div style={gridStyle}>
        {/* 존재하는 카테고리만 순회하며 렌더링 */}
        {activeCategories.map((cat) => (
          <div key={cat} style={categoryWrapper}>
            <h3 style={categoryTitle}>{cat}</h3>
            {experiences
              .filter((exp) => exp.category === cat)
              .map((exp) => (
                <div key={exp.id} style={itemStyle}>
                  <span style={exp.is_active ? activeDateStyle : dateStyle}>
                    {exp.date_range}
                  </span>
                  <div style={contentWrapper}>
                    <strong style={nameStyle}>{exp.title}</strong>
                    {exp.sub_title && <p style={subStyle}>{exp.sub_title}</p>}
                    {exp.description && (
                      <div style={listContainerStyle}>
                        {exp.description.replace(/\\n/g, '\n').split('\n').map((line: string, i: number) => (
                          <div key={i} style={listItemStyle}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 스타일 정의는 기존과 동일 (생략) ---

const containerStyle: React.CSSProperties = { 
  width: '100%', maxWidth: '1100px', margin: '0 auto', 
  display: 'flex', flexDirection: 'column', alignItems: 'center'
};

const titleStyle: React.CSSProperties = { 
  fontSize: '36px', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' 
};

const gridStyle: React.CSSProperties = { 
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
  gap: '40px', width: '100%' 
};

const categoryWrapper: React.CSSProperties = { 
  borderTop: '2px solid #3b82f6', paddingTop: '20px', width: '100%' 
};

const categoryTitle: React.CSSProperties = { 
  color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', 
  marginBottom: '25px', textAlign: 'left', width: '100%'
};

const itemStyle: React.CSSProperties = { 
  display: 'flex', gap: '30px', marginBottom: '20px', 
  alignItems: 'flex-start', width: '100%'
};

const dateStyle: React.CSSProperties = { 
  width: '100px', minWidth: '100px', fontSize: '14px', 
  color: '#aaa', textAlign: 'right', paddingTop: '4px' 
};

const activeDateStyle: React.CSSProperties = { 
  ...dateStyle, color: '#3b82f6', fontWeight: 'bold' 
};

const contentWrapper: React.CSSProperties = { 
  flex: 1, display: 'flex', flexDirection: 'column', 
  alignItems: 'flex-start', alignSelf: 'stretch', textAlign: 'left'
};

const nameStyle: React.CSSProperties = { 
  fontSize: '18px', fontWeight: 'bold', color: '#333', margin: '0 0 5px 0'
};

const subStyle: React.CSSProperties = { 
  fontSize: '14px', color: '#555', margin: '0 0 5px 0'
};

const listContainerStyle: React.CSSProperties = {
  marginTop: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
};

const listItemStyle: React.CSSProperties = {
  fontSize: '13px', color: '#666', lineHeight: '1.6'
};