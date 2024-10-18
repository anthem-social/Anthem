import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { auth, remote, ApiScope, ApiConfig, SpotifySession } from 'react-native-spotify-remote';
import LoginScreen from './login'; // Assume you have a LoginScreen component

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [session, setSession] = useState<SpotifySession | null>(null);
  const spotifyConfig: ApiConfig = {
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  async function signInToSpotify() {
      try {
          const session = await auth.authorize(spotifyConfig);
          console.log("Session: " + session);
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

  if (session === null) {
    return <LoginScreen onPress={signInToSpotify} />;
  }
  else {
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
    );
  }
}