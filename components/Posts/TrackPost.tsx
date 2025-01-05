import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Track } from '@/types';
import { Linking } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';
import { pause, playUri } from '@/api/spotify';
import { Post } from './Post';

type Props = {
  card: Card,
  track: Track
}

export function TrackPost(props: Props) {
  const [playing, setPlaying] = React.useState(false);
  
  const open = async (uri: string) => {
    await Linking.openURL(uri);
  };

  const toggle = async (uri: string) => {
    if (playing) {
      await pause();
      setPlaying(false);
    }
    else {
      await playUri(uri);
      setPlaying(true);
    }
  }

  return (
    <Post card={props.card}>
      <View style={styles.container}>
        <View style={[styles.row, { paddingHorizontal: 4, paddingVertical: 6 }]}>
          <View style={styles.col}>
            <View style={styles.row}>
              <Icon family="Ionicons" name="disc-outline" size={16} style={styles.icon} />
              <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
                <Text style={styles.text} onPress={() => open(props.track.uri)}>
                  {props.track.name}
                </Text>
              </ScrollView>
            </View>
            <View style={styles.row}>
              <Icon family="Ionicons" name="person-circle-outline" size={16} style={styles.icon} />
              <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
                {props.track.artists.map((artist, index) => (
                  <Text key={index} style={styles.text} onPress={() => open(artist.uri)} numberOfLines={1}>
                    {artist.name}{index < props.track.artists.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.box}>
          <TouchableOpacity onPress={() => toggle(props.track.uri)}>
            <Image source={{ uri: props.track.album.coverUrl }} style={styles.cover} />
          </TouchableOpacity>
        </View>
      </View>
    </Post>
  );
}

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 0
  },
  container: {
    display: 'flex',
    width: '100%',
    gap: 4
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 2,
  },
  icon: {
    paddingTop: 4,
    paddingHorizontal: 5
  },
  row: {
    flexDirection: 'row',
  },
  scroll: {
    width: "68%"
  },
  text: {
    fontSize: 14
  }
});
