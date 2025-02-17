import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const WELCOME_SHOWN_KEY = '@BabyReading:welcomeShown';

export default function WelcomeScreen() {
  useEffect(() => {
    markWelcomeAsShown();
  }, []);

  const markWelcomeAsShown = async () => {
    try {
      await AsyncStorage.setItem(WELCOME_SHOWN_KEY, 'true');
    } catch (error) {
      console.error('Error saving welcome state:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?q=80&w=2070' }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'transparent']}
        style={styles.gradient}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Baby Reading</Text>
          <Text style={styles.subtitle}>
            Teach your baby to read using the proven Glenn Doman method
          </Text>
        </View>

        <View style={styles.features}>
          <Feature icon="book" text="Research-based learning approach" />
          <Feature icon="time" text="Quick, engaging daily sessions" />
          <Feature icon="stats-chart" text="Track your baby's progress" />
        </View>

        <View style={styles.buttons}>
          <Pressable 
            style={styles.startButton}
            onPress={() => router.push('/(tabs)')}>
            <Text style={styles.startButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </Pressable>

          <Link href="/tutorial" asChild>
            <Pressable style={styles.tutorialButton}>
              <Text style={styles.tutorialButtonText}>View Tutorial</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

function Feature({ icon, text }: { icon: any; text: string }) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureIcon}>
        <Ionicons name={icon} size={24} color="#FF4B4B" />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 40,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: 'white',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
    lineHeight: 28,
    maxWidth: '60%',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  features: {
    marginVertical: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureText: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttons: {
    marginTop: 'auto',
    gap: 16,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4B4B',
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
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  tutorialButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tutorialButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});