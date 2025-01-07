import { ServiceResult } from "@/types/ServiceResult";
import { auth, remote, ApiConfig, ApiScope, SpotifyRemoteApi, SpotifySession, PlayerContext, PlayerState } from "react-native-spotify-remote";
import * as Keychain from "react-native-keychain";  
import axios, { AxiosInstance } from "axios";

const ANTHEM_API_URL = process.env.EXPO_PUBLIC_ANTHEM_API_URL;
const spotifyRemoteConfig: ApiConfig = {
    clientID: "1e7c327a22964910bb370837f20dcc94",
    redirectURL: "anthem:/callback",
    tokenRefreshURL: `${ANTHEM_API_URL}/token/refresh`,
    tokenSwapURL: `${ANTHEM_API_URL}/token/swap`,
    scopes: [
        ApiScope.AppRemoteControlScope,
        ApiScope.UserFollowModifyScope,
        ApiScope.UserFollowReadScope,
        ApiScope.UserReadPlaybackStateScope,
        ApiScope.UserReadPrivateScope
    ]
};

export async function connectToSpotify(): Promise<ServiceResult<SpotifySession>> {
    try {
        // Connet to the Spotify app
        const session = await auth.authorize(spotifyRemoteConfig);
        await remote.connect(session.accessToken);

        // Keep track of the session
        const result = await setSpotifySession(session);
        if (!result.IsSuccess) {
            return ServiceResult.Failure(result.ErrorMessage!, result.ErrorOrigin!);
        }

        return ServiceResult.Success(session);
    }
    catch (e: any) {
        // Disconnect from Spotify and forget the session
        await remote.disconnect();
        await removeSpotifySession();
        return ServiceResult.Failure(`Failed to connect to Spotify: ${e}`, "connectToSpotify()");
    }
}

export async function getSpotifyRemoteClient(): Promise<ServiceResult<SpotifyRemoteApi>> {
    const result = await getSpotifySession();

    if (result.IsSuccess) {
        remote.addListener("playerContextChanged", (context: PlayerContext) => {
            console.log("Player context changed to: ", JSON.stringify(context));
        });
        remote.addListener("playerStateChanged", (state: PlayerState) => {
            console.log("Player state changed to: ", JSON.stringify(state));
        });
        remote.addListener("remoteDisconnected", () => {
            console.log("Remote disconnected.");
        });
        remote.addListener("remoteConnected", () => {
            console.log("Remote connected.");
        });

        return ServiceResult.Success(remote);
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
            baseURL: ANTHEM_API_URL,
            headers: {
                "Authorization": `Bearer ${spotifySession.accessToken}`,
                // maybe others?
            }
        });

        return ServiceResult.Success(anthemClient);
    }
    else {
        return ServiceResult.Failure(result.ErrorMessage!, result.ErrorOrigin!);
    }
}

async function getSpotifySession(): Promise<ServiceResult<SpotifySession>> {
    const isRemoteConnected = await remote.isConnectedAsync();

    if (isRemoteConnected) {
        console.log("Remote is already connected.");
        const result = await Keychain.getGenericPassword({ service: "spotifySession" });

        if (result) {
            const spotifySession: SpotifySession = JSON.parse(result.password);
            
            if (spotifySession.expired) {
                const refreshResult = await refreshSpotifySession(spotifySession);
    
                if (refreshResult.IsSuccess) {
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
            return ServiceResult.Failure("Remote connected but no spotifySession.", "getSpotifySession()");
        }
    }
    else {
        return await connectToSpotify();
    }
}

async function setSpotifySession(spotifySession: SpotifySession): Promise<ServiceResult<null>> {
    const result = await Keychain.setGenericPassword("spotifySession", JSON.stringify(spotifySession), { service: "spotifySession" });

    if (result) {
        return ServiceResult.Success(null);
    }
    else {
        return ServiceResult.Failure("Failed to set Spotify session.", "setSpotifySession()");
    }
}

function getNewLocalExpirationDate(utcTimestamp: number, addSeconds: number): string {
    const expirationTimeUtc = utcTimestamp + (addSeconds * 1000);
    const timezoneOffset = new Date().getTimezoneOffset();
    const hoursOffset = Math.floor(timezoneOffset / 60);
    const hoursString = hoursOffset >= 10 ? "-" + hoursOffset.toString() : "-0" + hoursOffset.toString();
    const unclean = new Date(expirationTimeUtc - (timezoneOffset * 60 * 1000)).toISOString();
    const newExpirationDate = unclean.slice(0, 19) + hoursString + ":00";
    return newExpirationDate;
}

// TODO: Remove export
export async function refreshSpotifySession(spotifySession: SpotifySession): Promise<ServiceResult<SpotifySession>> {
    try {
        const timestamp = Date.now();
        const response = await axios.post(
            spotifyRemoteConfig.tokenRefreshURL!,
            new URLSearchParams({ refresh_token: spotifySession.refreshToken }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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
        return ServiceResult.Failure(`Failed to refresh Spotify session: ${e}`, "refreshSpotifySession()");
    }
}

// TODO: Remove export
export async function removeSpotifySession(): Promise<ServiceResult<null>> {
    const result = await Keychain.resetGenericPassword({ service: "spotifySession" });

    if (result) {
        return ServiceResult.Success(null);
    }
    else {
        return ServiceResult.Failure("Failed to remove Spotify session.", "removeSpotifySession()");
    }
}
