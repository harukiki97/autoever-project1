// src/components/Guestbook.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase';

export const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  // 스키마에 정의된 컬럼들로 state 구성
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
    
    if (error) console.error("데이터 로드 실패:", error.message);
    else setMessages(data || []);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 필수 값 체크
    if (!formData.visitor_name || !formData.comment) return;

    const { error } = await supabase
      .from('guestbook')
      .insert([formData]); // 객체 통째로 전달

    if (error) {
      alert("등록 실패: " + error.message);
    } else {
      setFormData({ visitor_name: '', main_stack: '', mbti: '', comment: '', github_url: '' });
      fetchMessages();
    }
  };

  return (
    <div className="guestbook-section">
      <h2 className="section-title">Guestbook</h2>
      
      {/* 피그마의 form 양식 반영 */}
      <form onSubmit={handleSubmit} className="guestbook-form" style={formStyle}>
        <div style={inputGroupStyle}>
          <input 
            placeholder="성함 (visitor_name)" 
            value={formData.visitor_name}
            onChange={e => setFormData({...formData, visitor_name: e.target.value})}
            style={inputStyle}
          />
          <input 
            placeholder="주요 스택 (main_stack)" 
            value={formData.main_stack}
            onChange={e => setFormData({...formData, main_stack: e.target.value})}
            style={inputStyle}
          />
          <input 
            placeholder="MBTI" 
            value={formData.mbti}
            onChange={e => setFormData({...formData, mbti: e.target.value})}
            style={inputStyle}
          />
        </div>
        <textarea 
          placeholder="방명록 내용 (comment)" 
          value={formData.comment}
          onChange={e => setFormData({...formData, comment: e.target.value})}
          style={textareaStyle}
        />
        <button type="submit" style={submitBtnStyle}>방명록 남기기</button>
      </form>

      {/* 리스트 출력 부분 */}
      <div className="message-list" style={{ marginTop: '40px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={msgCardStyle}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{msg.visitor_name}</span>
              <span style={tagStyle}>{msg.main_stack}</span>
              <span style={{ color: '#888', fontSize: '12px' }}>{msg.mbti}</span>
            </div>
            <p style={{ margin: '10px 0' }}>{msg.comment}</p>
            {msg.github_url && <a href={msg.github_url} style={{ fontSize: '12px' }}>GitHub</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 스타일 (생략/이전 답변 참고) ---
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px', background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eee' };
const inputGroupStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' };
const inputStyle: React.CSSProperties = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px' };
const textareaStyle: React.CSSProperties = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px', minHeight: '100px' };
const submitBtnStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const msgCardStyle: React.CSSProperties = { padding: '20px', borderBottom: '1px solid #f0f0f0' };
const tagStyle: React.CSSProperties = { background: '#EFF6FF', color: '#3B82F6', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' };