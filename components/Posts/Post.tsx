import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@/types';
import { ReactNode } from 'react';
import { Image } from 'react-native';
import { Icon, Text, View } from '@/components/Themed';

type Props = {
    card: Card;
    children: ReactNode;
}

export function Post({card, children }: Props) {
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
      <View style={styles.buttons}>
        <Icon family="Ionicons" name="heart-outline" size={22} style={styles.icon} />
        <Text style={styles.stats}>
          137k
        </Text>
        <Icon family="Ionicons" name="chatbox-outline" size={22} style={styles.icon} />
        <Text style={styles.stats}>
          4.1k
        </Text>
        <Icon family="Ionicons" name="share-social-outline" size={22} style={styles.icon} />
      </View>
      <View style={[styles.row, { paddingLeft: 8, marginTop: 6 }]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            {card.nickname}
          </Text>
        </TouchableOpacity>
        <Text style={styles.caption}>
          This would be the caption of the post.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 10,
    marginRight: 4
  },
  caption: {
    fontSize: 14,
    marginLeft: 6,
  },
  card: {
    gap: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 10
  },
  container: {
    flex: 1,
    marginVertical: 12
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 6
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picture: {
    width: 42,
    height: 42,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'grey'
  },
  row: {
    flexDirection: 'row',
  },
  stats: {
    fontSize: 14,
  }
});
