import { ContentType } from '@/types';

export type Post = {
    userId: string;
    id: string;
    contentType: ContentType;
    content: string;
    caption: string | null;
    totalLikes: number;
    totalComments: number;
}
