import { Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image, StyleSheet, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { auth, remote, SpotifySession } from 'react-native-spotify-remote';

export default function Profile() {
    const [session, setSession] = useState<SpotifySession>();

    useEffect(() => {
      async function connect() {
        auth.getSession().then((session) => {
          setSession(session);
          console.log("Token in profile: " + session!.accessToken);
        });

        await remote.connect(session?.accessToken!);
        console.log("Remote: " + await remote.isConnectedAsync());
      }

      connect()
    }, []);

    async function playSunflower() {
      try {
        await remote.playUri('spotify:track:3KkXRkHbMCARz0aVfEt68P');
      }
      catch (e) {
        console.error(e);
      }
    }

    async function playDancingQueen() {
      try {
        if (session) {
          await remote.playUri('spotify:track:0GjEhVFGZW8afUYGChu3Rr');
        }
      }
      catch (e) {
        console.error(e);
      }
    }

    async function fetchMe() {
      try {
        if (session) {
          console.log("Fetching Me!")
          const response = await fetch('http://192.168.1.143:5101/spotify/me', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
              // Authorization: `Bearer BQDhoIXD7XTAOsotvFW64ij_9tvX-DqcwhO5pjow0al4MxOCfJZ88eQUnRWGiw9fWFdB7umBddzUAtwz9cq7HitzspmbvKkqs89Kk7a7o8Cgv-QiNmh77s4Xt6wRTwEHv3GDr6jyaeiLjn0sUnFZ4kxNSU76FySUzl5g5zMfV7fZIKTUWPZ0p2gQ9LNWTbAVHEV-fTW96-7DqBp_ePN_Dqz4gIRsEQ`
            }
          })
          const data = await response.json();
          console.log(data);
        }
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
            <Button title="Play Dancing Queen" onPress={playDancingQueen} />
            <Button title="Play Sunflower" onPress={playSunflower} />
            <Button title="Fetch Me" onPress={fetchMe} />
        </ParallaxScrollView>
    );
}
