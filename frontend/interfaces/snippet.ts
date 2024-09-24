import { SnippetComment } from "./comment";
import { Technology } from "./technology";
import { User } from "./user";

export interface Snippet {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  creatorId: string;
  technologyId: string | null;
  technology: Technology | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  favoriteCount: number;
  likeCount: number;
  commentCount: number;
  comments?: SnippetComment[];
}

export interface SnippetWithCreator extends Snippet {
  creator: User;
}

export interface PaginatedSnippets {
  data: Snippet[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
