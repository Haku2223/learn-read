import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const tutorialSteps = [
  {
    title: 'Welcome to Baby Reading',
    description:
      'Learn how to teach your baby to read using the proven Glenn Doman method.',
    icon: 'book',
    color: '#FF4B4B',
  },
  {
    title: 'Daily Sessions',
    description:
      'Conduct 3-15 short sessions daily. Each session shows carefully selected words.',
    icon: 'time',
    color: '#3B82F6',
  },
  {
    title: 'Word Cards',
    description:
      "Large, clear words in red text help capture your baby's attention.",
    icon: 'card',
    color: '#10B981',
  },
  {
    title: 'Track Progress',
    description:
      "Monitor your baby's learning journey with detailed progress tracking.",
    icon: 'stats-chart',
    color: '#8B5CF6',
  },
];

export default function TutorialScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const { width } = useWindowDimensions();

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.closeButton} 
        onPress={() => router.back()}
        hitSlop={20}>
        <Ionicons name="close" size={24} color="#6B7280" />
      </Pressable>

      <Animated.View
        entering={SlideInRight}
        exiting={SlideOutLeft}
        key={currentStep}
        style={[styles.content, { width }]}>
        <LinearGradient
          colors={[`${tutorialSteps[currentStep].color}20`, '#F9FAFB']}
          style={styles.gradient}
        />
        
        <View style={[styles.iconContainer, { backgroundColor: tutorialSteps[currentStep].color }]}>
          <Ionicons
            name={tutorialSteps[currentStep].icon as any}
            size={40}
            color="white"
          />
        </View>

        <Text style={styles.title}>{tutorialSteps[currentStep].title}</Text>
        <Text style={styles.description}>
          {tutorialSteps[currentStep].description}
        </Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {tutorialSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && [styles.activeDot, { backgroundColor: tutorialSteps[currentStep].color }],
              ]}
            />
          ))}
        </View>

        <Pressable 
          style={[styles.nextButton, { backgroundColor: tutorialSteps[currentStep].color }]} 
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 400,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});