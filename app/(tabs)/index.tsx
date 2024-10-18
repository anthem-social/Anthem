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