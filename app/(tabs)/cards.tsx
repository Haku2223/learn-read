import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import CardDisplay from '../../components/CardDisplay';
import { useWordCards } from '../../hooks/useStorage';
import { generateNewCardSet } from '../../utils/cardSystem';
import { useUserSettings } from '../../hooks/useStorage';

export default function CardsScreen() {
  const { cards, loading, addCard, removeCard } = useWordCards();
  const { settings } = useUserSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const setOrientation = async () => {
      try {
        // Only attempt to lock orientation on native platforms
        if (Platform.OS !== 'web') {
          if (isFocused) {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE
            );
          } else {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT
            );
          }
        }
      } catch (error) {
        // Silently handle orientation errors
        console.warn('Screen orientation lock not available:', error);
      }
    };

    setOrientation();
  }, [isFocused]);

  useEffect(() => {
    const initializeCards = async () => {
      if (!loading && (!cards || cards.length === 0)) {
        // Initialize with new card set
        const newCardSet = generateNewCardSet(settings?.language || 'en');
        for (const card of newCardSet.cards) {
          await addCard(card);
        }
      }
    };

    initializeCards();
  }, [loading, cards, addCard, settings?.language]);

  const handleNext = () => {
    if (cards && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4B4B" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <CardDisplay
        card={cards[currentIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentIndex === 0}
        isLast={currentIndex === cards.length - 1}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});