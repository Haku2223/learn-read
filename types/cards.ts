import { WordCard } from './storage';

export interface CardSet {
  id: string;
  createdAt: string;
  cards: WordCard[];
  lastUpdatedAt: string;
}

export interface CardDisplayProps {
  card: WordCard;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export type CardReplacementPhase = 'initial' | 'sequential' | 'maintenance';

export interface CardReplacementResult {
  replacedCards: WordCard[];
  newCards: WordCard[];
}