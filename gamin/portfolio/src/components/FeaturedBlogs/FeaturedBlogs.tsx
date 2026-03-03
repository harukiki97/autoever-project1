import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../api/supabase";
import styles from "./FeaturedBlogs.module.css";
import type { Blog } from "../../types/blog";

function FeaturedBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, summary, slug")
        .eq("type", "BLOG")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      setBlogs(data);
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.title}>Study Note</div>

      {/* 데이터가 성공적으로 불러와졌을 때 */}
      {blogs.length > 0 && (
        <div className={styles.cardsContainer}>
          {/* 왼쪽 2개 카드 묶음 */}
          <div className={styles.leftColumn}>
            {blogs[0] && (
              // 공통 card 스타일과 첫 번째 카드 전용 기울기(card1) 적용
              <div className={`${styles.card} ${styles.card1}`}>
                <h2>{blogs[0].title}</h2>
                <p>{blogs[0].summary}</p>
                <Link to={`/blogs/${blogs[0].slug}`}>→ details</Link>
              </div>
            )}
            {blogs[2] && (
              <div className={`${styles.card} ${styles.card3}`}>
                <h2>{blogs[2].title}</h2>
                <p>{blogs[2].summary}</p>
                <Link to={`/blogs/${blogs[2].slug}`}>→ details</Link>
              </div>
            )}
          </div>

          {/* 오른쪽 1개 카드 */}
          {blogs[1] && (
            <div className={`${styles.card} ${styles.card2}`}>
              <h2>{blogs[1].title}</h2>
              <p>{blogs[1].summary}</p>
              <Link to={`/blogs/${blogs[1].slug}`}>→ details</Link>
            </div>
          )}
        </div>
      )}

      <div className={styles.viewAll}>
        <Link to="/blogs">→ View All Study Notes</Link>
      </div>
    </section>
  );
}

export default FeaturedBlogs;
