import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SpotifySession } from "react-native-spotify-remote";
import { connectToSpotify } from "@/api/clients";
import * as Keychain from "react-native-keychain";
import { useColorScheme } from "@/hooks/useColorScheme";
import WelcomeScreen from "./welcome";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [hasSpotifySession, setHasSpotifySession] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    async function checkForSpotifySession() {
      try {
        const result = await Keychain.getGenericPassword({ service: "spotifySession" });
        
        if (result) {
          const spotifySession: SpotifySession = JSON.parse(result.password!);
          setHasSpotifySession(true);    
        }
        else {
          setHasSpotifySession(false);
        }
      }
      catch {
        // TODO: Show error screen
        setHasSpotifySession(false);
      }
    }

    checkForSpotifySession();
  }, []);

  async function tryConnectToSpotify() {
    try {
      const result = await connectToSpotify();

      if (result.IsSuccess) {
        setHasSpotifySession(true);
      }
      else {
        // TODO: Show error screen
        setHasSpotifySession(false);
        console.log("Error: " + result.ErrorMessage)
        console.log("Origin: " + result.ErrorOrigin)
      }
    }
    catch {
      // TODO: Show error screen
      setHasSpotifySession(false);
    }
  }

  if (!loaded) {
    return null;
  }
  else if (!hasSpotifySession) {
    return <WelcomeScreen onPress={tryConnectToSpotify} />;
  }
  else {
    tryConnectToSpotify();
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
    );
  }
}