import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useDailyProgress, useUserSettings } from '../../hooks/useStorage';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const { progress } = useDailyProgress();
  const { settings } = useUserSettings();

  const today = new Date().toISOString().split('T')[0];
  const todayProgress = progress.find(p => p.date === today) || {
    sessionsCompleted: 0,
    cardsLearned: 0,
  };

  const goalProgress = settings?.dailySessionGoal
    ? (todayProgress.sessionsCompleted / settings.dailySessionGoal) * 100
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Animated.Text 
            entering={FadeInDown.delay(200)} 
            style={styles.welcomeText}>
            Welcome Back!
          </Animated.Text>
          <Animated.Text 
            entering={FadeInDown.delay(400)} 
            style={styles.subtitle}>
            Ready for today's reading session?
          </Animated.Text>
        </View>
        
        <Link href="/tutorial" asChild>
          <Pressable style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color="#4B5563" />
          </Pressable>
        </Link>
      </View>

      <View style={[styles.content, { maxWidth: width > 1200 ? 1000 : width }]}>
        <Animated.View 
          entering={FadeInDown.delay(600)} 
          style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#FF4B4B20', '#FFFFFF']}
              style={styles.statGradient}
            />
            <View style={[styles.statIcon, { backgroundColor: '#FF4B4B' }]}>
              <Ionicons name="time" size={24} color="white" />
            </View>
            <Text style={styles.statNumber}>{todayProgress.sessionsCompleted}</Text>
            <Text style={styles.statLabel}>Sessions Today</Text>
            {settings?.dailySessionGoal && (
              <Text style={styles.statGoal}>
                Goal: {settings.dailySessionGoal} sessions
              </Text>
            )}
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(goalProgress, 100)}%` }
                ]} 
              />
            </View>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#3B82F620', '#FFFFFF']}
              style={styles.statGradient}
            />
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="book" size={24} color="white" />
            </View>
            <Text style={styles.statNumber}>{todayProgress.cardsLearned}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
            <Text style={styles.statGoal}>Keep it up!</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800)}>
          <Link href="/cards" asChild>
            <Pressable>
              <LinearGradient
                colors={['#FF4B4B', '#FF6B6B']}
                style={styles.startButton}>
                <View style={styles.buttonContent}>
                  <View style={styles.playIconContainer}>
                    <Ionicons name="play" size={24} color="white" />
                  </View>
                  <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonTitle}>Start Session</Text>
                    <Text style={styles.buttonSubtitle}>
                      {settings?.cardDisplayDuration || 5} seconds per card
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  helpButton: {
    padding: 12,
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
    alignSelf: 'center',
    width: '100%',
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  statGoal: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4B4B',
    borderRadius: 2,
  },
  startButton: {
    borderRadius: 24,
    padding: 4,
    shadowColor: '#FF4B4B',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  playIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});