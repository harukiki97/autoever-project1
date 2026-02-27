export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  type: "POST" | "TIL";
  views: number;
  created_at: string;
}

// Home Page용
export type BlogPreviewCard = Pick<Blog, "title" | "summary" | "slug">;

// 전체 리스트 페이지 용
export type BlogListItem = Pick<
  Blog,
  "title" | "summary" | "created_at" | "type" | "slug"
>;

// 게시글 상세 페이지 용
export type BlogDetailData = Omit<Blog, "summary">;
