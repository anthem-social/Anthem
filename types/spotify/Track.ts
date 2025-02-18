import { Album } from "./Album";
import { Artist } from "./Artist";

export type Track = {
    album: Album;
    artists: Array<Artist>;
    name: string;
    uri: string;
}
