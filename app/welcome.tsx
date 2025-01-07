import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "@/components/Themed";

interface WelcomeProps {
  onPress: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
        <Text>Welcom to Anthem!</Text>
        <Button title="Connect your Spotify account to continue" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
export default WelcomeScreen;
