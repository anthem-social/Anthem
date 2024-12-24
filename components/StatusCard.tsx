import { TouchableOpacity, StyleSheet, Image, Linking, ScrollView, Animated, Easing } from 'react-native';
import { Card, Status, Track } from '@/types';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useRef } from 'react';

type Props = {
  card: Card;
  status: Status;
}

export default function StatusCard({ card, status }: Props) {
  const difference: number = new Date().getUTCSeconds() - status.lastChanged.getUTCSeconds();
  var color: string;
  if (difference < 300) {
    color = 'green';
  }
  else {
    color = 'grey';
  }

  const chat = (userId: string) => {
    console.log('Opening DM for ' + userId);
  }

  const play = (uri: string) => {
    console.log('Playing ' + uri);
  }

  const profile = (userId: string) => {
    console.log('Opening profile for ' + userId);
  }

  const spotify = async (uri: string) => {
    await Linking.openURL(uri);
  }

  return (
    <TouchableOpacity onPress={() => chat(card.userId)}> 
      <ThemedView style={[styles.row, styles.card]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Image source={{ uri: card.pictureUrl }} style={[styles.picture, { borderColor: color}]} />
        </TouchableOpacity>
        <ThemedView style={styles.col}>
          <ThemedText style={styles.alias}>
            {card.alias}
          </ThemedText>
          <ThemedView style={[styles.row, { borderColor: 'red', borderWidth: 0, maxWidth: 260 }]}>
            <Icon style={styles.equalizer} name="equalizer" size={20} color={'grey'} />
            <ScrollView horizontal={true} style={[{maxWidth: 200}]}>
              <ThemedText style={styles.text} onPress={() => spotify(status.track.uri)}>
                {status.track.name}
              </ThemedText>
              <ThemedText style={styles.text}> - </ThemedText>
              {status.track.artists.map((artist, index) => (
                <ThemedText key={index} style={styles.text} onPress={() => spotify(artist.uri)}>
                  {artist.name}{index < status.track.artists.length - 1 ? ', ' : ''}
                </ThemedText>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={[ { borderColor: 'blue', borderWidth: 0 } ]}>
          <Icon name="play-arrow" size={34} color={'grey'} onPress={() => play(status.track.uri)}/>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  alias: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 3
  },
  card: {
    gap: 18,
    padding: 8
  },
  col: {
    flexDirection: 'column',
    gap: 18
  },
  equalizer: {
    paddingRight: 3,
    paddingTop: 1
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 14
  }
});
