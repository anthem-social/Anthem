import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Track } from '@/types';
import { Linking } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';
import { pause, playUri } from '@/api/spotifyRemote';

export function TrackCard(track: Track) {
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
    <View style={styles.container}>
      <View style={styles.spotify_icon_container}>
        <TouchableOpacity onPress={() => open("spotify://")}>
          <Image source={require("@/assets/images/Spotify_Primary_Logo_RGB_Green.png")} style={styles.spotify_icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => open(track.album.uri)}>
        <Image source={{ uri: track.album.coverUrl }} style={styles.cover} />
      </TouchableOpacity>
      <View style={[styles.col, { flex: 1 }]}>
        <View style={styles.row}>
          <Icon family="Ionicons" name="disc-outline" size={16} style={styles.icon} />
          <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
            <Text style={styles.text} onPress={() => open(track.uri)}>
              {track.name}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.row}>
          <Icon family="Ionicons" name="person-circle-outline" size={16} style={styles.icon} />
          <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
            {track.artists.map((artist, index) => (
              <Text key={index} style={styles.text} onPress={() => open(artist.uri)} numberOfLines={1}>
                  {artist.name}{index < track.artists.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.col}>
        <Icon
          family="Ionicons"
          name={playing ? "pause-circle-outline" : "play-circle-outline"}
          size={38}
          onPress={() => toggle(track.uri)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 4,
    backgroundColor: 'transparent'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#303030',
    borderRadius: 4,
    paddingHorizontal: 4
  },
  cover: {
    width: 64,
    height: 64,
    borderRadius: 2,
    backgroundColor: 'transparent'
  },
  icon: {
    paddingTop: 4,
    paddingHorizontal: 5,
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  scroll: {
    width: "68%",
    backgroundColor: 'transparent'
  },
  spotify_icon: {
    width: 21,
    height: 21,
    marginRight: 4,
    backgroundColor: 'transparent'
  },
  spotify_icon_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 14
  }
});
