import React, { useEffect, useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { View, Text, Button } from "@/components/Themed";
import { AnthemView } from "@/components/Core";

interface WelcomeProps {
  onPress: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({ onPress }) => {
  const [spotifyIsInstalled, setSpotifyInstalled] = useState(false);
  const [spotifyIsOpen, setSpotifyIsOpen] = useState(false);

  useEffect(() => {
    async function gatherInfo() {
      const isInstalled = await Linking.canOpenURL("spotify://");
      // console.log("isInstalled", isInstalled);
      setSpotifyInstalled(isInstalled);

      if (!isInstalled) {
        return;
      }

      const initialUrl = await Linking.getInitialURL();

      if (initialUrl == null) {
        return;
      }

      const isOpen = initialUrl.includes("spotify:");
      setSpotifyIsOpen(isOpen);
    }

    gatherInfo();
  }, []);

  return (
    <AnthemView>
      <View style={styles.container}>
        <Text>Welcom to Anthem!</Text>
        <Button title="Connect your Spotify account to continue" onPress={onPress} />
      </View>
    </AnthemView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  }
});
  
export default WelcomeScreen;
