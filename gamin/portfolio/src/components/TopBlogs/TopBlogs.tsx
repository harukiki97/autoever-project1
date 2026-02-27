import type { BlogPreviewCard } from "../../types/TopBlogs";
import { useState } from "react";
import { Link } from "react-router-dom";

function TopBlogs() {
  const [blogs, setBlogs] = useState<BlogPreviewCard[]>([]);
  return (
    <section>
      <h1>Study Note</h1>

      <Link to="/blogs">→ View All Study Notes</Link>
    </section>
  );
}

export default TopBlogs;
