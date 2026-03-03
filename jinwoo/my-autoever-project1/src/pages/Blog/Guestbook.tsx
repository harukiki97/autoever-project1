import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabase';

// 1. 개별 카드 컴포넌트
const GuestbookCard = ({ msg }: { msg: any }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  });
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({
    opacity: 0,
    backgroundPosition: '0% 0%',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'none',
    });
    setOverlayStyle({
      opacity: 0.5,
      backgroundPosition: `${x / 5 + y / 5}%`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'all 0.5s ease',
    });
    setOverlayStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/guestbook/${msg.id}`)}
      style={{ ...mapleCardStyle, ...style }}
    >
      <div style={{ ...overlayStyle, ...overlayBaseStyle }} />
      <div style={cardImageArea}>
        <img src="/logo.png" alt="character" style={{ width: '100px' }} />
      </div>
      <div style={cardInfoArea}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={cardNameStyle}>{msg.visitor_name}</span>
          {/*<span style={cardLvStyle}>Lv. 99</span>*/}
        </div>
        <p style={cardCommentStyle}>{msg.comment.substring(0, 30)}...</p>
        <div style={cardTagGroup}>
          {msg.main_stack && <span style={tagStyle}>{msg.main_stack}</span>}
          <span style={{ color: '#aaa', fontSize: '11px' }}>{msg.mbti}</span>
        </div>
      </div>
    </div>
  );
};

// 2. 메인 방명록 컴포넌트
export const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    visitor_name: '',
    main_stack: '',
    mbti: '',
    comment: '',
    github_url: ''
  });

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("로드 실패:", error.message);
    else setMessages(data || []);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.visitor_name || !formData.comment) return;
    const { error } = await supabase.from('guestbook').insert([formData]);
    if (error) alert("등록 실패: " + error.message);
    else {
      setFormData({ visitor_name: '', main_stack: '', mbti: '', comment: '', github_url: '' });
      fetchMessages();
    }
  };

  return (
    <div className="guestbook-section" style={sectionContainerStyle}>
      <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '60px', textAlign: 'center' }}>
        Guestbook
      </h2>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <input placeholder="성함" value={formData.visitor_name} onChange={e => setFormData({...formData, visitor_name: e.target.value})} style={inputStyle} />
          <input placeholder="주요 스택" value={formData.main_stack} onChange={e => setFormData({...formData, main_stack: e.target.value})} style={inputStyle} />
          <input placeholder="MBTI" value={formData.mbti} onChange={e => setFormData({...formData, mbti: e.target.value})} style={inputStyle} />
        </div>
        <textarea placeholder="방명록 내용" value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} style={textareaStyle} />
        <button type="submit" style={submitBtnStyle}>방명록 남기기</button>
      </form>

      {/* 카드 리스트 그리드 (3열) */}
      <div style={cardGridStyle}>
        {messages.map(msg => (
          <GuestbookCard key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  );
};

// --- 스타일 정의 ---
const sectionContainerStyle: React.CSSProperties = {
  maxWidth: '1100px', // 300px 카드 3개 + 간격 고려
  margin: '0 auto',
  padding: '60px 20px',
  width: '100%',
  boxSizing: 'border-box'
};

const formStyle: React.CSSProperties = { 
  display: 'flex', flexDirection: 'column', gap: '15px', background: '#fff', 
  padding: '40px', borderRadius: '20px', border: '1px solid #eee', 
  boxSizing: 'border-box', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  marginBottom: '60px'
};

const inputGroupStyle: React.CSSProperties = { 
  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', width: '100%'
};

const inputStyle: React.CSSProperties = { padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box', width: '100%' };
const textareaStyle: React.CSSProperties = { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px', boxSizing: 'border-box', width: '100%', resize: 'vertical' };
const submitBtnStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

// 🔥 [핵심 수정] 3열 중앙 정렬 설정
const cardGridStyle: React.CSSProperties = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(3, 300px)', // 가로 300px 고정 3열
  justifyContent: 'center',               // 카드 뭉치를 가운데로 정렬
  gap: '30px',                            // 카드 간 간격
  width: '100%' 
};

const mapleCardStyle: React.CSSProperties = {
  position: 'relative', 
  width: '300px', 
  height: '380px', 
  borderRadius: '20px', 
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #2c3e50, #000)', 
  cursor: 'pointer', 
  transition: 'transform 0.1s ease',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
  border: '1px solid rgba(255,255,255,0.1)'
};

const overlayBaseStyle: React.CSSProperties = {
  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none',
  backgroundImage: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 65%)',
  backgroundSize: '200% 200%', mixBlendMode: 'overlay'
};

const cardImageArea: React.CSSProperties = { height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.05)' };
const cardInfoArea: React.CSSProperties = { padding: '20px', background: 'rgba(0,0,0,0.8)', color: '#fff', height: '160px', boxSizing: 'border-box', textAlign: 'left' };
const cardNameStyle: React.CSSProperties = { fontSize: '18px', fontWeight: 'bold', color: '#fff' };
// const cardLvStyle: React.CSSProperties = { color: '#ffeb3b', fontSize: '13px', fontWeight: 'bold' };
const cardCommentStyle: React.CSSProperties = { fontSize: '13px', margin: '10px 0', color: '#ccc', lineHeight: '1.4' };
const cardTagGroup: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px' };
const tagStyle: React.CSSProperties = { background: '#3B82F6', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' };