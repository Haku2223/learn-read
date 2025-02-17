import { LanguageCode } from '../types/language';
import enWords from '../data/words/en.json';
import esWords from '../data/words/es.json';
import frWords from '../data/words/fr.json';
import svWords from '../data/words/sv.json';

interface WordList {
  initial: string[];
  progression: string[];
}

const wordLists: Record<LanguageCode, WordList> = {
  en: enWords,
  es: esWords,
  fr: frWords,
  sv: svWords,
};

export function getWordList(language: LanguageCode): WordList {
  return wordLists[language] || wordLists.en;
}

export function getInitialWords(wordList: WordList, count: number = 5): string[] {
  return [...wordList.initial]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export function getProgressionWord(wordList: WordList, excludeWords: string[]): string {
  const availableWords = wordList.progression.filter(
    word => !excludeWords.includes(word)
  );
  
  if (availableWords.length === 0) {
    return wordList.progression[Math.floor(Math.random() * wordList.progression.length)];
  }
  
  return availableWords[Math.floor(Math.random() * availableWords.length)];
}