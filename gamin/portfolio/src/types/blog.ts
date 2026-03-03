export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
}

export type PostType = "BLOG" | "TIL";

export interface BlogGeneralData {
  id: number;
  title: string;
  slug: string;
  summary: string;
  type: PostType;
  views: number;
  created_at: string;
}

export type FilterType = "ALL" | PostType;

export interface BlogData {
  title: string;
  views: number;
  created_at: string;
}
