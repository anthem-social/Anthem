import { StyleSheet } from 'react-native';
import { Card, Status, Track } from '@/types';
import { Icon, View } from '@/components/Themed';
import { AnthemView, StatusCard } from '@/components/Core';

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

export default function Chat() {
  return (
    <AnthemView>
      <View style={styles.header}>
        <Icon family="MaterialIcons" name="add" size={30} />
      </View>
      <View style={styles.hr} />
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <View style={styles.hr} />
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <View style={styles.hr} />
      <StatusCard
        card={mockCard}
        status={mockStatus}
      />
      <View style={styles.hr} />
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
