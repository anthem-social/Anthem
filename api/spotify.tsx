import { getSpotifyRemoteClient } from '@/api/clients';

export async function playUri(uri: string): Promise<void> {
    var result = await getSpotifyRemoteClient();

    if (result.Data == null || result.IsFailure) {
        return;
    }

    var client = result.Data;

    await client.playUri(uri);
}

export async function pause(): Promise<void> {
    var result = await getSpotifyRemoteClient();

    if (result.Data == null || result.IsFailure) {
        return;
    }

    var client = result.Data;

    await client.pause();
}
