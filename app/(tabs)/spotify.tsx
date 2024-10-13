import { Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { authorize, AuthConfiguration, AuthorizeResult } from 'react-native-app-auth';
import { remote, ApiScope } from 'react-native-spotify-remote';

export default function Spotify() {
    console.log('Hello from spotify.tsx')

    const config: AuthConfiguration = {
      clientId: "1e7c327a22964910bb370837f20dcc94",
      clientSecret: "827b63d5edf5400c90874de7875f2a84",
      redirectUrl: "anthem:/callback",
      scopes: [ApiScope.AppRemoteControlScope],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      }
    }


    async function playEpicSong() {
      try {
        const authState: AuthorizeResult = await authorize(config);
        console.log('Auth state:', authState);
        await remote.connect(authState.accessToken);
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
