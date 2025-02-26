import { Card, ContentType } from "@/types";

export type Message = {
  chatId: string;
  id: string;
  contentType: ContentType;
  content: string;
}

export type MessageCard = {
  card: Card;
  message: Message;
}

export type MessageCardPage = {
  messages: MessageCard[];
  lastEvaluatedKey: string | null;
}
