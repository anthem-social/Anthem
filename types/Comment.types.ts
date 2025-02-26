import { Card } from "@/types";

export type Comment = {
  postId: string;
  id: string;
  text: string;
}

export type CommentCard = {
  comment: Comment;
  card: Card;
}

export type CommentCardPage = {
  comments: CommentCard[];
  lastEvaluatedKey: string | null;
}
