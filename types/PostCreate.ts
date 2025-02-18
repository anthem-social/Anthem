import { ContentType } from '@/types';

export type PostCreate = {
    contentType: number;
    content: string;
    caption: string | null;
}
