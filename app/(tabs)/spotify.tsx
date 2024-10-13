import { Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { auth, remote, ApiScope, ApiConfig, SpotifySession } from 'react-native-spotify-remote';

export default function Spotify() {
    const [session, setSession] = useState<SpotifySession | null>(null);
    console.log('Hello from spotify.tsx')
    const spotifyConfig: ApiConfig = {
      clientID: '1e7c327a22964910bb370837f20dcc94',
      redirectURL: 'anthem:/callback',
      tokenRefreshURL: 'http://192.168.1.143:5101/spotify/token/refresh',
      tokenSwapURL: 'http://192.168.1.143:5101/spotify/token/swap',
      scopes: [
        ApiScope.UserReadCurrentlyPlayingScope,
        ApiScope.AppRemoteControlScope,
        ApiScope.UserFollowModifyScope,
        ApiScope.UserFollowReadScope,
        ApiScope.UserReadPrivateScope,
      ]
    };

    async function signInToSpotify() {
      try {
        const session = await auth.authorize(spotifyConfig);
        if (session) {
          setSession(session);
          remote.connect(session.accessToken);
        }
        console.log(session);
      }
      catch (e) {
        console.error(e);
      }
    }

    async function playSunflower() {
      try {
        if (session) {
          await remote.playUri('spotify:track:3KkXRkHbMCARz0aVfEt68P');
        }
      }
      catch (e) {
        console.error(e);
      }
    }

    async function playDancingQueen() {
      try {
        if (session) {
          await remote.playUri('spotify:track:0GjEhVFGZW8afUYGChu3Rr');
        }
      }
      catch (e) {
        console.error(e);
      }
    }

    async function fetchMe() {
      try {
        if (session) {
          const response = await fetch('http://192.168.1.143:5101/spotify/me', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
          const data = await response.json();
          console.log(data);
        }
      }
      catch (e) {
        console.error(e);
      }
    }
    
    const styles = StyleSheet.create({
        reactLogo: {
          height: 178,
          width: 290,
          bottom: 0,
          left: 0,
          position: 'absolute',
        },
    });
    
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
            <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
            />}
        >
            <Button title="Sign in to Spotify" onPress={signInToSpotify} />
            <Button title="Play Dancing Queen" onPress={playDancingQueen} />
            <Button title="Play Sunflower" onPress={playSunflower} />
            <Button title="Fetch Me" onPress={fetchMe} />
            <ThemedText>hello world</ThemedText>
        </ParallaxScrollView>
    );
}
