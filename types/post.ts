export interface Post {
  id: number;
  title: string;
  content: string;
  user_name: string;
  created_at: string; // ISO 8601形式 "2025-11-08T11:04:54.102607"
  updated_at: string; // ISO 8601形式 "2025-11-08T11:04:54.102610"
}

export interface CreatePostInput {
  title: string;
  content: string;
  user_name: string;
}

export interface UpdatePostInput {
  id: number;
  title: string;
  content: string;
  user_name: string;
}
