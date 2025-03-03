import { StyleSheet, TouchableOpacity } from "react-native";
import { PostCard } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { Image } from "react-native";
import { Icon, Text, View } from "@/components/Themed";
import React from "react";
import { createLike, removeLike } from "@/api/posts"

type Props = {
  children: ReactNode;
  postCard: PostCard;
}

export function Post(props: Props) {
  const [liked, setLiked] = useState(props.postCard.like ? true : false);
  const [likeCount, setLikeCount] = useState(props.postCard.post.totalLikes);
  const [likeId, setLikeId] = useState<string | null>(props.postCard.like ? props.postCard.like.id : null);
  const post = props.postCard.post;
  const card = props.postCard.card;

  const comment = (postId: string) => {
    console.log("Commenting on post");
  }

  const profile = (userId: string) => {
    console.log("Opening profile");
  }
  
  const toggleLike = async (postId: string) => {
    var isLiked = liked;
    setLiked(!isLiked);

    if (isLiked && likeId) {
      setLikeCount(likeCount - 1);
      var unlikeResponse = await removeLike(postId, likeId);

      if (unlikeResponse.IsFailure) {
        console.log("Failed to unlike post!");
        return;
      }

      setLikeId(null);
      console.log("Unliked");
    }
    else {
      setLikeCount(likeCount + 1);
      var likeResponse = await createLike(postId);

      if (likeResponse.IsFailure || !likeResponse.Data) {
        console.log("Failed to like post!");
        return;
      }

      setLikeId(likeResponse.Data.id);
      console.log("Liked");
    }
  }

  useEffect(() => {
    setLiked(likeId ? true : false);
  }, [likeId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => profile(card.userId)}>
        <View style={[styles.row, styles.card]}>
          <Image source={{ uri: card.pictureUrl! }} style={styles.picture} />
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        {props.children}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.pair} onPress={() => toggleLike(post.id)}>
          <Icon
            family="Ionicons"
            name={liked ? "heart" : "heart-outline"}
            size={22}
            style={styles.icon}
          />
          <Text style={styles.stats}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => comment("")}>
          <Icon family="Ionicons" name="chatbox-outline" darkColor={"white"} size={22} style={styles.icon} />
          <Text style={styles.stats}>
            {post.totalComments}
          </Text>
        </TouchableOpacity>
      </View>
      {post.caption && (
        <View style={[styles.row, { paddingLeft: 8, marginTop: 8}]}>
          <TouchableOpacity onPress={() => profile(card.userId)}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {card.nickname}
            </Text>
          </TouchableOpacity>
          <Text style={styles.caption}>
            {post.caption}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginLeft: "auto",
    marginTop: 12,
    marginRight: 12
  },
  caption: {
    fontSize: 14,
    marginLeft: 10,
    flexShrink: 1,
    flexWrap: "wrap",
    lineHeight: 20,
    paddingTop: 2
  },
  card: {
    gap: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 4,
    marginTop: 10
  },
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#444444",
    paddingTop: 6,
    paddingBottom: 14    
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 6,
    fontWeight: "bold"
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pair: {
    flexDirection: "row",
    alignItems: "center",
  },
  picture: {
    width: 42,
    height: 42,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "grey"
  },
  row: {
    flexDirection: "row"
  },
  stats: {
    fontSize: 14,
  }
});
