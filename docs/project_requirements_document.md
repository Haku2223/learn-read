# Project Requirements Document (PRD)

## 1. Project Overview

We are building a cross-platform mobile application aimed at helping parents teach toddlers and young children to read. The app is based on principles from "How to Teach Your Baby to Read" by Glenn Doman, offering a playful, child-friendly interface with a card-based system where words are displayed for educational interaction. By allowing parents to conduct between three and fifteen reading sessions a day, the app supports daily training routines that keep young learners engaged and progressively build their reading skills.

The primary objectives of the app are to provide a simple, interactive teaching tool that is both engaging for children and easy for parents to use. Success will be measured by high engagement rates, consistent daily usage, and positive feedback on the educational effectiveness of the card-based learning method. The app is built with scalability in mind, with an offline-first design that later allows cloud syncing and secure user data handling in compliance with privacy laws relevant to children.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   A cross-platform mobile app built with React Native, TypeScript, and Expo.

*   A clean and child-friendly UI featuring a Home Screen, Card Display Screen, Settings Screen, Progress Tracking Screen, and Tutorial Screen.

*   Daily reading session functionality with a card-based display that allows parents to initiate sessions manually.

*   An intelligent card replacement algorithm:

    *   Original cards remain static for 5 days in a new card set.
    *   From day six, one randomly chosen original card is replaced per day until the set is fully updated.
    *   In maintenance mode, each card is replaced after a lifespan of 5 days.

*   In-app notifications for missed sessions if fewer than 3 sessions are completed per day.

*   Local offline data storage using AsyncStorage (with the potential to switch to SQLite if needed).

*   Detailed progress tracking (session counts, streaks, words learned) via charts and dashboards.

*   A customizable settings section where parents can adjust session frequency, add or edit custom words, and choose display language.

*   An onboarding tutorial that guides new users through all major features of the app.

**Out-of-Scope:**

*   Child-specific profiles or interactions; the app is exclusively for parents.
*   Comprehensive cloud syncing and multi-device support in the short term (future integration with Supabase or Firebase is a long-term possibility).
*   Real-time multiplayer or social interaction features.
*   Advanced audio feedback or biometric interaction; the primary user gesture is tapping.
*   Overly complex animations or graphical effects beyond simple, modern, and minimalist design elements.

## 3. User Flow

When the app is launched, parents are welcomed by a clean and minimalist welcome screen displaying a motivational message and a prominent “Start Session” button. For new users, the onboarding tutorial is presented as short, swipable slides that explain the key features—including daily session goals, the card-based display for teaching words, and progress tracking. The tutorial is flexible: it can be completed in one go or skipped, allowing parents to begin using the app at their preferred pace.

Once the tutorial is completed or skipped, the parent reaches the Home Screen, where they can directly start a reading session by tapping the “Start Session” button. Upon initiating a session, the app transitions to the Card Display Screen where large red word cards appear, and navigation is handled through simple tap gestures or horizontal swiping. After or during the session, the app logs the session data and, if necessary, triggers notifications for missed sessions. The parent can also access the Settings or Progress Tracking screens via a bottom tab bar, ensuring customization and the ability to review the child’s learning progress at any time.

## 4. Core Features (Bullet Points)

*   **Daily Reading Sessions:**

    *   Enable parents to start 3 to 15 sessions daily.
    *   Manual session initiation with in-app tracking of completed sessions.

*   **Card Display System:**

    *   Present educational word cards in large, bold red text.
    *   Support basic tap-based and horizontal swiping gestures for navigation.

*   **Card Replacement Algorithm:**

    *   For a new card set, all 5 cards remain unchanged for the first 5 days.
    *   From day six, replace one randomly selected original card per day.
    *   Maintenance phase: After every card has existed for 5 days, each card is cycled out.
    *   Code implementation includes detailed pseudocode and TypeScript snippets.

*   **In-App Notifications:**

    *   Native mobile notifications to remind parents if daily sessions fall short of the required three.
    *   Update session logs automatically upon completing a session.

*   **Customization Options:**

    *   Adjust daily session counts, session repetition, and pacing.
    *   Add, edit, or remove custom words.
    *   Option to change the display language for the word cards.

*   **Progress Tracking:**

    *   Visual dashboards with charts showing daily/weekly session counts.
    *   Indicators for active card sets, words learned, session streaks, and achievement badges.

*   **Onboarding Tutorial:**

    *   Step-by-step guide for new users using swipable slides.
    *   Easily accessible at any time via a dedicated Tutorial Screen.

*   **Offline-First Functionality:**

    *   Uses local data storage (AsyncStorage, potentially SQLite) ensuring core features work offline.
    *   Prepared groundwork for future cloud syncing features.

## 5. Tech Stack & Tools

*   **Frontend:**

    *   React Native with Expo for cross-platform mobile development.
    *   TypeScript for better code reliability and type safety.
    *   React Navigation for in-app routing and navigation between screens.

*   **Data Storage:**

    *   AsyncStorage for immediate offline storage of session logs, card sets, and settings.
    *   SQLite as an option for more complex local data management if needed later.

*   **Libraries & Tools:**

    *   Animated libraries for smooth UI transitions and interactions.
    *   Notifications API to trigger native in-app notifications.
    *   Expo tools for streamlining the development and deployment process.
    *   Cursor IDE for AI-powered coding assistance and real-time code suggestions.
    *   Bolt for quick project setup with AI-powered scaffolding and best practices.
    *   Support for cloud-backend integration in future phases using Supabase or Firebase.

## 6. Non-Functional Requirements

*   **Performance:**

    *   Fast app launch and smooth transitions between screens.
    *   Low latency in UI feedback, especially when tapping and swiping on cards.

*   **Security & Privacy:**

    *   Local data encryption and secure handling of session logs and settings.
    *   Comply with data privacy regulations like COPPA and GDPR-K, ensuring that any stored data (especially data indirectly related to children) is secure.
    *   HTTPS for any data syncing or communications with future cloud backends.

*   **User Experience & Usability:**

    *   Clean, minimalist design with plenty of white space and clear typography.
    *   Child-friendly interface with large, bold text, soft colors, and intuitive gestures.
    *   Offline-first functionality to ensure uninterrupted usage even without an internet connection.

*   **Responsiveness:**

    *   The app should adapt gracefully to different device sizes and orientations.
    *   Quick response times (ideal response under 200 ms for UI interactions).

## 7. Constraints & Assumptions

*   The app is designed exclusively for use by parents, with no separate child profiles.
*   Initially, all data is stored locally; cloud syncing and multi-device support are planned for future phases.
*   The Card Replacement Algorithm depends on accurate local date and time settings.
*   The project's current scope does not account for in-depth audio feedback, focusing instead on simple tap interactions.
*   Assumes consistent availability of React Native and Expo libraries along with stable support for TypeScript.
*   Development assumes that initial offline storage via AsyncStorage will suffice, with a potential transition to SQLite if data handling needs become more complex.

## 8. Known Issues & Potential Pitfalls

*   **Data Synchronization:**

    *   Without initially integrating a cloud backend, users may experience issues if they switch devices or lose local data. This is acceptable in the short term, but careful planning will be needed for future cloud syncing.

*   **Card Replacement Algorithm Complexity:**

    *   Handling the lifecycle of word cards based on date and usage may lead to edge cases (e.g., incorrect date handling, random replacement errors). Writing detailed pseudocode and comprehensive test cases will help mitigate these risks.

*   **Mobile Notifications:**

    *   Reliance on native mobile capabilities for notifications can sometimes be impacted by device settings or operating system limitations. Ensuring fallback mechanisms or manual session reminders may be necessary.

*   **Offline Data Integrity:**

    *   AsyncStorage is sufficient for lightweight offline data, but if the user’s data grows, performance or data integrity issues could appear. Planning for a migration to SQLite should be kept on the development roadmap.

*   **UX Consistency Across Platforms:**

    *   Given differing behaviors on iOS vs. Android, ensuring consistent design and performance will require thorough testing on multiple devices.

This document serves as the backbone for subsequent technical planning and implementation documents. Subsequent documents (Tech Stack, Frontend Guidelines, Backend Structure, etc.) will build on the clarity provided here, ensuring a cohesive development process.
