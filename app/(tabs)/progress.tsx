import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';
import { format, subDays, isSameDay } from 'date-fns';
import { useDailyProgress, useWordCards } from '../../hooks/useStorage';

type TimeRange = '7days' | '30days' | 'all';

export default function ProgressScreen() {
  const { width } = useWindowDimensions();
  const { progress } = useDailyProgress();
  const { cards } = useWordCards();
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');

  const chartData = useMemo(() => {
    const today = new Date();
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    
    return Array.from({ length: days }).map((_, index) => {
      const date = subDays(today, days - 1 - index);
      const dayProgress = progress.find(p => 
        isSameDay(new Date(p.date), date)
      ) || { sessionsCompleted: 0, cardsLearned: 0 };
      
      return {
        date: format(date, 'MMM d'),
        sessions: dayProgress.sessionsCompleted,
        cards: dayProgress.cardsLearned,
      };
    });
  }, [progress, timeRange]);

  const stats = useMemo(() => {
    const totalSessions = progress.reduce((sum, day) => sum + day.sessionsCompleted, 0);
    const totalCards = cards.length;
    const streak = progress.reduce((count, day) => {
      if (day.sessionsCompleted >= 3) return count + 1;
      return 0;
    }, 0);

    return { totalSessions, totalCards, streak };
  }, [progress, cards]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Track your learning journey</Text>
      </View>

      <View style={styles.content}>
        {/* Stats Overview */}
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#FF4B4B20', '#FFFFFF']}
              style={styles.statGradient}
            />
            <View style={[styles.statIcon, { backgroundColor: '#FF4B4B10' }]}>
              <Ionicons name="time" size={24} color="#FF4B4B" />
            </View>
            <Text style={styles.statNumber}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#3B82F620', '#FFFFFF']}
              style={styles.statGradient}
            />
            <View style={[styles.statIcon, { backgroundColor: '#3B82F610' }]}>
              <Ionicons name="book" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>{stats.totalCards}</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#10B98120', '#FFFFFF']}
              style={styles.statGradient}
            />
            <View style={[styles.statIcon, { backgroundColor: '#10B98110' }]}>
              <Ionicons name="flame" size={24} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </Animated.View>

        {/* Session History Chart */}
        <Animated.View 
          entering={FadeInDown.delay(400)}
          style={styles.chartCard}>
          <LinearGradient
            colors={['#8B5CF620', '#FFFFFF']}
            style={styles.chartGradient}
          />
          <Text style={styles.chartTitle}>Session History</Text>
          
          <View style={styles.timeRangeButtons}>
            <Pressable
              style={[styles.timeButton, timeRange === '7days' && styles.timeButtonActive]}
              onPress={() => setTimeRange('7days')}>
              <Text style={[styles.timeButtonText, timeRange === '7days' && styles.timeButtonTextActive]}>
                7 Days
              </Text>
            </Pressable>
            <Pressable
              style={[styles.timeButton, timeRange === '30days' && styles.timeButtonActive]}
              onPress={() => setTimeRange('30days')}>
              <Text style={[styles.timeButtonText, timeRange === '30days' && styles.timeButtonTextActive]}>
                30 Days
              </Text>
            </Pressable>
            <Pressable
              style={[styles.timeButton, timeRange === 'all' && styles.timeButtonActive]}
              onPress={() => setTimeRange('all')}>
              <Text style={[styles.timeButtonText, timeRange === 'all' && styles.timeButtonTextActive]}>
                All Time
              </Text>
            </Pressable>
          </View>

          <View style={styles.chart}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              width={Math.min(width - 80, 600)}
              height={300}>
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  tickLabels: { angle: -45, fontSize: 10, padding: 20 }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => Math.round(t)}
              />
              <VictoryBar
                data={chartData}
                x="date"
                y="sessions"
                style={{
                  data: {
                    fill: "#8B5CF6",
                    width: 20
                  }
                }}
              />
              <VictoryLine
                data={chartData}
                x="date"
                y="cards"
                style={{
                  data: { stroke: "#FF4B4B", strokeWidth: 2 }
                }}
              />
            </VictoryChart>
          </View>

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={styles.legendText}>Sessions</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF4B4B' }]} />
              <Text style={styles.legendText}>New Words</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 40,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    padding: 20,
    paddingTop: 0,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
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
  },
  chartCard: {
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
  chartGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 24,
  },
  timeRangeButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  timeButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  timeButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  timeButtonText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: 'white',
  },
  chart: {
    alignItems: 'center',
    marginBottom: 24,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
});