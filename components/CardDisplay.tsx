import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  SlideInLeft,
  SlideOutRight,
  runOnJS
} from 'react-native-reanimated';
import { 
  Gesture,
  GestureDetector 
} from 'react-native-gesture-handler';
import { CardDisplayProps } from '../types/cards';

const { width } = Dimensions.get('window');
const CARD_PADDING = Platform.OS === 'web' ? 100 : 80;
const NAV_BUTTON_WIDTH = 100;
const HORIZONTAL_SPACING = 40;
const SWIPE_THRESHOLD = 50;

export default function CardDisplay({ 
  card,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: CardDisplayProps) {
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > SWIPE_THRESHOLD) {
        if (event.velocityX > 0 && !isFirst) {
          setDirection('right');
          runOnJS(onPrevious)();
        } else if (event.velocityX < 0 && !isLast) {
          setDirection('left');
          runOnJS(onNext)();
        }
      }
    });

  const prevButtonProps = Platform.select({
    native: {
      accessibilityRole: 'button',
      accessibilityLabel: 'Previous card',
      accessibilityHint: 'Show the previous word card',
    },
    default: {
      role: 'button',
      'aria-label': 'Previous card',
    },
  });

  const nextButtonProps = Platform.select({
    native: {
      accessibilityRole: 'button',
      accessibilityLabel: 'Next card',
      accessibilityHint: 'Show the next word card',
    },
    default: {
      role: 'button',
      'aria-label': 'Next card',
    },
  });

  const cardProps = Platform.select({
    native: {
      accessibilityRole: 'text',
      accessibilityLabel: `Word card showing ${card.word}`,
    },
    default: {
      role: 'text',
      'aria-label': `Word card showing ${card.word}`,
    },
  });

  const handlePrevious = () => {
    if (!isFirst) {
      setDirection('right');
      onPrevious();
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setDirection('left');
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        {...prevButtonProps}
        style={[styles.navButton, isFirst && styles.disabled]}
        onPress={handlePrevious}
        disabled={isFirst}>
        <Animated.View
          entering={FadeIn}
          style={styles.navButtonContent}>
          <Ionicons 
            name="chevron-back" 
            size={50}
            color={isFirst ? '#D1D5DB' : '#FF4B4B'} 
          />
        </Animated.View>
      </Pressable>

      <GestureDetector gesture={panGesture}>
        <View style={styles.cardContainer}>
          <Animated.View
            entering={direction === 'left' ? SlideInRight : SlideInLeft}
            exiting={direction === 'left' ? SlideOutLeft : SlideOutRight}
            style={styles.card}
            {...cardProps}>
            <Animated.Text 
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.wordText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {card.word.toUpperCase()}
            </Animated.Text>
          </Animated.View>
        </View>
      </GestureDetector>

      <Pressable
        {...nextButtonProps}
        style={[styles.navButton, isLast && styles.disabled]}
        onPress={handleNext}
        disabled={isLast}>
        <Animated.View
          entering={FadeIn}
          style={styles.navButtonContent}>
          <Ionicons 
            name="chevron-forward" 
            size={50}
            color={isLast ? '#D1D5DB' : '#FF4B4B'} 
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: HORIZONTAL_SPACING,
    backgroundColor: '#F9FAFB',
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: HORIZONTAL_SPACING,
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: CARD_PADDING,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 2,
  },
  wordText: {
    fontSize: 180,
    fontWeight: '800',
    color: '#FF0000',
    textAlign: 'center',
    width: '100%',
    letterSpacing: 12,
    includeFontPadding: false,
    textTransform: 'uppercase',
  },
  navButton: {
    width: NAV_BUTTON_WIDTH,
    height: NAV_BUTTON_WIDTH,
    borderRadius: NAV_BUTTON_WIDTH / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});