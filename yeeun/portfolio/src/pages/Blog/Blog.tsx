import { useEffect, useState } from "react";
import BlogContent from "../../components/Blog/BlogContent";
import styles from "./Blog.module.css";
import type { Post } from "../../types";
import { supabase } from "../../api/supabase";

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // 블로그 타입을 어떻게 관리하면 좋을까.
  // 타입을 미리 정의해두고 그 안의 값만 set 할 수 있도록.
  const POST_TYPES = ["ALL", "BLOG", "TIL"] as const;
  type PostType = (typeof POST_TYPES)[number];
  const [selectedType, setSelectedType] = useState<PostType>("ALL");

  useEffect(() => {
    const fetchPosts = async () => {
      // 전체 데이터 불러오기
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.log("error: ", error);
      } else {
        setPosts(data ?? []);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    selectedType === "ALL"
      ? posts
      : posts.filter((post) => post.type === selectedType);

  return (
    <div className={styles.blog}>
      <h1 className="section-title">Study Note</h1>
      <div className={styles.filter}>
        {/* type 버튼 클릭 한 번에 처리하기 */}
        {POST_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? styles.active : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <div className={styles.blogItem}>
        {filteredPosts.map((post) => (
          <BlogContent key={post.id} post={post} type={selectedType} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
