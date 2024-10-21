import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

interface WelcomeProps {
  onPress: () => void;
}

const WelcomeScreen: React.FC<WelcomeProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
        <ThemedText>Welcom to Anthem!</ThemedText>
        <Button title="Connect your Spotify account to continue" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default WelcomeScreen;