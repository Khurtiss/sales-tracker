# sales-tracker

Sales tracking app with web and server. Track daily SIM card registrations and MoMo app downloads with weekly aggregation and server sync capabilities.

This is an [Expo](https://expo.dev) project built with React Native, TypeScript, and Expo Router for cross-platform mobile and web deployment.

## Get started

### Installation

```bash
npm install
```

### Development

```bash
npm start                    # Start Expo dev server
npm run android             # Run on Android emulator
npm run ios                 # Run on iOS simulator
npm run web                 # Run web version
```

### Build for Web

```bash
npm run build               # Build web version → dist/
```

## Project Structure

- **`app/`** – Expo Router frontend (mobile/web)
  - `(tabs)/sales.tsx` – Entry form for daily SIM/MoMo counts
  - `(tabs)/manager.tsx` – CSV export and data management
- **`server/`** – Node/Express backend
  - `index.js` – API server
  - `entries.json` – JSON data store

## Stack

- Expo 54, React 19, React Native 0.81
- TypeScript, Expo Router v6
- AsyncStorage for local persistence
- Express.js backend

## Documentation

See `.github/copilot-instructions.md` for detailed architecture, conventions, and development patterns.

## Resources

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router guide](https://docs.expo.dev/router/introduction/)
- [React Native docs](https://reactnative.dev/)
