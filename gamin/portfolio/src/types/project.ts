export interface TechStack {
  id: number;
  name: string;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  summary: string;
  start_date: string;
  end_date: string | null;
  thumbnail_url: string | null;
  is_team: boolean;
  slug: string;
  created_at: string;
  tech_stacks?: TechStack[];
}
