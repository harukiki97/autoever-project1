import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import type { Post } from "../../types";
import MarkdownViewer from "../../components/MarkDownViewer/MarkDownViewer";
import styles from "./BlogDetail.module.css";
import getEngDate from "../../utils/getEngDate";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        console.error("포스트를 불러오는 중 에러 발생:", error);
        setPost(null);
      } else {
        setPost(data);
        // 조회수 증가 로직 (선택 사항)
        // await supabase.from("posts").update({ views: data.views + 1 }).eq("id", data.id);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return <div className={styles.status}>데이터를 불러오는 중입니다...</div>;
  if (!post)
    return <div className={styles.status}>존재하지 않는 포스트입니다.</div>;

  return (
    <div className={styles.blogDetail}>
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.infoBox}>
        {/* TODO: 작성자 이름 admin에서 불러오기 */}
        <p className={styles.author}>
          posted by <span>김예은</span>, {getEngDate(post.created_at)}
        </p>
        <p className={styles.views}>{post.views} viewes</p>
      </div>

      <MarkdownViewer content={post.content || ""} />

      <footer className={styles.footer}>
        <button onClick={() => navigate("/blog")} className={`backBtn`}>
          목록으로 돌아가기
        </button>
      </footer>
    </div>
  );
};

export default BlogDetail;
