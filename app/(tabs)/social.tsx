import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AnthemView from '@/components/AnthemView';
import StatusCard from '@/components/StatusCard';
import { Card, Status, Track } from '@/types';

const mockCard: Card = {
  userId: 'schreineravery-us',
  alias: 'Avery',
  pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f'
}

const mockTrack: Track = {
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

const mockStatus: Status = {
  userId: 'schreineravery-us',
  track: mockTrack,
  lastChanged: new Date()
}

export default function Social() {
  return (
    <AnthemView>
      <ThemedView style={styles.hr} />
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <ThemedView style={styles.hr} />
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <ThemedView style={styles.hr} />
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
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginHorizontal: 4
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
