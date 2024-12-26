import { Dimensions, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import AnthemView from '@/components/AnthemView';
import { Status, Track, User } from '@/types';
import { ThemedView } from '@/components/ThemedView';
import ScrollingTrack from '@/components/ScrolligTrack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { playUri } from '@/api/spotify';

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

// Limit to 110 chars
// Change alias to nickname
const mockUser: User = {
  id: 'schreineravery-us',
  alias: 'Avery',
  bio: 'the creator',
  pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f',
  anthem: anthem,
  joined: new Date(),
  followers: ['schreineravery-us'],
  following: ['schreineravery-us'],
  friends: ['schreineravery-us'],
}

const mockStatus: Status = {
  userId: 'schreineravery-us',
  track: anthem,
  lastChanged: new Date()
}

const play = async (uri: string) => {
    await playUri(uri);
}

export type Props = {
  status: Status,
  user: User,
  isCurrentUser: boolean
}

export default function Profile({ status = mockStatus, user = mockUser, isCurrentUser = true}: Props) {
  return (
    <AnthemView>
      <ThemedView style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
        <Icon name="more-horiz" size={30} color={'transparent'} />
        <ThemedText style={styles.alias}>
          {user.alias}
        </ThemedText>
        <Icon name="more-horiz" size={30} color={'grey'} />
      </ThemedView>
      <ThemedView style={styles.row}>
        <Image source={{ uri: user.pictureUrl }} style={styles.picture} />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.bio}>
          {user.bio}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={[styles.row, { marginBottom: 0, maxWidth: Dimensions.get('window').width - 50 }]}>
          <ScrollingTrack {...status.track} />
          <Icon name="play-arrow" size={24} color={'grey'} onPress={() => play(status.track.uri)}/>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedView style={styles.col}>
          <ThemedText>Active</ThemedText>
          <ThemedText>15m ago</ThemedText>
        </ThemedView>
        <ThemedView style={styles.col}>
          <ThemedText>Followers</ThemedText>
          <ThemedText>{user.followers.length}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.col}>
          <ThemedText>Following</ThemedText>
          <ThemedText>{user.following.length}</ThemedText>
        </ThemedView>
      </ThemedView>
    </AnthemView>
  );
}

const styles = StyleSheet.create({
  alias: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop: 8,
    textAlign: 'center',
    flex: 1
  },
  bio: {
    fontSize: 14
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  // menu: {
  //   marginLeft: 'auto'
  // },
  picture: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: 'grey',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  }
});
