import { Resource } from '@/types/Resource';

export type User = {
    userId: string;
    alias: string;
    pictureUrl: string;
    lastActive: Date;
    lastTrack: Resource;
}