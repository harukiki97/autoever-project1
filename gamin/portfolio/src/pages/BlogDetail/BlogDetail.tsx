import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../api/supabase";
import ReactMarkdown from "react-markdown";
import type { BlogData } from "../../types/blog";

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogData | null>(null);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("posts")
        .select("title, views, created_at")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching post details:", error);
      } else {
        setPost(data);
      }
    };

    fetchPostDetail();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    fetch(`/blogs/${slug}.md`)
      .then(async (res) => {
        if (!res.ok) return "";

        const text = await res.text();

        // SPA 환경에서 파일이 없을 때 반환되는 index.html 코드를 걸러냅니다. (AI 코드)
        if (text.trim().toLowerCase().startsWith("<!doctype html>")) {
          return "";
        }

        return text;
      })
      .then((text) => setContent(text));
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <main>
        <h1>{post?.title || "Loading..."}</h1>
        <div>
          <div>
            <span>
              posted by <strong>차가민</strong>,
            </span>
            <span>{post?.created_at ? formatDate(post.created_at) : ""}</span>
          </div>
        </div>

        <article>
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p>본문을 불러오는 중이거나 작성된 내용이 없습니다.</p>
          )}
        </article>
      </main>
    </div>
  );
}

export default BlogDetail;
