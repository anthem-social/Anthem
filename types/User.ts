import { Track } from "./spotify/Track";

export type User = {
    id: string;
    premium: boolean;
    nickname: string;
    pictureUrl: string;
    bio: string;
    anthem: Track;
    joined: Date;
    followers: Array<string>;
    following: Array<string>;
    friends: Array<string>;
}
