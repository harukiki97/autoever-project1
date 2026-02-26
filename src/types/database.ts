// src/types/database.ts

export interface AdminProfile {
  id: number;
  name: string;
  profile_img: string;
  bio: string;
  email: string;
  phone: string;
}

export interface Project {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  thumbnail_url: string;
  is_team: boolean;
  tech_stacks: string; // 텍스트 형태이므로 후에 .split(',') 등으로 처리
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  type: string;
  views: number;
  created_at: string;
}