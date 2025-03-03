import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Icon } from './Themed';

type Props = {
  text: string;
  duration: number;
  type: "error" | "info" | "success";
}

export function Alert({ text, duration, type }: Props) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start(() => setVisible(false));
  }, [duration]);

  if (!visible) return null;

  return (
    <View style={[styles.container, styles[type]]}>
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Icon family="Ionicons" name="close" size={28}/>
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progress, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%']}) }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    margin: 10
  },
  text: {
    padding: 8,
    color: "white",
    fontSize: 16,
  },
  progress: {
    backgroundColor: '#fff',
    height: '100%',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    height: 1,
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: 2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10
  },
  error: {
    backgroundColor: 'red',
  },
  info: {
    backgroundColor: 'blue',
  },
  success: {
    backgroundColor: 'green',
  },
});
