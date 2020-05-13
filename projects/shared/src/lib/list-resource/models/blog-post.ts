import { Comment } from './comment.interface';

export interface BlogPost {
  id: number;
  title: string;
  comments: Comment[];
  commentCount: number;
}
