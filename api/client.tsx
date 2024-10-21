import { ServiceResult } from '@/types/ServiceResult';
import { auth, remote, ApiConfig, ApiScope, SpotifyRemoteApi, SpotifySession } from 'react-native-spotify-remote';

const spotifyRemoteConfig: ApiConfig = {
    clientID: '1e7c327a22964910bb370837f20dcc94',
    redirectURL: 'anthem:/callback',
    tokenRefreshURL: 'http://192.168.1.143:5101/token/refresh',
    tokenSwapURL: 'http://192.168.1.143:5101/token/swap',
    scopes: [
        ApiScope.UserReadCurrentlyPlayingScope,
        ApiScope.AppRemoteControlScope,
        ApiScope.UserFollowModifyScope,
        ApiScope.UserFollowReadScope,
        ApiScope.UserReadPrivateScope,
    ]
};

export async function getSpotifyRemoteSession(): Promise<ServiceResult<SpotifySession>> {
    try {
        var spotifyRemoteSession = await auth.getSession();

        // If there is no session, we need to authorize with Spotify
        if (spotifyRemoteSession == undefined) {
            spotifyRemoteSession = await auth.authorize(spotifyRemoteConfig);
        }

        // If the session is expired, we need to refresh the token
        if (spotifyRemoteSession.expired) {
            // TODO: call anthem api to refresh token
        }
        
        if (spotifyRemoteSession.accessToken) {
            return ServiceResult.Success(spotifyRemoteSession);
        }

        return ServiceResult.Failure('No access token in session.', 'getSpotifyRemoteSession()');
    }
    catch (e: any) {
        return ServiceResult.Failure(`Failed to get Spotify remote session: ${e}`, 'getSpotifyRemoteSession()');
    }
}

export async function getSpotifyRemoteClient(): Promise<ServiceResult<SpotifyRemoteApi>> {
    try {
        // If the remote client is already connected, return it
        var remoteIsConnected = await remote.isConnectedAsync();
        if (remoteIsConnected) {
            return ServiceResult.Success(remote);
        }
        
        // Otherwise, connect to the remote client
        var result = await getSpotifyRemoteSession();
        if (result.IsFailure) {
            return ServiceResult.Failure(result.ErrorMessage!, result.ErrorOrigin!);
        }

        try {
            await remote.connect(result.Data!.accessToken);
            return ServiceResult.Success(remote);    
        }
        catch (e: any) {
            return ServiceResult.Failure(`Failed to connect to Spotify remote client: ${e}`, 'getSpotifyRemoteClient()');
        }
    }
    catch (e: any) {
        return ServiceResult.Failure(`Failed to create Spotify remote client: ${e}`, 'getSpotifyRemoteClient()');
    }
}

export async function getAnthemClient() {
}
