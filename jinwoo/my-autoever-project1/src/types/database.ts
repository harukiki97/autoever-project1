export interface AdminProfile {
  id: number;
  name: string;
  profile_img: string;
  bio: string;
  email: string;
  phone: string;
  role?: string;
}

export interface Project {
  id: number;
  title: string;
  start_date: string;     // DB: date
  end_date?: string;      // DB: date
  thumnail_url?: string;  // DB: thumnail_url (오타주의)
  is_team: boolean;       // DB: bool
  tech_stacks: string;    // DB: text (쉼표로 구분된 문자열)
  description?: string;   // DB: text
  github_url?: string;    // DB: text
  created_at: string;

  // ✨ 새로 추가된 상세 페이지용 컬럼들
  content?: string;       // DB: text (상세 본문)
  file_url?: string;      // DB: text (파일 링크)
  file_name?: string;     // DB: text (파일 이름)
}