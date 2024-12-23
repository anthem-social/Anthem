import { Track } from './spotify/Track';

export type User = {
    id: string;
    alias: string;
    pictureUrl: string;
    bio: string;
    anthem: Track;
    followers: Array<string>;
    following: Array<string>;
    friends: Array<string>;
}
