export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
}

export interface BlogData {
  title: string;
  views: number;
  created_at: string;
}
