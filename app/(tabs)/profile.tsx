import { Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image, StyleSheet, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { playTrack } from '@/api/resource';

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
        </ParallaxScrollView>
    );
}
