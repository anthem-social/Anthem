import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/types';
import { ReactNode } from 'react';
import { Image } from 'react-native';
import { Text, View } from '@/components/Themed';

type Props = {
    card: Card;
    children: ReactNode;
}

export default function Post({card, children }: Props) {
  const profile = (userId: string) => {
    console.log("Opening profile: " + userId);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.card]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Image source={{ uri: card.pictureUrl }} style={styles.picture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {children}
      </View>
      <View style={styles.row}>
        <Text>
          Comments and likes here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 20,
    padding: 4,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1
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
  }
});
