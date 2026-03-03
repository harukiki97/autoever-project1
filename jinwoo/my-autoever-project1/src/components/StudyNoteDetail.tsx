import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../api/supabase'; // 💡 경로 에러 시 ../../api/supabase 로 수정

export const StudyNoteDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 여기서 id는 주소창의 slug 값을 의미함

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteDetail = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // 🔥 id(숫자) 대신 slug(문자) 컬럼으로 데이터를 조회합니다.
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', id) 
          .single();

        if (error) throw error;
        if (data) setNote(data);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNoteDetail();
  }, [id]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (!note) return <div style={{ padding: '100px', textAlign: 'center' }}>글을 찾을 수 없습니다.</div>;

  return (
    <div style={detailLayout}>
      <button onClick={() => navigate('/study-notes')} style={backBtn}>← Back to List</button>
      <div style={contentWrapper}>
        <h1 style={titleStyle}>{note.title}</h1>
        <div style={metaInfoStyle}>
          <span>{new Date(note.created_at).toLocaleDateString()}</span>
          <span>{note.type}</span>
        </div>
        <div style={divider} />
        <div style={bodyTextStyle}>
          {/* 본문 내용 출력 (줄바꿈 유지) */}
          <p style={{ whiteSpace: 'pre-wrap' }}>{note.content || note.summary}</p>
        </div>
      </div>
    </div>
  );
};

// 스타일 디자인
const detailLayout: React.CSSProperties = { maxWidth: '800px', margin: '0 auto', padding: '100px 20px' };
const backBtn: React.CSSProperties = { border: 'none', background: 'none', color: '#aaa', cursor: 'pointer', marginBottom: '30px' };
const contentWrapper: React.CSSProperties = { textAlign: 'left' };
const titleStyle: React.CSSProperties = { fontSize: '40px', fontWeight: '800', marginBottom: '20px' };
const metaInfoStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '10px' };
const divider: React.CSSProperties = { width: '100%', height: '1px', backgroundColor: '#eee', marginBottom: '40px' };
const bodyTextStyle: React.CSSProperties = { fontSize: '17px', lineHeight: '1.8', color: '#333' };