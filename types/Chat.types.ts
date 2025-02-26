export type Chat = {
  id: string;
  name: string;
  userIds: string[];
  lastMessageAt: Date;
  preview: string;
  creatorUserId: string;
  createdAt: Date;
}
