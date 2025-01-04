import { TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Easing, Dimensions } from 'react-native';
import { Card, Status } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { playUri } from '@/api/spotify';
import { TrackCard } from '@/components/Core/TrackCard';
import { Text, View, Icon } from '@/components/Themed';

type Props = {
  card: Card;
  status: Status;
}

export function ChatCard({ card, status }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  var width: number = 0;

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
  }, []);

  const difference: number = new Date().getUTCSeconds() - new Date(status.lastChanged).getUTCSeconds();
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

  return (
    <TouchableOpacity onPress={() => chat(card.userId)}> 
      <View style={[styles.row, styles.card]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Image source={{ uri: card.pictureUrl }} style={[styles.picture, { borderColor: color}]} />
        </TouchableOpacity>
        <View style={styles.col}>
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
          <View style={[styles.row, { maxWidth: Dimensions.get('window').width - 160 }]}>
            <TrackCard {...status.track} />
          </View>
        </View>
        <View style={styles.play}>
          <Icon family="MaterialIcons" name="play-arrow" size={34} onPress={() => play(status.track.uri)}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 18,
    padding: 8
  },
  col: {
    flexDirection: 'column',
    gap: 12
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 3,
    paddingTop: 4
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
