import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AnthemView from '@/components/AnthemView';
import { Track, User } from '@/types';
import { ThemedView } from '@/components/ThemedView';

const anthem: Track = {
  uri: 'spotify:track:3KkXRkHbMCARz0aVfEt68P',
  name: 'Sunflower - Into the Spider-Verse',
  artists: [
    {
      uri: 'spotify:artist:3TVXtAsR1Inumwj472S9r4',
      name: 'Post Malone',
    },
    {
      uri: 'spotify:artist:1uNFoZAHBGtllmzznpCI3s',
      name: 'Swae Lee',
    },
  ],
  album: {
    uri: 'spotify:album:4yP0hdKOZPNshxUOjY0cZj',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f'
  }
}

const mock: User = {
  id: 'schreineravery-us',
  alias: 'Avery',
  pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
  bio: 'the creator',
  anthem: anthem,
  joined: new Date(),
  followers: ['schreineravery-us'],
  following: ['schreineravery-us'],
  friends: ['schreineravery-us'],
}

type Props = {
  user: User;
  isCurrentUser: boolean;
}

export default function Profile({ user = mock, isCurrentUser }: Props) {

  return (
    <AnthemView>
      <ThemedView style={styles.row}>
        <Image source={{ uri: user.pictureUrl }} style={styles.picture} />
        <ThemedView style={styles.col}>
          <ThemedText style={styles.alias}>{user.alias}</ThemedText>
          <ThemedText style={styles.bio}>{user.bio}</ThemedText>
        </ThemedView>
      </ThemedView>
    </AnthemView>
  );
}

const styles = StyleSheet.create({
  alias: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  bio: {
    fontSize: 12,
    color: 'grey'
  },
  col: {
    flexDirection: 'column',
    gap: 2
  },
  container: {
    flex: 1
  },
  header: {
    borderBottomWidth: 12,
    borderBottomColor: 'red',
    borderStyle: 'solid',
  },
  joined: {
    fontSize: 12,
    color: 'grey',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 28
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  userId: {
    fontSize: 16,
    marginBottom: 16,
  },
});
