import {AuthConfiguration, authorize, AuthorizeResult} from 'react-native-app-auth';
import { Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';

export default function Spotify() {
    console.log('Hello from spotify.tsx')
    // const [authState, setAuthState] = useState(defaultAuthState);

    const config: AuthConfiguration = {
        clientId: '1e7c327a22964910bb370837f20dcc94', // available on the app page
        clientSecret: '827b63d5edf5400c90874de7875f2a84', // click "show client secret" to see this
        redirectUrl: 'com.myapp:/oauth', // the redirect you defined after creating the app
        scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
        serviceConfiguration: {
          authorizationEndpoint: 'https://accounts.spotify.com/authorize',
          tokenEndpoint: 'https://accounts.spotify.com/api/token',
        },
      };
    
    const styles = StyleSheet.create({
        reactLogo: {
          height: 178,
          width: 290,
          bottom: 0,
          left: 0,
          position: 'absolute',
        },
    });

    console.log(config);
    console.log(authorize);

    const authenticate = async (): Promise<void> => {
        try {
          const result: AuthorizeResult = await authorize(config);
          console.log(result)
        }
        catch (err) {
          console.error('Failed to authenticate with Spotify', err);
        }
      };

    useEffect(() => {
        authenticate()
    }, [])
    
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
