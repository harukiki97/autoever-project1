export interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date?: string;
  thumnail_url?: string; // DB 컬럼명 유지
  is_team: boolean;
  tech_stacks: string;
  description?: string;
  github_url?: string;
}


export interface GuestbookEntry {
  id: number;
  visitor_name: string;
  main_stack?: string;
  mbti?: string;
  comment: string;
  created_at: string;
}