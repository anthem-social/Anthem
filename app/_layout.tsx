import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ApiScope, ApiConfig, SpotifySession } from 'react-native-spotify-remote';
import { getSpotifyRemoteClient  } from '@/api/client';


import { useColorScheme } from '@/hooks/useColorScheme';
import WelcomeScreen from './welcome';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  async function connectSpoifyAccount() {
    const result = await getSpotifyRemoteClient();
    if (result.IsSuccess) {
      console.log("Connected to Spotify!")
      setSignedIn(true)
    }
    else {
      // TODO: return error screen
      console.log("Error: " + result.ErrorMessage)
      console.log("Origin: " + result.ErrorOrigin)
    }
  }

  if (!signedIn) {
    return <WelcomeScreen onPress={connectSpoifyAccount} />;
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