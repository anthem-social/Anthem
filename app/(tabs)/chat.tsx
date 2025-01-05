import { StyleSheet } from 'react-native';
import { Card, Status, Track } from '@/types';
import { Icon, View } from '@/components/Themed';
import { AnthemView, ChatCard } from '@/components/Core';
import { useEffect, useRef, useState } from 'react';

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
  const ws = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://wda44qensj.execute-api.us-east-1.amazonaws.com/production?userId=schreineravery-us");

    ws.current.onopen = () => {
      console.log("Connected!");
    }

    ws.current.onmessage = (e) => {
      console.log("Message:\n" + e.data);
      var status: Status = JSON.parse(e.data);
      setStatus(status);
    }

    ws.current.onerror = (e) => {
      console.error("Error in websocket: " + e);
    }

    ws.current.onclose = (e) => {
      console.log("Disconnected: " + e.code + " " + e.reason + " " + e.wasClean);
    }

    return () => {
      ws.current?.close();
    }
  }, []);
  
  return (
    <AnthemView>
      <View style={styles.header}>
        <Icon family="MaterialIcons" name="add" size={30} />
      </View>
      <View style={styles.hr} />
      <ChatCard
        card={mockCard}
        status={status ?? mockStatus}
      />
      <View style={styles.hr} />
      {/* <ChatCard
        card={mockCard}
        status={status ?? mockStatus}
      />
      <View style={styles.hr} />
      <ChatCard
        card={mockCard}
        status={status ?? mockStatus}
      />
      <View style={styles.hr} /> */}
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
