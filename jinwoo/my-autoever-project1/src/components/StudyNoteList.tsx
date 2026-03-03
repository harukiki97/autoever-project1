import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabase'; // 💡 경로 에러 시 ../../api/supabase 로 수정

export const StudyNoteList: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'POST' | 'TIL'>('ALL');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('posts') 
          .select('*')
          .order('created_at', { ascending: false });

        if (filter !== 'ALL') {
          query = query.eq('type', filter);
        }

        const { data, error } = await query;
        if (error) throw error;
        if (data) setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [filter]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Notes...</div>;

  return (
    <div style={listLayout}>
      <button onClick={() => navigate('/')} style={backBtn}>← 메인으로 돌아가기</button>
      
      <h1 style={headerTitle}>Study Note</h1>

      <div style={tabContainer}>
        {['ALL', 'POST', 'TIL'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            style={{
              ...tabItem,
              backgroundColor: filter === tab ? '#ebf2ff' : 'transparent',
              color: filter === tab ? '#3b82f6' : '#999',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={listContainer}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div 
              key={note.id} 
              // 🔥 기존 note.id 대신 note.slug를 사용하여 상세 페이지로 이동!
              onClick={() => navigate(`/study-notes/${note.slug}`)}
              onMouseEnter={() => setHoveredId(note.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ 
                ...noteCard, 
                cursor: 'pointer',
                borderColor: hoveredId === note.id ? '#3b82f6' : '#ebf2ff',
                boxShadow: hoveredId === note.id 
                  ? '0 8px 15px rgba(59, 130, 246, 0.15)' 
                  : '0 4px 6px rgba(0,0,0,0.02)',
                transform: hoveredId === note.id ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              <h3 style={noteTitle}>{note.title}</h3>
              <p style={noteText}>{note.summary || note.content?.substring(0, 150)}...</p>
              <div style={noteMeta}>
                <span>{new Date(note.created_at).toLocaleDateString()}</span>
                <span style={typeBadgeStyle}>{note.type}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#aaa', marginTop: '50px' }}>해당 카테고리에 작성된 글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

// --- 스타일 정의 ---
const listLayout: React.CSSProperties = { maxWidth: '800px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' };
const backBtn: React.CSSProperties = { float: 'left', border: 'none', background: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px' };
const headerTitle: React.CSSProperties = { fontSize: '64px', fontWeight: '800', margin: '40px 0' };
const tabContainer: React.CSSProperties = { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '50px' };
const tabItem: React.CSSProperties = { border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' };
const listContainer: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '25px' };
const noteCard: React.CSSProperties = { textAlign: 'left', padding: '40px', borderRadius: '15px', border: '1px solid #ebf2ff', backgroundColor: '#fff', transition: 'all 0.3s ease' };
const noteTitle: React.CSSProperties = { fontSize: '24px', fontWeight: 'bold', margin: '0 0 15px 0' };
const noteText: React.CSSProperties = { color: '#666', fontSize: '15px', lineHeight: '1.7', marginBottom: '25px' };
const noteMeta: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', color: '#ccc', fontSize: '13px', borderTop: '1px solid #f9f9f9', paddingTop: '15px' };
const typeBadgeStyle: React.CSSProperties = { fontWeight: '800', color: '#ddd', letterSpacing: '1px' };