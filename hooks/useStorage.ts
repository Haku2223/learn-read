import { useState, useEffect, useCallback } from 'react';
import { WordCard, Session, DailyProgress, UserSettings } from '../types/storage';
import * as storage from '../utils/storage';

export function useWordCards() {
  const [cards, setCards] = useState<WordCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = useCallback(async () => {
    setLoading(true);
    const loadedCards = await storage.getWordCards();
    setCards(loadedCards);
    setLoading(false);
  }, []);

  const addCard = useCallback(async (card: WordCard) => {
    await storage.saveWordCard(card);
    await loadCards();
  }, [loadCards]);

  const removeCard = useCallback(async (cardId: string) => {
    await storage.removeWordCard(cardId);
    await loadCards();
  }, [loadCards]);

  return { cards, loading, addCard, removeCard, reloadCards: loadCards };
}

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = useCallback(async () => {
    setLoading(true);
    const loadedSessions = await storage.getSessions();
    setSessions(loadedSessions);
    setLoading(false);
  }, []);

  const addSession = useCallback(async (session: Session) => {
    await storage.saveSession(session);
    await loadSessions();
  }, [loadSessions]);

  return { sessions, loading, addSession, reloadSessions: loadSessions };
}

export function useDailyProgress() {
  const [progress, setProgress] = useState<DailyProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = useCallback(async () => {
    setLoading(true);
    const loadedProgress = await storage.getDailyProgress();
    setProgress(loadedProgress);
    setLoading(false);
  }, []);

  const updateProgress = useCallback(async (dailyProgress: DailyProgress) => {
    await storage.updateDailyProgress(dailyProgress);
    await loadProgress();
  }, [loadProgress]);

  return { progress, loading, updateProgress, reloadProgress: loadProgress };
}

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    const loadedSettings = await storage.getUserSettings();
    setSettings(loadedSettings);
    setLoading(false);
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    await storage.updateUserSettings(newSettings);
    await loadSettings();
  }, [loadSettings]);

  return { settings, loading, updateSettings, reloadSettings: loadSettings };
}