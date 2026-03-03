import styles from "./Posts.module.css";
import { useEffect, useState } from "react";
import type { Post } from "../../types";
import { supabase } from "../../api/supabase";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("type", "BLOG") // BLOG 타입의 게시물만 가져오도록
        .limit(3); // 최신 게시물 3개만 띄우기!!

      if (error) {
        console.log("error: ", error);
      } else {
        setPosts(data ?? []);
      }
    };

    fetchPosts();
  }, []);

  const leftPosts = posts.slice(0, 2);
  const rightPost = posts[2];

  return (
    <section className={styles.section}>
      <h1 className="section-title">Study Note</h1>

      <div className={styles.posts}>
        {/* 왼쪽 컬럼 (2개) */}
        <div className={styles.leftColumn}>
          {leftPosts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className={styles.post}
            >
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <button className={styles.more}>→ details</button>
            </Link>
          ))}
        </div>

        {/* 오른쪽 컬럼 (1개) */}
        {rightPost && (
          <Link to={`/blog/${rightPost.slug}`} className={styles.rightColumn}>
            <article className={styles.post}>
              <h2>{rightPost.title}</h2>
              <p>{rightPost.summary}</p>
              <button className={styles.more}>→ details</button>
            </article>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Posts;
