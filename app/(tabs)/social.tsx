import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import AnthemView from '@/components/AnthemView';
import StatusCard from '@/components/StatusCard';
import { Card, Status, Track } from '@/types';
import { ThemedIcon } from '@/components/ThemedIcon';

const mockCard: Card = {
  userId: 'schreineravery-us',
  nickname: 'Avery',
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
      <ThemedView style={styles.header}>
        <ThemedIcon name="add" size={30} />
      </ThemedView>
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
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <ThemedView style={styles.hr} />
    </AnthemView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
    marginLeft: 'auto'
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginHorizontal: 4
  }
});
