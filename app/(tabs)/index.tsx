import { FlatList, StyleSheet } from "react-native";
import { ContentType, PostCard, Track } from "@/types";
import { Button, View } from "@/components/Themed";
import { TrackPost } from "@/components/Posts"
import { useEffect, useState } from "react";
import { Post } from "@/components/Posts/Post";
import { Loading } from "@/components";
import { getFeed } from "@/api/users";

export default function TimelineFeed() {
  // const mockCard: Card = {
  //   userId: "schreineravery-us",
  //   nickname: "Avery",
  //   pictureUrl: "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f"
  // }

  // const mockTrack: TrackType = {
  //   uri: "spotify:track:3UDmHZcBTQp8Iu8droNtU1",
  //   name: "Revolution - Remastered 2009",
  //   artists: [
  //     {
  //       imageUrl: null,
  //       uri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2",
  //       name: "The Beatles",
  //     }
  //   ],
  //   album: {
  //     name: "The Beatles (Remastered)",
  //     uri: "spotify:album:1cTeNkeINtXiaMLlashAKs",
  //     imageUrl: "https://i.scdn.co/image/ab67616d0000b2736e3d3c964df32136fb1cd594"
  //   }
  // }
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [feed, setFeed] = useState<PostCard[]>([]);

  const fetchPage = async () => {
    try {
      setLoading(true);
      var results =  await getFeed(lastEvaluatedKey);

      if (results.IsFailure || results.Data == null) {
        console.error(results.ErrorMessage);
        return;
      }

      setFeed([...feed, ...results.Data.posts]);
      setLastEvaluatedKey(results.Data.lastEvaluatedKey);
      setLoading(false);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Fetch Feed" onPress={fetchPage} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={feed}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Post postCard={item}>
              {item.post.contentType == ContentType.Track && <TrackPost track={JSON.parse(item.post.content) as Track} />}
            </Post>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52
  }
});
