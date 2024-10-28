import { Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image, StyleSheet, Linking } from 'react-native';
import { playTrack } from '@/api/resource';
import { refreshSpotifySession, removeSpotifySession } from '@/api/client';
import * as Keychain from 'react-native-keychain'
import { SpotifySession, remote } from 'react-native-spotify-remote';
import { getMe } from '@/api/me';
import { getUser } from '@/api/user';

export default function Profile() {
    async function myProfile() {
      Linking.openURL('spotify:user:schreineravery-us').catch(err => console.error('An error occurred', err));;
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

    async function fetchUser() {
      try {
        await getUser();
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
            <Button title="My Profile" onPress={myProfile} />
            <Button title="Play Dancing Queen" onPress={playDancingQueen} />
            <Button title="Play Sunflower" onPress={playSunflower} />
            <Button title="Refresh Session" onPress={refreshSession} />
            <Button title="Forget Session" onPress={forgetSession} />
            <Button title="Connect Remote" onPress={connectRemote} />
            <Button title="Get Me" onPress={fetchMe} />
            <Button title="Get User" onPress={fetchUser} />
        </ParallaxScrollView>
    );
}
