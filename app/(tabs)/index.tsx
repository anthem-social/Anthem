import { FlatList, StyleSheet, View, Text, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const feedData = [
  {
    id: '1',
    user: 'User1',
    content: 'This is the first post',
  },
  {
    id: '2',
    user: 'User2',
    content: 'This is the second post',
  },
  // Add more items as needed
];

export default function TimelineFeed() {
  // useEffect(() => {
  //   ws.current = new WebSocket("wss://wda44qensj.execute-api.us-east-1.amazonaws.com/development?userId=schreineravery-us");
  //   ws.current = new WebSocket("wss://wda44qensj.execute-api.us-east-1.amazonaws.com/production?userId=schreineravery-us");

  //   ws.current.onopen = () => {
  //     console.log("Connected!");
  //   }

  //   ws.current.onmessage = (e) => {
  //     console.log("Message:\n" + e.data);
  //     var status: Status = JSON.parse(e.data);
  //     setTrackUri(status.track.uri);
  //     setAlbumUri(status.track.album.uri);
  //   }

  //   ws.current.onerror = (e) => {
  //     console.error("Error in websocket: " + e);
  //   }

  //   ws.current.onclose = (e) => {
  //     console.log("Disconnected: " + e.code + " " + e.reason + " " + e.wasClean);
  //   }

  //   return () => {
  //     ws.current?.close();
  //   }
  // }, []);
  
  const renderItem = ({ item }) => (
    <ThemedView style={styles.feedItem}>
      <ThemedText type="defaultSemiBold">{item.user}</ThemedText>
      <Text>{item.content}</Text>
      {item.image && <Image source={item.image} style={styles.feedImage} />}
    </ThemedView>
  );

  return (
    <FlatList
      data={feedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  feedItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  feedImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
  },
});