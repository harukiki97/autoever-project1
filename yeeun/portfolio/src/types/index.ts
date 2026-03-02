// 사용자 프로필 타입 정의
export interface AdminProfile {
  id: number;
  name: string;
  profile_img: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

// 게시물(학습 내용 + TIL) 타입 정의
export type PostType = "BLOG" | "TIL";

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  type: PostType;
  views?: number;
  created_at: string | Date;
}

// 프로젝트 타입 정의
export interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date?: string | null;
  thumbnail_url?: string | null;
  is_team?: boolean | null;
  summary: string;
  tech_stacks?: string | null;
  created_at: string | Date;
}

// 프로젝트 상세 내용 타입 정의
export interface ProjectDetail {
  id: number;
  project_id: number;
  content: string;
  created_at: string | Date;
}

// JOIN 쿼리를 위해 합친 타입 정의
export interface ProjectWithDetails extends Project {
  project_details: ProjectDetail[];
}

// 경력 사항 제목 타입
export type CareerCategory = "교육" | "어학 및 자격증" | "활동";

// 경력 사항 상세 내용 데이터 타입 정의
export type CareerItem = {
  id: number;
  period: string;
  title: string;
  desc?: string;
  desc_detail?: string;
};

export type Career = {
  category: CareerCategory;
  items: CareerItem[];
};
