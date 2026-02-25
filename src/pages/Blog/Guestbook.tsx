import { useState, useEffect } from 'react';
import { supabase } from '../../api/supabase';
import type { GuestbookEntry } from '../../types';

export default function Guestbook() {
  const [form, setForm] = useState<GuestbookEntry>({
    visitor_name: '',
    main_stack: '',
    experience: 0,
    mbti: '',
    phone: '',
    comment: '',
    github_url: '',
    is_hidden: false
  });

  const [posts, setPosts] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("로드 실패:", error);
    else setPosts(data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 💡 콘솔에서 전송 전 데이터를 확인해보세요
      console.log("전송 데이터:", form);

      const { error } = await supabase.from('guestbook').insert([form]);
      if (error) throw error;

      alert("방명록이 등록되었습니다! 🎉");
      
      // 폼 초기화 (모든 필드를 비워줍니다)
      setForm({
        visitor_name: '',
        main_stack: '',
        experience: 0,
        mbti: '',
        phone: '',
        comment: '',
        github_url: '',
        is_hidden: false
      });
      
      fetchPosts();
    } catch (error: any) {
      console.error("저장 실패:", error.message);
      alert("등록 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>✍️ 방명록 작성</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        
        {/* 모든 입력 필드에 onChange가 올바르게 설정되어 있는지 확인하세요 */}
        <input 
          placeholder="이름" required 
          value={form.visitor_name} 
          onChange={e => setForm({...form, visitor_name: e.target.value})} 
        />
        <input 
          placeholder="주요 기술 스택" required 
          value={form.main_stack} 
          onChange={e => setForm({...form, main_stack: e.target.value})} 
        />
        <input 
          placeholder="MBTI" maxLength={4} 
          value={form.mbti} 
          onChange={e => setForm({...form, mbti: e.target.value})} 
        />
        <input 
          type="number" placeholder="경력(년)" 
          value={form.experience} 
          onChange={e => setForm({...form, experience: Number(e.target.value)})} 
        />
        <input 
          type="tel" placeholder="연락처" 
          value={form.phone} 
          onChange={e => setForm({...form, phone: e.target.value})} 
        />
        <input 
          placeholder="GitHub URL" 
          value={form.github_url} 
          onChange={e => setForm({...form, github_url: e.target.value})} 
        />
        <textarea 
          placeholder="응원 한마디" required
          value={form.comment} 
          onChange={e => setForm({...form, comment: e.target.value})} 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? '등록 중...' : '방명록 남기기'}
        </button>
      </form>

      <hr />

      <div className="guestbook-list">
        <h3>최근 방명록 목록</h3>
        {posts.map((post: any) => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
            <h4>{post.visitor_name} <small>({post.mbti})</small></h4>
            <p><strong>기술 스택:</strong> {post.main_stack} / <strong>경력:</strong> {post.experience}년</p>
            <p><strong>내용:</strong> {post.comment}</p>
            {post.github_url && <p><a href={post.github_url} target="_blank">GitHub 바로가기</a></p>}
            <small style={{ color: '#888' }}>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}