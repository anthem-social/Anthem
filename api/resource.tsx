import { getAnthemClient, getSpotifyRemoteClient } from "./client";

export async function playTrack(trackUri: string) {
    var result = await getSpotifyRemoteClient();
    if (result.IsSuccess && result.Data) {
        var remote = result.Data;
        await remote.playUri(trackUri);
    }
    else {
        console.log("Error: " + result.ErrorMessage)
    }
}
