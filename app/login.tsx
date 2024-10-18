import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { auth } from 'react-native-spotify-remote';

interface LoginScreenProps {
  onPress: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
        <ThemedText>Welcom to Anthem!</ThemedText>
        <Button title="Sign in with Spotify" onPress={onPress} />
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
  
export default LoginScreen;