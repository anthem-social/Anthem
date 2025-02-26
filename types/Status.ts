import { Track } from "@/types";

export type Status = {
    userId: string;
    track: Track;
    lastChanged: Date;
}
