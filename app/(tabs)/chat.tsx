import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Card, Status, Track } from "@/types";
import { Icon, View } from "@/components/Themed";
import { AnthemView, ChatCard } from "@/components/Core";
import { useEffect, useRef, useState } from "react";

const mockCard: Card = {
  userId: "schreineravery-us",
  nickname: "Avery",
  pictureUrl: "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f"
}

const mockTrack: Track = {
  uri: "spotify:track:3KkXRkHbMCARz0aVfEt68P",
  name: "Sunflower - Into the Spider-Verse",
  artists: [
    {
      imageUrl: null,
      uri: "spotify:artist:3TVXtAsR1Inumwj472S9r4",
      name: "Post Malone",
    },
    {
      imageUrl: null,
      uri: "spotify:artist:1uNFoZAHBGtllmzznpCI3s",
      name: "Swae Lee",
    },
  ],
  album: {
    imageUrl: "the album image url",
    name: "the album name",
    uri: "spotify:album:4yP0hdKOZPNshxUOjY0cZj",
  }
}

const mockStatus: Status = {
  userId: "schreineravery-us",
  track: mockTrack,
  lastChanged: new Date()
}

const statusWebsocketUrl = process.env.EXPO_PUBLIC_STATUS_WEBSOCKET_URL;
const userId = "schreineravery-us";

export default function Chat() {
  const ws = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`${statusWebsocketUrl}?userId=${userId}`);

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

  const handleSearch = () => {
    
    console.log("Searching...");
  }
  
  return (
    <AnthemView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon family="MaterialIcons" name="search" size={30} />
          </TouchableOpacity>
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
      </View>
    </AnthemView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "space-between"
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginHorizontal: 4
  }
});
