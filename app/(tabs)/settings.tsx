import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useUserSettings, useWordCards } from '../../hooks/useStorage';
import SupportForm from '../../components/SupportForm';
import { LanguageCode } from '../../types/language';

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'sv', name: 'Swedish' },
];

export default function SettingsScreen() {
  const { settings, updateSettings, loading } = useUserSettings();
  const { cards, addCard } = useWordCards();
  const [newWord, setNewWord] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showSupportForm, setShowSupportForm] = useState(false);

  const handleSessionGoalChange = (value: string) => {
    const goal = parseInt(value);
    if (!isNaN(goal) && goal > 0 && goal <= 15) {
      updateSettings({ dailySessionGoal: goal });
    }
  };

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value);
    if (!isNaN(duration) && duration >= 3 && duration <= 10) {
      updateSettings({ cardDisplayDuration: duration });
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    updateSettings({ notificationsEnabled: value });
  };

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    updateSettings({ language: code as LanguageCode });
  };

  const handleAddWord = () => {
    if (newWord.trim()) {
      const word = newWord.trim().toUpperCase();
      if (!cards.some(card => card.word === word)) {
        addCard({
          id: Math.random().toString(36).substr(2, 9),
          word,
          createdAt: new Date().toISOString(),
          lastShownAt: new Date().toISOString(),
          timesShown: 0,
          language: selectedLanguage as LanguageCode,
        });
        setNewWord('');
      }
    }
  };

  if (loading || !settings) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your learning experience</Text>
      </View>

      <View style={styles.content}>
        {/* Session Settings */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <LinearGradient
            colors={['#FF4B4B20', '#FFFFFF']}
            style={styles.sectionGradient}
          />
          <View style={styles.sectionIcon}>
            <Ionicons name="time" size={24} color="#FF4B4B" />
          </View>
          <Text style={styles.sectionTitle}>Session Settings</Text>
          
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Daily Session Goal (1-15)</Text>
            <TextInput
              style={styles.input}
              value={settings.dailySessionGoal.toString()}
              onChangeText={handleSessionGoalChange}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>

          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Card Display Duration (3-10s)</Text>
            <TextInput
              style={styles.input}
              value={settings.cardDisplayDuration.toString()}
              onChangeText={handleDurationChange}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </Animated.View>

        {/* Notification Settings */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
          <LinearGradient
            colors={['#3B82F620', '#FFFFFF']}
            style={styles.sectionGradient}
          />
          <View style={[styles.sectionIcon, { backgroundColor: '#3B82F610' }]}>
            <Ionicons name="notifications" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Session Reminders</Text>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: '#D1D5DB', true: '#3B82F640' }}
              thumbColor={settings.notificationsEnabled ? '#3B82F6' : '#9CA3AF'}
            />
          </View>
        </Animated.View>

        {/* Language Settings */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
          <LinearGradient
            colors={['#8B5CF620', '#FFFFFF']}
            style={styles.sectionGradient}
          />
          <View style={[styles.sectionIcon, { backgroundColor: '#8B5CF610' }]}>
            <Ionicons name="language" size={24} color="#8B5CF6" />
          </View>
          <Text style={styles.sectionTitle}>Language</Text>
          
          <View style={styles.languageButtons}>
            {SUPPORTED_LANGUAGES.map(lang => (
              <Pressable
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.code && styles.languageButtonActive,
                ]}
                onPress={() => handleLanguageChange(lang.code)}>
                <Text
                  style={[
                    styles.languageButtonText,
                    selectedLanguage === lang.code && styles.languageButtonTextActive,
                  ]}>
                  {lang.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Custom Words */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.section}>
          <LinearGradient
            colors={['#10B98120', '#FFFFFF']}
            style={styles.sectionGradient}
          />
          <View style={[styles.sectionIcon, { backgroundColor: '#10B98110' }]}>
            <Ionicons name="book" size={24} color="#10B981" />
          </View>
          <Text style={styles.sectionTitle}>Custom Words</Text>
          
          <View style={styles.customWordInput}>
            <TextInput
              style={[styles.input, styles.wordInput]}
              value={newWord}
              onChangeText={setNewWord}
              placeholder="Enter a new word"
              maxLength={10}
              autoCapitalize="characters"
            />
            <Pressable
              style={[styles.addButton, !newWord.trim() && styles.addButtonDisabled]}
              onPress={handleAddWord}
              disabled={!newWord.trim()}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          <View style={styles.wordList}>
            {cards.map(card => (
              <View key={card.id} style={styles.wordChip}>
                <Text style={styles.wordChipText}>{card.word}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Support Section */}
        <Animated.View entering={FadeInDown.delay(1000)} style={styles.section}>
          <LinearGradient
            colors={['#F59E0B20', '#FFFFFF']}
            style={styles.sectionGradient}
          />
          <View style={[styles.sectionIcon, { backgroundColor: '#F59E0B10' }]}>
            <Ionicons name="help-buoy" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Text style={styles.supportText}>
            Need help or have questions? Our support team is here to assist you.
          </Text>
          
          <Pressable 
            style={styles.supportButton}
            onPress={() => setShowSupportForm(true)}>
            <Ionicons name="mail" size={20} color="white" style={styles.supportButtonIcon} />
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </Pressable>
        </Animated.View>
      </View>

      <SupportForm 
        isVisible={showSupportForm}
        onClose={() => setShowSupportForm(false)}
      />
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
  section: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
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
  sectionGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF4B4B10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 24,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
    marginRight: 16,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    width: 80,
    textAlign: 'center',
  },
  customWordInput: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  wordInput: {
    flex: 1,
    width: 'auto',
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  wordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  wordChipText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '500',
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  languageButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '500',
  },
  languageButtonTextActive: {
    color: 'white',
  },
  supportText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  supportButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});