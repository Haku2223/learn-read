import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Platform } from 'react-native';

const WELCOME_SHOWN_KEY = '@BabyReading:welcomeShown';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
    // Set default orientation to portrait on native platforms only
    if (Platform.OS !== 'web') {
      try {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      } catch (error) {
        console.warn('Screen orientation lock not available:', error);
      }
    }
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize AsyncStorage with default values if needed
      const welcomeShown = await AsyncStorage.getItem(WELCOME_SHOWN_KEY);
      
      if (!welcomeShown) {
        // First time launch
        await AsyncStorage.setItem(WELCOME_SHOWN_KEY, 'false');
      }
      
      setIsInitialized(true);
    } catch (error) {
      // If there's an error, we'll still initialize the app but log the error
      console.error('Error during app initialization:', error);
      setIsInitialized(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}