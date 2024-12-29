import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Animated, Easing, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Track } from '@/types';
import { Linking } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

export default function ScrollingTrack(track : Track) {
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
    };

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
    };
  }, [width]);

  const open = async (uri: string) => {
    await Linking.openURL(uri);
  };

  return (
    <>
      <ThemedIcon style={styles.equalizer} name="equalizer" size={20} />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onContentSizeChange={(w) => setWidth(w)}
      >
        <ThemedText style={styles.text} onPress={() => open(track.album.uri)}>
          {track.name}{ ' - '}
        </ThemedText>
        {track.artists.map((artist, index) => (
          <ThemedText key={index} style={styles.text} onPress={() => open(artist.uri)}>
              {artist.name}{index < track.artists.length - 1 ? ', ' : ''}
          </ThemedText>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  equalizer: {
    paddingRight: 3,
    paddingTop: 1
  },
  text: {
    fontSize: 14
  }
});
