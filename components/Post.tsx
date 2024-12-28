import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from "./ThemedView";
import { Card } from '@/types';
import { ReactNode } from 'react';
import { Image } from 'react-native';
import { ThemedText } from './ThemedText';

type Props = {
    card: Card;
    children: ReactNode;
}

export default function Post({card, children }: Props) {
  const profile = (userId: string) => {
    console.log("Opening profile: " + userId);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.row, styles.card]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Image source={{ uri: card.pictureUrl }} style={styles.picture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <ThemedText style={styles.nickname}>
            {card.nickname}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.row}>
        {children}
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText>
          Comments and likes here
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 20,
    padding: 4,
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  nickname: {
    fontSize: 22
  },
  picture: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'grey'
  },
  row: {
    flexDirection: 'row',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1
  }
});
