import { Card, ContentType, Like } from '@/types';

export type Post = {
  userId: string;
  id: string;
  caption: string | null;
  contentType: ContentType;
  content: string;
  totalComments: number;
  totalLikes: number;
}

export type PostCard = {
  card: Card;
  like: Like | null;
  post: Post;
}

export type PostCardPage = {
  posts: PostCard[];
  lastEvaluatedKey: string | null;
}
