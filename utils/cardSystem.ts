import { WordCard, CardSet, CardReplacementPhase, CardReplacementResult } from '../types';
import { addDays, isBefore, parseISO, differenceInDays } from 'date-fns';
import { getWordList, getInitialWords, getProgressionWord } from './wordManager';
import { LanguageCode } from '../types/language';

const INITIAL_PHASE_DURATION = 5; // days
const CARD_LIFESPAN = 5; // days

export function determineCardReplacementPhase(cardSet: CardSet): CardReplacementPhase {
  const createdDate = parseISO(cardSet.createdAt);
  const initialPhaseEndDate = addDays(createdDate, INITIAL_PHASE_DURATION);
  const now = new Date();

  if (isBefore(now, initialPhaseEndDate)) {
    return 'initial';
  }

  const hasOriginalCards = cardSet.cards.some(
    card => differenceInDays(now, parseISO(card.createdAt)) >= INITIAL_PHASE_DURATION
  );

  return hasOriginalCards ? 'sequential' : 'maintenance';
}

export function getCardsToReplace(cardSet: CardSet): WordCard[] {
  const phase = determineCardReplacementPhase(cardSet);
  const now = new Date();

  switch (phase) {
    case 'initial':
      return [];

    case 'sequential': {
      const originalCards = cardSet.cards.filter(
        card => parseISO(card.createdAt).getTime() === parseISO(cardSet.createdAt).getTime()
      );
      if (originalCards.length === 0) return [];
      return [originalCards[Math.floor(Math.random() * originalCards.length)]];
    }

    case 'maintenance':
      return cardSet.cards.filter(card => {
        const cardAge = differenceInDays(now, parseISO(card.createdAt));
        return cardAge >= CARD_LIFESPAN;
      });

    default:
      return [];
  }
}

export function replaceCards(cardSet: CardSet): CardReplacementResult {
  const cardsToReplace = getCardsToReplace(cardSet);
  if (cardsToReplace.length === 0) {
    return { replacedCards: [], newCards: [] };
  }

  const now = new Date().toISOString();
  const currentWords = cardSet.cards.map(card => card.word);
  const language = cardSet.cards[0]?.language || 'en';
  const wordList = getWordList(language);
  
  const newCards = cardsToReplace.map(oldCard => ({
    id: Math.random().toString(36).substr(2, 9),
    word: getProgressionWord(wordList, currentWords),
    createdAt: now,
    lastShownAt: now,
    timesShown: 0,
    language: oldCard.language || 'en',
  }));

  return {
    replacedCards: cardsToReplace,
    newCards
  };
}

export function generateNewCardSet(language: LanguageCode = 'en'): CardSet {
  const now = new Date().toISOString();
  const wordList = getWordList(language);
  const selectedWords = getInitialWords(wordList);

  const cards: WordCard[] = selectedWords.map(word => ({
    id: Math.random().toString(36).substr(2, 9),
    word,
    createdAt: now,
    lastShownAt: now,
    timesShown: 0,
    language
  }));

  return {
    id: Math.random().toString(36).substr(2, 9),
    createdAt: now,
    lastUpdatedAt: now,
    cards
  };
}