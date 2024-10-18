import { Resource } from '@/types/Resource';

export type User = {
    userId: string;
    alias: string;
    picture: string;
    lastActive: Date;
    lastTrack: Resource;
}