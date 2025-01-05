import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Track } from '@/types';
import { Linking } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';
import { playUri } from '@/api/spotify';

export function TrackCard(track: Track) {
  const open = async (uri: string) => {
    await Linking.openURL(uri);
  };

  const play = async (uri: string) => {
      await playUri(uri);
  }

  return (
    <View style={styles.container}>
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
        <Icon family="Ionicons" name="play-circle-outline" size={32} onPress={() => play(track.uri)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 4
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    gap: 4
  },
  cover: {
    width: 64,
    height: 64,
    borderRadius: 2,
  },
  icon: {
    paddingTop: 4,
    paddingHorizontal: 5
  },
  row: {
    flexDirection: 'row'
  },
  scroll: {
    width: "68%"
  },
  text: {
    fontSize: 14
  }
});
