# Tech Stack Document

## Introduction

This project is a cross-platform mobile application designed to help parents teach their toddlers and young children to read. Inspired by the principles in "How to Teach Your Baby to Read" by Glenn Doman, the app provides a playful and educational environment where parents can initiate daily reading sessions. The technology chosen for this project focuses on reliability, ease of use, and built-in scalability, ensuring that the app runs smoothly whether it is used offline or upgraded with cloud syncing capabilities in the future.

## Frontend Technologies

The app’s user interface is built using React Native combined with Expo. This means that we can develop one codebase and have it run on both iOS and Android devices, saving time and ensuring consistency across platforms. TypeScript is used to add a layer of type safety, which minimizes errors and makes the code more robust. In addition, we employ React Navigation for organizing screen transitions in a smooth and user-friendly manner. The design focuses on a clean and minimalist layout, ensuring that essential features – like the card display for reading sessions, settings, progress tracking, and onboarding tutorial – are both engaging and simple to navigate.

## Backend Technologies

On the backend, the application initially uses local data storage with AsyncStorage to keep track of session logs, card sets, and user settings. For more complex data management in the future, we have planned an upgrade to SQLite, which will handle larger volumes of information with greater reliability. There is also a pathway to integrate cloud syncing using services like Supabase or Firebase. This future integration will support multi-device use, secure user authentication, and enhanced data backup, allowing the app to grow as user demands evolve.

## Infrastructure and Deployment

The project leverages Expo to simplify the process of building, testing, and deploying the application across various mobile platforms. You can think of Expo as an all-in-one platform that not only accelerates the development process but also ensures that the app is easy to update. Modern CI/CD pipelines and version control systems are in place to ensure that every code update is smooth, tested, and reliable. This combination makes it easy to scale the app while maintaining high performance and keeping operational downtime to a minimum.

## Third-Party Integrations

Our tech stack benefits from several third-party integrations that enhance both development and functionality. For instance, the use of AI-powered tools like ChatGPT helps in generating advanced code snippets and improving overall code quality. Additionally, we utilize Bolt for quick project setup and best practices, ensuring our scaffolding is robust from the start. Cursor, an advanced IDE with real-time suggestions, aids developers in writing high-quality code efficiently. These integrations allow us to maintain momentum during development while keeping the project technologically up-to-date and innovative.

## Security and Performance Considerations

The security measures in this project are designed with a focus on protecting both the parents' and children’s data. Sensitive information is stored securely, with local data managed using encrypted storage solutions. The app is built to comply with privacy regulations like COPPA and GDPR-K, ensuring that parental consent is obtained and data is handled responsibly. Performance is also a priority; the use of TypeScript and modern libraries ensures the application runs smoothly. The offline-first approach ensures that core features such as reading sessions and progress tracking remain fully functional even without an internet connection, thereby providing a consistent and reliable user experience.

## Conclusion and Overall Tech Stack Summary

The technology behind this reading app has been chosen to provide a robust, engaging, and secure experience for parents looking to support their toddlers’ learning journey. With React Native, Expo, and TypeScript forming the frontend backbone, along with AsyncStorage (and potentially SQLite) on the backend, the app is designed to be both flexible and scalable. Third-party tools like ChatGPT, Bolt, and Cursor streamline development and ensure best practices. Each technology has been carefully implemented to create an intuitive and reliable experience, making it easy for users to keep their children engaged in daily reading sessions while ensuring data is secure and performance remains top-notch.
