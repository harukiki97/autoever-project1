import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';

// --- 1. 스타일 정의 (컴포넌트 외부 상단에 선언하여 'Cannot find name' 에러 방지) ---

const detailPageContainer: React.CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
};

const cardFlexWrapper: React.CSSProperties = { 
  display: 'flex', 
  gap: '30px', 
  flexWrap: 'wrap', 
  justifyContent: 'center',
  width: '100%'
};

const mapleCardStyle: React.CSSProperties = {
  position: 'relative', 
  width: '300px', 
  height: '450px', 
  borderRadius: '20px', 
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #2c3e50, #000)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
  border: '1px solid rgba(255,255,255,0.1)'
};

const cardImageArea: React.CSSProperties = { 
  height: '320px',
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  background: 'rgba(255,255,255,0.05)' 
};

const cardInfoArea: React.CSSProperties = { 
  padding: '20px', 
  background: 'rgba(0,0,0,0.8)', 
  color: '#fff', 
  height: '130px',
  boxSizing: 'border-box', 
  textAlign: 'left' 
};

const cardName: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#fff', margin: '0 0 5px 0' };

const infoDetailBox: React.CSSProperties = {
  flex: 1,
  minWidth: '300px',
  backgroundColor: '#1e1e1e',
  borderRadius: '20px',
  padding: '30px',
  color: '#fff',
  textAlign: 'left',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
};

const detailHeader: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '15px' };
const avatarCircle: React.CSSProperties = { width: '30px', height: '30px', backgroundColor: '#ffeb3b', borderRadius: '50%' };
const detailRow: React.CSSProperties = { marginBottom: '20px' };
const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#888', display: 'block', marginBottom: '5px' };
const valueStyle: React.CSSProperties = { fontSize: '16px', color: '#fff', fontWeight: 'bold' };
const commentBox: React.CSSProperties = { backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', fontSize: '14px', marginTop: '10px', lineHeight: '1.6', border: '1px solid #333' };
const buttonGroup: React.CSSProperties = { marginTop: '30px', display: 'flex', gap: '10px' };
const saveBtn: React.CSSProperties = { flex: 1, padding: '12px', backgroundColor: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' };

// --- 2. 컴포넌트 본문 ---

export const GuestbookCardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data: result, error } = await supabase
          .from('guestbook')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setData(result);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>카드를 불러오는 중...</div>;
  if (!data) return <div style={{ padding: '50px', textAlign: 'center' }}>데이터를 찾을 수 없습니다.</div>;

  return (
    <div style={detailPageContainer}>
      <div style={cardFlexWrapper}>
        {/* 왼쪽: 카드 앞면 시각화 */}
        <div style={mapleCardStyle}>
           <div style={cardImageArea}>
              <img src="/logo.png" alt="character" style={{ width: '180px' }} />
           </div>
           <div style={cardInfoArea}>
              <h3 style={cardName}>{data.visitor_name}</h3>
              {/*<p style={{ color: '#ffeb3b', fontSize: '14px', margin: 0 }}>Lv. 99 Adventurer</p>*/}
              {/*// ✅ 수정 후 (가장 안전한 방법)*/}
<p style={{ fontSize: '11px', color: '#888', marginTop: '5px' }}>
  ID: {String(data.id).substring(0, 8)}
</p>
           </div>
        </div>

        {/* 오른쪽: 상세 정보 섹션 */}
        <div style={infoDetailBox}>
          <div style={detailHeader}>
             <div style={avatarCircle}></div>
             <span style={{ fontWeight: 'bold', fontSize: '18px' }}>방명록 상세 정보</span>
          </div>
          
          <div style={detailRow}>
            <span style={labelStyle}>작성자</span>
            <span style={valueStyle}>{data.visitor_name}</span>
          </div>

          <div style={detailRow}>
            <span style={labelStyle}>주요 스택</span>
            <span style={{ ...valueStyle, color: '#3B82F6' }}>{data.main_stack || '없음'}</span>
          </div>

          <div style={detailRow}>
            <span style={labelStyle}>MBTI</span>
            <span style={valueStyle}>{data.mbti || '비밀'}</span>
          </div>

          <div style={detailRow}>
            <span style={labelStyle}>남긴 메시지</span>
            <div style={commentBox}>{data.comment}</div>
          </div>

          <div style={buttonGroup}>
             <button style={saveBtn} onClick={() => alert('이미지 저장 기능 준비 중!')}>카드 저장</button>
             <button style={{ ...saveBtn, backgroundColor: '#444' }} onClick={() => navigate('/#guestbook')}>목록으로</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestbookCardDetail;