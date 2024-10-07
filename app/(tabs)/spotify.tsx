import { Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { auth, remote, ApiScope, ApiConfig } from 'react-native-spotify-remote';

export default function Spotify() {
    console.log('Hello from spotify.tsx')
    const spotifyConfig: ApiConfig = {
      // clientID: '',
      redirectURL: 'spotify-ios-quick-start:/spotify-login-callback',
      tokenRefreshURL: 'https://accounts.spotify.com/api/token',
      tokenSwapURL: 'https://accounts.spotify.com/api/token',
      scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
      showDialog: true,
    };

    async function playEpicSong() {
      try {
        const session = await auth.authorize(spotifyConfig);
        console.log(session);
        await remote.connect(session.accessToken);
        await remote.playUri('spotify:track:6IA8E2Q5ttcpbuahIej074');
        await remote.seek(58000);
        console.log('Playing epic song');
      }
      catch (e) {
        console.error("Couldn't authorize with or connect to Spotify", e);
      }
    }

    playEpicSong();
    
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
            <ThemedText>hello world</ThemedText>
        </ParallaxScrollView>
    );
}
