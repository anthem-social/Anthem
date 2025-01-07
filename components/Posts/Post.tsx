import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@/types";
import { ReactNode, useState } from "react";
import { Image } from "react-native";
import { Icon, Text, View } from "@/components/Themed";
import React from "react";

type Props = {
    card: Card;
    children: ReactNode;
}

export function Post({card, children }: Props) {
  const [liked, setLiked] = useState(false);

  const comment = (postId: string) => {
    console.log("Commenting on post");
  }
  
  const toggleLike = (postId: string) => {
    var previous = liked;

    if (previous) {
      console.log("Unliked");
    }
    else {
      console.log("Liked");
    }

    setLiked(!previous);
  }

  const profile = (userId: string) => {
    console.log("Opening profile");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => profile(card.userId)}>
        <View style={[styles.row, styles.card]}>
          <Image source={{ uri: card.pictureUrl }} style={styles.picture} />
          <Text style={styles.nickname}>
            {card.nickname}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.row}>
        {children}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.pair} onPress={() => toggleLike("")}>
          <Icon
            family="Ionicons"
            name={liked ? "heart" : "heart-outline"}
            size={22}
            style={styles.icon}
          />
          <Text style={styles.stats}>
            137k
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={() => comment("")}>
          <Icon family="Ionicons" name="chatbox-outline" darkColor={"white"} size={22} style={styles.icon} />
          <Text style={styles.stats}>
            4.8k
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { paddingLeft: 8, marginTop: 8 }]}>
        <TouchableOpacity onPress={() => profile(card.userId)}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            {card.nickname}
          </Text>
        </TouchableOpacity>
        <Text style={styles.caption}>
          This would be the caption of the post.
        </Text>
      </View>
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
    marginLeft: 6,
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
    marginVertical: 8,
    borderTopWidth: 1,
    borderColor: "#444444",
    paddingTop: 6,
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
    flexDirection: "row",
  },
  stats: {
    fontSize: 14,
  }
});
