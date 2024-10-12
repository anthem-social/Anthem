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
      clientID: '1e7c327a22964910bb370837f20dcc94',
      redirectURL: 'anthem:/callback',
      tokenRefreshURL: 'http://192.168.1.138:3000/refresh',
      tokenSwapURL: 'http://192.168.1.138:3000/swap',
      scopes: [ApiScope.AppRemoteControlScope]
    };

    async function playEpicSong() {
      try {
        const session = await auth.authorize(spotifyConfig);
        console.log(session);
        await remote.connect(session.accessToken);
        await remote.playUri('spotify:track:0GjEhVFGZW8afUYGChu3Rr');
        console.log('Playing epic song');
      }
      catch (e) {
        console.error(e);
      }
    }

    useEffect(() => {
      playEpicSong();
    }, []);
    
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
