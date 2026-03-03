import styles from "./BlogContent.module.css";
import type { Post } from "../../types";
import { formatRelativeDate } from "../../utils/getDate";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
  type: "ALL" | "BLOG" | "TIL";
}

const BlogContent = ({ post, type }: Props) => {
  return (
    <Link to={`/blog/${post.slug}`} className={styles.blogContent}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.summary}>{post.summary}</p>
      <div className={styles.bottomData}>
        <span>{formatRelativeDate(post.created_at)}</span>
        <span>{type}</span>
      </div>
    </Link>
  );
};

export default BlogContent;
