import { FlatList, StyleSheet, ViewToken } from "react-native";
import { ContentType, PostCard, Track } from "@/types";
import { Text, View } from "@/components/Themed";
import { TrackPost } from "@/components/Posts"
import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "@/components/Posts/Post";
import { getFeed } from "@/api/users";

export default function TimelineFeed() {
  const [allCaughtUp, setAllCaughtUp] = useState<boolean>(false);
  const [feed, setFeed] = useState<PostCard[]>([]);
  const [itemIdInView, setItemIdInView] = useState<string | null>(null);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getNextPage = async (lastEvaluatedKey: string | null) => {
    try {
      if (lastEvaluatedKey == null) {
        console.log("No more pages to fetch");
        return;
      }

      console.log("Fetching next page " + lastEvaluatedKey);

      var results =  await getFeed(lastEvaluatedKey);

      if (results.IsFailure || results.Data == null) {
        // TODO: Show error page
        console.error(results.ErrorMessage);
        return;
      }

      setFeed([...results.Data.posts, ...feed]);
      setLastEvaluatedKey(results.Data.lastEvaluatedKey);
    }
    catch (error) {
      console.error(error);
    }
  }

  const onViewableItemsChanged = (viewableItems: ViewToken[]) => {
    const viewableItemsIds = viewableItems.map((item) => item.key);
    console.log("Viewable items: " + viewableItemsIds);
    setItemIdInView(viewableItemsIds[0]);
  }

  const renderItem = useCallback(({ item }: { item: PostCard }) => {
    const inView = item.post.id == itemIdInView;
    return (
      <Post postCard={item}>
        {item.post.contentType == ContentType.Track && <TrackPost inView={inView} track={JSON.parse(item.post.content) as Track} />}
      </Post>
    );
  }
  , [itemIdInView]);

  const refresh = async () => {
    try {
      setRefreshing(true);
      setAllCaughtUp(false);
      setFeed([]);
      setLastEvaluatedKey(null);

      var results =  await getFeed(null);

      if (results.IsFailure || !results.Data) {
        // TODO: Show error page
        console.error(results.ErrorMessage);
        return;
      }

      if (results.Data.lastEvaluatedKey == null)
        setAllCaughtUp(true);
      
      setFeed(results.Data.posts);
      setLastEvaluatedKey(results.Data.lastEvaluatedKey);
      setRefreshing(false);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }
    , 2000);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={(postCard, _) => postCard.post.id}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={refresh}
        onEndReached={() => getNextPage(lastEvaluatedKey)}
        onEndReachedThreshold={0.2}
        onViewableItemsChanged={(item) => onViewableItemsChanged(item.viewableItems)}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
          minimumViewTime: 200
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Anthem</Text>
          </View>
        }
        ListFooterComponent={
          allCaughtUp ? (
            <Text style={styles.allCaughtUp}>You're all caught up!  🎉</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  allCaughtUp: {
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 20
  },
  container: {
    flex: 1,
    paddingTop: 50
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#444444",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    paddingTop: 2,
    paddingBottom: 8
  }
});
