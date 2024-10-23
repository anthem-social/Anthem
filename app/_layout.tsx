import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { auth, SpotifySession } from 'react-native-spotify-remote';
import { getSpotifyRemoteClient, getSpotifySession, setSpotifySession  } from '@/api/client';
import * as Keychain from 'react-native-keychain';
import { useColorScheme } from '@/hooks/useColorScheme';
import WelcomeScreen from './welcome';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isSpotifySessionInKeychain, setIsSpotifySessionInKeychain] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    async function checkKeychain() {
      try {
        const result = await Keychain.getGenericPassword({ service: 'spotifySession' });
        
        if (result) {
          const spotifySession: SpotifySession = JSON.parse(result.password!);
          setIsSpotifySessionInKeychain(true);    
        }
        else {
          setIsSpotifySessionInKeychain(false);
        }
      }
      catch {
        // TODO: Show error screen
        setIsSpotifySessionInKeychain(false);
      }
    }

    checkKeychain();
  }, []);

  async function initSpotifyAuth() {
    const result = await getSpotifySession();

    if (result.IsSuccess) {
      setIsSpotifySessionInKeychain(true)
    }
    else {
      // TODO: Show error screen
      console.log("Error: " + result.ErrorMessage)
      console.log("Origin: " + result.ErrorOrigin)
    }
  }

  if (!loaded) {
    return null;
  }
  else if (!isSpotifySessionInKeychain) {
    return <WelcomeScreen onPress={initSpotifyAuth} />;
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