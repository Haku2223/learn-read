## **Phase 1: Environment Setup**

1.  **Step 1: Install Node.js and Expo CLI**

    *   Install Node.js (any LTS version compatible with Expo, e.g., Node.js 16+ as per Expo’s recommendation).
    *   Install Expo CLI globally using `npm install -g expo-cli`.
    *   **Reference:** PRD Section 5 (Tech Stack & Tools)
    *   **Validation:** Run `node -v` and `expo --version` to verify installations.

2.  **Step 2: Initialize the Project with Bolt**

    *   Use Bolt for project scaffolding: run the quick project setup command supplied by Bolt (if available) to create a new Expo project using TypeScript.
    *   **Reference:** Tech Stack Document (React Native, TypeScript, Expo); Tools used: Bolt
    *   **Validation:** Confirm that the project directory (e.g., `/my-reading-app`) is created with a valid Expo structure.

3.  **Step 3: Initialize Git Repository and Create Branches**

    *   In the project root, run `git init` and create `main` and `dev` branches.
    *   **Reference:** PRD Section 7 (Constraints & Assumptions) and best practices from Cursor IDE integration.
    *   **Validation:** Check branches using `git branch`.

4.  **Step 4: Setup Project Directory Structure**

    *   Create the following directory structure:

        *   `/src/screens/` for screen components (Home, CardDisplay, Settings, Progress, Tutorial).
        *   `/src/components/` for reusable UI components (e.g., Card, Button, NotificationBanner).
        *   `/src/services/` for business logic (e.g., cardReplacement.ts, notifications.ts).
        *   `/src/storage/` for data storage utilities (AsyncStorage handlers).

    *   **Reference:** PRD Section 1 & 4 (App Structure, Core Features)

    *   **Validation:** Confirm that directories are created correctly on disk.

## **Phase 2: Frontend Development**

1.  **Step 1: Configure React Navigation**

    *   Install React Navigation and its dependencies:

        *   Run `npm install @react-navigation/native @react-navigation/bottom-tabs`
        *   Follow Expo’s instructions to install additional dependencies (e.g., `react-native-screens`, `react-native-safe-area-context`).

    *   **Reference:** Tech Stack Document (React Navigation)

    *   **Validation:** Run the app with `expo start` and verify that navigating between dummy screens works.

2.  **Step 2: Create the Home Screen**

    *   File: `/src/screens/HomeScreen.tsx`
    *   Implement a minimalist welcome interface with a motivational message and a "Start Session" button.
    *   Use the color scheme outlined (soft accents, purple for primary buttons, plenty of white space).
    *   **Reference:** PRD Sections 1 & 3 (App Overview, User Flow) and Frontend Guidelines Document.
    *   **Validation:** Launch the Home Screen in the Expo simulator and verify the UI meets mockup requirements.

3.  **Step 3: Create the Card Display Screen**

    *   File: `/src/screens/CardDisplayScreen.tsx`

    *   Build a screen that shows card-based word display:

        *   Large red text for words
        *   Horizontal swiping/tapping navigation (using React Native’s GestureResponder or third-party library if needed).

    *   **Reference:** PRD Section 4 (Core Features) and App Flow (Card Display Screen)

    *   **Validation:** Validate tap and swipe interactions in the simulator.

4.  **Step 4: Create the Settings Screen**

    *   File: `/src/screens/SettingsScreen.tsx`

    *   Develop controls that allow parents to:

        *   Adjust daily session count
        *   Toggle reminders
        *   Add or edit custom words
        *   Choose display language

    *   **Reference:** PRD Section 4 (Customization Options) and Frontend Guidelines Document.

    *   **Validation:** Manually test each control and review UI consistency.

5.  **Step 5: Create the Progress Tracking Screen**

    *   File: `/src/screens/ProgressScreen.tsx`
    *   Integrate simple charts (e.g., using a library like Victory or react-native-chart-kit) to display session counts, streaks, and words learned.
    *   **Reference:** PRD (Progress Tracking) and App Flow Document
    *   **Validation:** Verify charts render correctly with sample data.

6.  **Step 6: Create the Onboarding Tutorial Screen**

    *   File: `/src/screens/TutorialScreen.tsx`
    *   Implement swipable slides using a library like react-native-snap-carousel or similar.
    *   Ensure the tutorial covers key functionalities step-by-step (e.g., session initiation, card display usage).
    *   **Reference:** PRD Section 4 (Onboarding Tutorial) and App Flow Document.
    *   **Validation:** Run through the slides to check navigation and presentation.

## **Phase 3: Backend Development (Local Data Storage & Business Logic)**

1.  **Step 1: Implement Local Data Handling with AsyncStorage**

    *   File: `/src/storage/storage.ts`

    *   Write utility functions to store/retrieve:

        *   Session logs
        *   Card sets and settings

    *   **Reference:** PRD Section 4 (Offline-First Functionality) and Tech Stack (Data Storage)

    *   **Validation:** Write unit tests (e.g., using Jest) to verify data can be saved and retrieved correctly from AsyncStorage.

2.  **Step 2: Code the Card Replacement Algorithm (Pseudocode and Implementation)**

    *   File: `/src/services/cardReplacement.ts`

    *   **Step 2.1:** Write detailed pseudocode in comments at the top of the file:

        *   For a new card set, keep the original 5 cards static for 5 days.
        *   From day 6, replace one randomly selected original card per day until all are replaced.
        *   In maintenance mode, every card is replaced after a lifespan of 5 days from introduction or replacement.

    *   **Step 2.2:** Implement the algorithm in TypeScript with functions like `getCurrentCardSet()` and `shouldReplaceCard(card, currentDate)`.

    *   **Reference:** PRD Section 4 (Card Replacement Algorithm) and Q&A on Card Replacement Details

    *   **Validation:** Write test cases to simulate dates and verify that cards are replaced as per algorithm logic.

3.  **Step 3: Implement Session Logging and Notification Triggering**

    *   File: `/src/services/sessionManager.ts`

    *   Develop functions to:

        *   Log session start and completion times in AsyncStorage
        *   Check daily session counts and trigger notifications if fewer than 3 sessions are completed.

    *   **Reference:** PRD Section 4 (In-App Notifications) and Q&A (Notifications Requirements)

    *   **Validation:** Simulate a day with fewer than 3 sessions and check if the notification function gets called.

4.  **Step 4: Setup In-App Notification Service**

    *   File: `/src/services/notifications.ts`
    *   Integrate Expo’s Notifications API to schedule and present local notifications.
    *   Configure notifications to alert parents when session targets are not met for the day.
    *   **Reference:** PRD Section 4 (Notifications) and Q&A on in-app notifications
    *   **Validation:** Test notifications in the Expo simulator by manually triggering the service.

## **Phase 4: Integration**

1.  **Step 1: Connect Frontend UI with Business Logic Services**

    *   In each screen (especially HomeScreen and CardDisplayScreen), import and call functions from `/src/services/sessionManager.ts` and `/src/services/cardReplacement.ts` upon session start or app launch.
    *   **Reference:** PRD Section 3 (User Flow) and Frontend Guidelines Document
    *   **Validation:** Launch the app, start a session, and ensure session logs and card replacement updates occur as expected.

2.  **Step 2: Wire Up In-App Navigation with React Navigation**

    *   Ensure the bottom tab navigator links Home, Progress, and Settings, and the hamburger menu provides access to Card Display and Tutorial screens.
    *   **Reference:** PRD Section 3 (User Flow, Navigation) and Frontend Guidelines Document
    *   **Validation:** Manually test navigation across all screens to ensure seamless transitions.

3.  **Step 3: Test Data Storage Functionality**

    *   Integrate the local storage utilities with UI forms (e.g., settings changes, session logs) so that data persists correctly between app launches.
    *   **Reference:** PRD Section 4 (Offline-First Functionality)
    *   **Validation:** Simulate data saving and retrieval in the Expo simulator with tools like Reactotron or console logs.

## **Phase 5: Deployment**

1.  **Step 1: Prepare the App for Production with Expo**

    *   Run `expo build:android` and `expo build:ios` (or use EAS Build) to generate production-ready binaries.
    *   **Reference:** PRD Section 7 (Constraints & Assumptions) and Tech Stack Document (Expo)
    *   **Validation:** Install the produced binaries on test devices and verify core functionality.

2.  **Step 2: Configure Over-The-Air (OTA) Updates**

    *   Leverage Expo’s OTA update feature by configuring the `app.json` and enabling proper release channels.
    *   **Reference:** Tech Stack Document (Expo)
    *   **Validation:** Publish an update and verify that the app receives it correctly.

3.  **Step 3: Setup CI/CD Pipeline using Cursor and GitHub Actions**

    *   Configure a GitHub Action or your preferred CI/CD tool that triggers on pushes to the `dev` branch, runs tests (including unit tests for storage and card replacement logic) and builds the Expo project.
    *   **Reference:** Tools: Cursor and best practices as provided by Cursor's guidelines.
    *   **Validation:** Run the pipeline and verify that tests pass and builds succeed.

## **Phase 6: Post-Launch**

1.  **Step 1: Monitor App Performance and Analytics**

    *   Integrate a monitoring solution (e.g., Expo’s built-in logging or a third-party analytics tool) to track app usage, session counts, and potential crashes.
    *   **Reference:** PRD Section 6 (Non-Functional Requirements) and Tech Stack Document (Monitoring readiness)
    *   **Validation:** Check the analytics dashboard after real user sessions.

2.  **Step 2: Plan Data Backup Strategy**

    *   While core features work offline, design a roadmap to integrate cloud syncing using Supabase or Firebase in the future.
    *   **Reference:** Q&A on Data Storage; PRD Section 4 (Offline Functionality)
    *   **Validation:** Document migration paths and run periodic backups of AsyncStorage data locally.

3.  **Step 3: Schedule Regular Code Reviews and Updates**

    *   Use AI-powered tools (Cursor, ChatGPT) for continuous improvement and real-time code suggestions during maintenance.
    *   **Reference:** Tools: Cursor and ChatGPT in the Recommended Tools section
    *   **Validation:** Create a maintenance schedule and track issues on your project management tool.

This plan covers setting up the development environment, implementing a user-friendly, offline-first mobile app with a dynamic card replacement algorithm, integrating local data storage, and ensuring smooth deployment. Each step references the relevant sections of the PRD, Tech Stack, and Q&A documents to ensure strict compliance with project requirements.
