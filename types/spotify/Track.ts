import { Album } from "./Album";
import { Artist } from "./Artist";

export type Track = {
    uri: string;
    name: string;
    artists: Array<Artist>;
    album: Album;
}
