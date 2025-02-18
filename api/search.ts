import { Album, Track } from "@/types";
import { getAnthemClient } from "./clients";
import { Artist } from "react-native-spotify-remote";

export async function searchAlbums(query: string): Promise<Array<Album>> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get(`/spotify/albums?query=${encodeURIComponent(query)}`);
        const results = response.data as Array<Album>;
        return results;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}

export async function searchArtists(query: string): Promise<Array<Artist>> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get(`/spotify/artists?query=${encodeURIComponent(query)}`);
        const results = response.data as Array<Artist>;
        return results;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}
export async function searchTracks(query: string): Promise<Array<Track>> {
    const result = await getAnthemClient();

    if (result.IsSuccess && result.Data) {
        const client = result.Data;
        const response = await client.get(`/spotify/tracks?query=${encodeURIComponent(query)}`);
        const results = response.data as Array<Track>;
        return results;
    }
    else {
        throw new Error(result.ErrorMessage);
    }
}
