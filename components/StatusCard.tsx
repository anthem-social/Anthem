import { TouchableOpacity, StyleSheet, Image, Linking, ScrollView, Animated, Easing, Dimensions } from 'react-native';
import { Card, Status } from '@/types';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useRef, useState } from 'react';
import { playUri } from '@/api/spotify';

type Props = {
  card: Card;
  status: Status;
}

export default function StatusCard({ card, status }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const scrollX = new Animated.Value(0);
    var animation: Animated.CompositeAnimation;
    var sequence: Animated.CompositeAnimation;

    const start = () => {
      scrollX.setValue(0);
      animation = Animated.timing(scrollX, {
        toValue: width,
        duration: width * 16,
        easing: Easing.linear,
        useNativeDriver: true
      });
      sequence = Animated.sequence([
        Animated.delay(2000),
        animation
      ]);
      Animated.loop(sequence).start();
    }

    start();

    const listener = scrollX.addListener(({ value }) => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ x: value, animated: false });
      }
    });

    return () => {
      if (animation) {
        animation.stop();
      }
      scrollX.removeListener(listener);
    }
  }, [width]);

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

  const play = async (uri: string) => {
    await playUri(uri);
  }

  const profile = (userId: string) => {
    console.log('Opening profile for ' + userId);
  }

  const open = async (uri: string) => {
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
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
              onContentSizeChange={(w) => setWidth(w)}
            >
              <ThemedText style={styles.text} onPress={() => open(status.track.album.uri)}>
                {status.track.name}
              </ThemedText>
              <ThemedText style={styles.text}> - </ThemedText>
              {status.track.artists.map((artist, index) => (
                <ThemedText key={index} style={styles.text} onPress={() => open(artist.uri)}>
                  {artist.name}{index < status.track.artists.length - 1 ? ', ' : ''}
                </ThemedText>
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.play}>
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
    paddingLeft: 3,
    paddingTop: 4
  },
  card: {
    gap: 18,
    padding: 8
  },
  col: {
    flexDirection: 'column',
    gap: 12
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
  play: {
    marginLeft: 'auto'
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 14
  }
});
