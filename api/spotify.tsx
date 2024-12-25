import { getSpotifyClient } from './client';

export async function playUri(uri: string): Promise<void> {
    var result = await getSpotifyClient();

    if (result.Data == null || result.IsFailure) {
        return;
    }

    var client = result.Data;

    await client.playUri(uri);
}
