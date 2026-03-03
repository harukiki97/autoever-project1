import { useEffect, useState } from "react";
import type { BlogGeneralData, FilterType } from "../../types/blog";
import { supabase } from "../../api/supabase";
import { Link } from "react-router-dom";

function Blogs() {
  const [posts, setPosts] = useState<BlogGeneralData[]>([]);
  const [filter, setFilter] = useState<FilterType>("ALL");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else if (data) {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "ALL") return true;
    return post.type === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main>
      <header>
        <h1>Study Note</h1>
      </header>

      <nav>
        <button onClick={() => setFilter("ALL")}>ALL</button>
        <button onClick={() => setFilter("BLOG")}>POST</button>
        <button onClick={() => setFilter("TIL")}>TIL</button>
      </nav>

      <section>
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/blogs/${post.slug}`}>
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>

              <div>
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
                <span>{post.type === "BLOG" ? "POST" : "TIL"}</span>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Blogs;
