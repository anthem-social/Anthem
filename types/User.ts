import { Track } from "@/types";

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

export type UserPage = {
    users: User[];
    lastEvaluatedKey: string | null;
}
