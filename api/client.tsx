import { ServiceResult } from '@/types/ServiceResult';
import { auth, remote, ApiConfig, ApiScope, SpotifyRemoteApi, SpotifySession } from 'react-native-spotify-remote';
import * as Keychain from 'react-native-keychain';  
import axios, { AxiosInstance } from 'axios';

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
    ],
};

function getNewLocalExpirationDate(utcTimestamp: number, addSeconds: number): string {
    const expirationTimeUtc = utcTimestamp + (addSeconds * 1000);
    const timezoneOffset = new Date().getTimezoneOffset();
    const hoursOffset = Math.floor(timezoneOffset / 60);
    const hoursString = hoursOffset >= 10 ? '-' + hoursOffset.toString() : '-0' + hoursOffset.toString();
    const unclean = new Date(expirationTimeUtc - (timezoneOffset * 60 * 1000)).toISOString();
    const newExpirationDate = unclean.slice(0, 19) + hoursString + ":00";
    return newExpirationDate;
}

export async function refreshSpotifySession(spotifySession: SpotifySession): Promise<ServiceResult<SpotifySession>> {
    try {
        const timestamp = Date.now();
        const response = await axios.post(
            spotifyRemoteConfig.tokenRefreshURL!,
            new URLSearchParams({ refresh_token: spotifySession.refreshToken }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const newExpirationDate = getNewLocalExpirationDate(timestamp, parseInt(response.data.expires_in));
        const newAccessToken = response.data.access_token;

        const newSpotifySession: SpotifySession = {
            refreshToken: spotifySession.refreshToken,
            scope: response.data.scope,
            expirationDate: newExpirationDate,
            accessToken: newAccessToken,
            expired: false,
        };

        return ServiceResult.Success(newSpotifySession);
    }
    catch (e: any) {
        return ServiceResult.Failure(`Failed to refresh Spotify session: ${e}`, 'refreshSpotifySession()');
    }
}

export async function getSpotifySession(): Promise<ServiceResult<SpotifySession>> {
    const isRemoteConnected = await remote.isConnectedAsync();

    if (isRemoteConnected) {
        console.log('Remote is already connected.');
        const result = await Keychain.getGenericPassword({ service: 'spotifySession' });

        if (result) {
            const spotifySession: SpotifySession = JSON.parse(result.password);
            
            if (spotifySession.expired) {
                const refreshResult = await refreshSpotifySession(spotifySession);
    
                if (refreshResult.IsSuccess) {
                    console.log('Refreshed GTG.');
                    return ServiceResult.Success(refreshResult.Data!);
                }
                else {
                    return ServiceResult.Failure(refreshResult.ErrorMessage!, refreshResult.ErrorOrigin!);
                }
            }
            else {
                return ServiceResult.Success(spotifySession);
            }
        }
        else {
            try {
                const spotifySession = await auth.authorize(spotifyRemoteConfig);
                setSpotifySession(spotifySession);
                return ServiceResult.Success(spotifySession);
            }
            catch (e: any) {
                return ServiceResult.Failure(`Failed to authorize with Spotify remote: ${e}`, 'getSpotifySession()');
            }
        }
    }
    else {    
        try {
            const spotifySession = await auth.authorize(spotifyRemoteConfig);
            setSpotifySession(spotifySession);
            return ServiceResult.Success(spotifySession);
        }
        catch (e: any) {
            return ServiceResult.Failure(`Failed to authorize with Spotify remote: ${e}`, 'getSpotifySession()');
        }
    }
}

export async function setSpotifySession(spotifySession: SpotifySession): Promise<ServiceResult<null>> {
    const result = await Keychain.setGenericPassword('spotifySession', JSON.stringify(spotifySession), { service: 'spotifySession' });

    if (result) {
        return ServiceResult.Success(null);
    }
    else {
        return ServiceResult.Failure('Failed to set Spotify session.', 'setSpotifySession()');
    }
}

export async function getSpotifyRemoteClient(): Promise<ServiceResult<SpotifyRemoteApi>> {
    const result = await getSpotifySession();

    if (result.IsSuccess) {
        try {
            const spotifySession  = result.Data!;
            await remote.connect(spotifySession.accessToken);
            return ServiceResult.Success(remote);
        }
        catch (e: any) {
            return ServiceResult.Failure(`Failed to connect to Spotify remote: ${e}`, 'getSpotifyRemoteClient()');
        }
    }
    else {
        return ServiceResult.Failure(result.ErrorMessage!, result.ErrorOrigin!);
    }
}

export async function getAnthemClient(): Promise<ServiceResult<AxiosInstance>> {
    const result = await getSpotifySession();
    
    if (result.IsSuccess) {
        const spotifySession = result.Data!;
        const anthemClient = axios.create({
            baseURL: 'http://192.168.1.143:5101',
            headers: {
                'Authorization': `Bearer ${spotifySession.accessToken}`,
                // maybe others?
            }
        });

        return ServiceResult.Success(anthemClient);
    }
    else {
        return ServiceResult.Failure(result.ErrorMessage!, result.ErrorOrigin!);
    }
}
