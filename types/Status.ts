import { Track } from "./spotify/Track";

export type Status = {
    userId: string;
    track: Track;
    lastChanged: Date;
}
