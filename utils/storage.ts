import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, WordCard, Session, DailyProgress, UserSettings } from '../types/storage';

// Word Cards
export async function getWordCards(): Promise<WordCard[]> {
  try {
    const cards = await AsyncStorage.getItem(STORAGE_KEYS.WORD_CARDS);
    return cards ? JSON.parse(cards) : [];
  } catch (error) {
    console.error('Error getting word cards:', error);
    return [];
  }
}

export async function saveWordCard(card: WordCard): Promise<void> {
  try {
    const cards = await getWordCards();
    const updatedCards = [...cards, card];
    await AsyncStorage.setItem(STORAGE_KEYS.WORD_CARDS, JSON.stringify(updatedCards));
  } catch (error) {
    console.error('Error saving word card:', error);
  }
}

export async function removeWordCard(cardId: string): Promise<void> {
  try {
    const cards = await getWordCards();
    const updatedCards = cards.filter(card => card.id !== cardId);
    await AsyncStorage.setItem(STORAGE_KEYS.WORD_CARDS, JSON.stringify(updatedCards));
  } catch (error) {
    console.error('Error removing word card:', error);
  }
}

// Sessions
export async function getSessions(): Promise<Session[]> {
  try {
    const sessions = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error('Error getting sessions:', error);
    return [];
  }
}

export async function saveSession(session: Session): Promise<void> {
  try {
    const sessions = await getSessions();
    const updatedSessions = [...sessions, session];
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
  } catch (error) {
    console.error('Error saving session:', error);
  }
}

// Daily Progress
export async function getDailyProgress(): Promise<DailyProgress[]> {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
    return progress ? JSON.parse(progress) : [];
  } catch (error) {
    console.error('Error getting daily progress:', error);
    return [];
  }
}

export async function updateDailyProgress(progress: DailyProgress): Promise<void> {
  try {
    const allProgress = await getDailyProgress();
    const existingIndex = allProgress.findIndex(p => p.date === progress.date);
    
    if (existingIndex !== -1) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_PROGRESS, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error updating daily progress:', error);
  }
}

// User Settings
export async function getUserSettings(): Promise<UserSettings> {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    if (!settings) {
      const defaultSettings: UserSettings = {
        dailySessionGoal: 3,
        cardDisplayDuration: 5,
        notificationsEnabled: true,
      };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(settings);
  } catch (error) {
    console.error('Error getting user settings:', error);
    return {
      dailySessionGoal: 3,
      cardDisplayDuration: 5,
      notificationsEnabled: true,
    };
  }
}

export async function updateUserSettings(settings: Partial<UserSettings>): Promise<void> {
  try {
    const currentSettings = await getUserSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    await AsyncStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(updatedSettings));
  } catch (error) {
    console.error('Error updating user settings:', error);
  }
}