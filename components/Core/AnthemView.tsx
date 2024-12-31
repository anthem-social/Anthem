import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { View } from '@/components/Themed';

type Props = {
  children: ReactNode;
}

export function AnthemView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={styles.header} />
        <View style={styles.content}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 52,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 4,
    overflow: 'hidden',
  },
});
