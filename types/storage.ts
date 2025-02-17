import { LanguageCode } from './language';

// Types for word cards and sessions
export interface WordCard {
  id: string;
  word: string;
  createdAt: string;
  lastShownAt: string;
  timesShown: number;
  language?: LanguageCode;
}

export interface Session {
  id: string;
  startedAt: string;
  completedAt: string;
  cardsShown: string[]; // Array of card IDs
}

export interface DailyProgress {
  date: string;
  sessionsCompleted: number;
  cardsLearned: number;
}

export interface UserSettings {
  dailySessionGoal: number;
  cardDisplayDuration: number; // in seconds
  notificationsEnabled: boolean;
  language?: LanguageCode;
}

// Storage keys
export const STORAGE_KEYS = {
  WORD_CARDS: '@BabyReading:wordCards',
  SESSIONS: '@BabyReading:sessions',
  DAILY_PROGRESS: '@BabyReading:dailyProgress',
  USER_SETTINGS: '@BabyReading:userSettings',
} as const;