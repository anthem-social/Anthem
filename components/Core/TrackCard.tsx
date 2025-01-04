import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Track } from '@/types';
import { Linking } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';

export function TrackCard(track: Track) {
  const open = async (uri: string) => {
    await Linking.openURL(uri);
  };

  return (
    <View style={[styles.row, { gap: 4}]}>
      <TouchableOpacity onPress={() => open(track.album.uri)}>
        <Image source={{ uri: track.album.coverUrl }} style={styles.cover} />
      </TouchableOpacity>
      <View style={styles.col}>
        <View style={styles.row}>
          <Icon family="Ionicons" name="disc-outline" size={16} style={styles.icon} />
          <ScrollView style={{ maxWidth: " 78%" }} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
            <Text style={styles.text} onPress={() => open(track.uri)}>
              {track.name}
            </Text>
          </ScrollView>
        </View>
        <View style={styles.row}>
          <Icon family="Ionicons" name="person-circle-outline" size={16} style={styles.icon} />
          <ScrollView style={{ maxWidth: "78%" }} horizontal showsHorizontalScrollIndicator={false} scrollEnabled={true}>
            {track.artists.map((artist, index) => (
              <Text key={index} style={styles.text} onPress={() => open(artist.uri)} numberOfLines={1}>
                  {artist.name}{index < track.artists.length - 1 ? ', ' : ''}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  text: {
    fontSize: 14
  }
});
