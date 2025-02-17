# Cursor Rules Document

This document outlines the coding and integration standards for the Baby Reading App project, with a special focus on the use of the Cursor IDE and its best practices. It covers guidelines for managing the card replacement algorithm, file structure, TypeScript integration, and other advanced coding recommendations to ensure consistency, readability, and maintainability of the codebase.

1.  Overview

The Baby Reading App is designed using React Native, TypeScript, and Expo. The application helps parents teach their toddlers or young children to read by providing daily reading sessions through a card-based system. This document, titled "Cursor Rules," sets out the best practices for leveraging the Cursor IDE’s real-time suggestions and AI-powered scaffolding to enhance development quality.

1.  File and Project Structure

*   Maintain a clean project structure by separating components, screens, utilities, hooks, and types.
*   Use a dedicated folder for algorithms and business logic (e.g., cardReplacement) with corresponding test files.
*   Naming conventions should follow lowerCamelCase for variables and functions, and UpperCamelCase for components.

1.  Card Replacement Algorithm

The card replacement algorithm is central to the app’s operation. It is responsible for maintaining fresh content on the card display screen through a controlled lifecycle:

A. Algorithm Phases: a. Initial Phase (Days 1-5): Once a new CardSet is introduced, all 5 cards remain unchanged for the first 5 days. b. Sequential Replacement (Starting Day 6): On day 6, one randomly selected original card is replaced each day until all original cards have been updated. c. Maintenance Phase: Once every card has been replaced, each card will be replaced after a lifespan of 5 days from its introduction or its last replacement.

## B. Pseudocode:

// Pseudocode for Card Replacement Algorithm

function updateCardSet(cardSet, currentDate) { for each card in cardSet { daysSinceLastUpdate = calculateDaysBetween(card.lastUpdated, currentDate); if (card.isOriginal && daysSinceLastUpdate <= 5) { // In initial phase, do nothing continue; } else if (card.isOriginal && daysSinceLastUpdate > 5 && !card.replaced) { // Sequential replacement phase: replace one random original card per day if (isReplacementDay(currentDate)) { card = replaceCard(card); card.replaced = true; card.lastUpdated = currentDate; } } else if (daysSinceLastUpdate >= 5) { // Maintenance phase: replace every card after 5 days card = replaceCard(card); card.lastUpdated = currentDate; } } return cardSet; }

## C. TypeScript Code Snippet:

// TypeScript implementation for card replacement interface Card { id: string; word: string; isOriginal: boolean; replaced?: boolean; lastUpdated: Date; }

function daysBetween(date1: Date, date2: Date): number { const diffTime = Math.abs(date2.getTime() - date1.getTime()); return Math.floor(diffTime / (1000 * 60 * 60 * 24)); }

function replaceCard(card: Card): Card { // Logic to generate or select a new card return { ...card, word: generateNewWord(), isOriginal: false, replaced: true }; }

function updateCardSet(cardSet: Card[], currentDate: Date): Card[] { return cardSet.map(card => { const daysElapsed = daysBetween(card.lastUpdated, currentDate); // Initial Phase: Keep original cards static for first 5 days if (card.isOriginal && daysElapsed <= 5) { return card; } // Sequential Replacement: Replace one original card per day if applicable if (card.isOriginal && daysElapsed > 5 && !card.replaced) { // Implement logic to allow one card replacement per day as needed // This example assumes a helper to determine if replacement is allowed today if (isTodayReplacementAllowed(cardSet, currentDate)) { return { ...replaceCard(card), lastUpdated: currentDate }; } } // Maintenance Phase: Replace card if its lifespan has reached 5 days if (daysElapsed >= 5) { return { ...replaceCard(card), lastUpdated: currentDate }; } return card; }); }

// Helper: Determines if a replacement is allowed today (only one original replacement per day) function isTodayReplacementAllowed(cardSet: Card[], currentDate: Date): boolean { const replacementsToday = cardSet.filter(card => { const daysElapsed = daysBetween(card.lastUpdated, currentDate); return card.replaced && daysElapsed === 0; }); return replacementsToday.length < 1; }

function generateNewWord(): string { // Sample implementation to generate a new word; can be expanded as needed const sampleWords = ['MOMMY', 'DADDY', 'APPLE', 'BOOK', 'TREE']; return sampleWords[Math.floor(Math.random() * sampleWords.length)]; }

1.  Integration with Cursor IDE

*   Use Cursor’s smart suggestions to refine TypeScript types and enforce code best practices.
*   Leverage Cursor’s real-time linting support to catch potential issues early in the development cycle.
*   Apply Cursor’s project scaffolding to quickly generate component and module templates, ensuring consistency with the established project structure.
*   Regularly commit well-documented code so that Cursor’s version control integrations remain coherent across the team.

1.  Notifications & Session Logging

*   Use native in-app notifications to alert parents when fewer than three daily sessions are completed. Ensure these notifications trigger only when conditions have been met (tracked in session logs).
*   Log session data immediately after session completion to maintain an up-to-date history for progress tracking.

1.  Best Practices

*   Code Readability: Adopt descriptive naming conventions and inline comments, especially in complex functions such as the card replacement algorithm.
*   Testing: Develop unit tests for critical business logic, particularly the algorithm managing card lifecycles.
*   Offline-First: Ensure that all core functionality (session logging, card updates, settings modifications) works flawlessly without an active internet connection.
*   Security and Privacy: Adhere to data protection standards by minimizing stored data and encrypting local storage where feasible.

1.  Final Notes

This document serves as a living guide for all development activities within the project. By following these rules and leveraging Cursor’s powerful features, the development team can ensure a robust, maintainable, and high-performance application that fulfills its educational mission. All team members are encouraged to update and revise these guidelines in alignment with evolving project needs and industry best practices.
