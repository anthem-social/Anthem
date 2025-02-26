import { Card } from "@/types";

export type Like = {
  postId: string;
  id: string;
  userId: string;
}

export type LikeCard = {
  like: Like;
  card: Card;
}

export type LikeCardPage = {
  likes: LikeCard[];
  lastEvaluatedKey: string | null;
}
