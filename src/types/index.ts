// 프로젝트 정보 타입
export interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date?: string;
  thumbnail_url?: string;
  is_team: boolean;
  tech_stacks: string;
}

// 방명록 입력 타입
export interface GuestbookEntry {
  visitor_name: string;
  main_stack: string;
  experience: number;
  mbti: string;
  phone: string;
  comment: string;
  github_url?: string;      // ?를 붙이면 필수가 아니라는 뜻입니다.
  linked_in_url?: string;
  blog_url?: string;
  profile_img?: string;
  is_hidden?: boolean;
}