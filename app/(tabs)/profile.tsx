import { Button } from 'react-native';
import { Image, StyleSheet, Linking } from 'react-native';
import { playTrack } from '@/api/resource';
import { refreshSpotifySession, removeSpotifySession } from '@/api/client';
import * as Keychain from 'react-native-keychain'
import { SpotifySession, remote } from 'react-native-spotify-remote';
import { getMe } from '@/api/me';
import { useEffect, useRef, useState } from 'react';
import { getUser, getUserStatus } from '@/api/user';
import { Status } from '@/types/Status';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AnthemView from '@/components/AnthemView';

export default function Profile() {
    const ws = useRef<WebSocket | null>(null);
    const [trackUri, setTrackUri] = useState<string | null>(null);
    const [alubmUri, setAlbumUri] = useState<string | null>(null);
    
    async function myProfile() {
      Linking.openURL('spotify:user:schreineravery-us').catch(err => console.error('An error occurred', err));;
    }

    async function goToTrack() {
      Linking.openURL(trackUri!).catch(err => console.error('An error occurred', err));
    }

    async function goToAlbum() {
      Linking.openURL(alubmUri!).catch(err => console.error('An error occurred', err));
    }

    async function playSunflower() {
      try {
        await playTrack("spotify:track:3KkXRkHbMCARz0aVfEt68P")
      }
      catch (e) {
        console.error(e);
      }
    }

    async function playDancingQueen() {
      try {
        await playTrack("spotify:track:0GjEhVFGZW8afUYGChu3Rr")
      }
      catch (e) {
        console.error(e);
      }
    }

    async function connectRemote() {
      try {
        await remote.connect('/Axi0p4mjud06AjLBLMXaQy7050ObseTxISWTWMXp7b28eWCpfiBOmxyYGyVCITu5HcYCsAvuOBHXfkrTI+fdmqem8GpaPQ9+dPySDtAiwgxjsdUDrmB61OwfknjCth2hWbZcNN4kqkjvjGVUJvxJTw6TTjjJ4RrIG558gfRCTYJz8fl/l5eYu7NElJUU0ulTBolIX2G4nuBIXwTtx8tefFDmCtetCT7Thv9/yVcHPQ1893TJ9ie0p0HSaT7Pw6Zt/dkDMlt+fGqE1+VIFoLF/eYkVpT8oCRXnpzkXHU+D0I2C6cC45yRJn6eL3Ld+Mv');
        remote.playUri('spotify:track:6CfrYuD3YRDYdYvH9jNtXY');
      }
      catch (e) {
        console.error(e);
      }
    }
    
    async function refreshSession() {
      try {
        console.log('Refreshing session.');
        var result = await Keychain.getGenericPassword({ service: 'spotifySession' });
        if (result) {
          const spotifySession: SpotifySession = JSON.parse(result.password);
          await refreshSpotifySession(spotifySession);
        }
      }
      catch (e) {
        console.error(e);
      }
    }

    async function forgetSession() {
      try {
        console.log('Forgetting session.');
        await removeSpotifySession();
      }
      catch (e) {
        console.error(e);
      }
    }

    async function fetchMe() {
      try {
        await getMe();
      }
      catch (e) {
        console.error(e);
      }
    }

    async function handleGetUserStatus() {
      try {
        await getUserStatus("schreineravery-us");
      }
      catch (e) {
        console.error(e);
      }
    }

    async function handleGetUser() {
      try {
        await getUser("schreineravery-us");
      }
      catch (e) {
        console.error(e);
      }
    }
    
    return (
      <AnthemView>
        <ThemedText style={styles.top}>
        </ThemedText>
      </AnthemView>
    );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  top: {
    marginTop: 16,
  },
});

