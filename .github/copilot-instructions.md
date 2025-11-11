# Sales Tracker: Copilot Instructions

## Project Overview

**sales-tracker** is a cross-platform React Native/Expo app for tracking daily SIM card registrations and MoMo app downloads with weekly aggregation and server sync capabilities. It consists of a TypeScript mobile frontend (`Expo + React Router`) and a lightweight Node/Express backend.

**Tech Stack:** Expo 54, React 19, React Native 0.81, TypeScript, Expo Router, AsyncStorage, Express.js

## Architecture

### Frontend (`app/`)
- **File-based routing:** Uses Expo Router v6 with folder-based structure
- **Tab navigation:** Root layout (`_layout.tsx`) → Tab layout (`(tabs)/_layout.tsx`) → 4 screens
- **Data persistence:** AsyncStorage (local-first), syncs to server as best-effort
- **Key screens:**
  - `sales.tsx`: Entry form for daily SIM/MoMo counts, computes ISO week totals against 15-unit target
  - `manager.tsx`: CSV export, copy to clipboard, share functionality
  - `index.tsx` & `explore.tsx`: Placeholder screens

### Backend (`server/`)
- **Data store:** JSON file (`entries.json`), format: `{ "YYYY-MM-DD": { sims: number, momo: number } }`
- **Endpoints:**
  - `GET /entries` → all stored entries
  - `POST /entries` → merge incoming entries into file
  - `GET /export.csv` → CSV export
- **Environment:** Configured via `app.json` `expo.extra.SERVER_URL` (production) or defaults to emulator localhost

## Critical Data Flows

### Entry Creation & Sync (sales.tsx)
1. User enters SIM/MoMo counts → stored in state
2. On save: Write to AsyncStorage (required)
3. Attempt server POST (optional, logged only)
4. Week totals recompute using `getISOWeekKey()` for consistent week boundaries

### Data Loading (manager.tsx)
1. Mount: Fetch from AsyncStorage synchronously
2. UI reflects local state immediately (no server fetch—offline-first)

### ISO Week Calculation (sales.tsx)
- `getISOWeekKey(date)` returns "YYYY-Wxx" string
- Used to group entries across calendar boundaries (e.g., "2025-W01")
- **Why:** Ensures week 1 of new year rolls correctly, stable for filtering

## Key Conventions & Patterns

### Storage
- **Key:** Always use `STORAGE_KEY = 'SIM_APP_ENTRIES_v1'` (see sales.tsx, manager.tsx)
- **Update:** Direct mutation + `setEntries()` + `persistEntries()` call (see sales.tsx)
- **No state management library:** Redux/Zustand not used; use React hooks + AsyncStorage

### Networking
- **Server URL:** Read from `Constants.expoConfig.extra.SERVER_URL` (falls back to 10.0.2.2:4000 for emulator)
- **Error handling:** Log and swallow errors; never interrupt local operation
- **Example:** See `persistEntries()` in sales.tsx for pattern

### Styling
- **Theme:** Light/dark mode via `Colors` constant (constants/theme.ts)
- **Components:** Reusable themed wrappers (`ThemedText`, `ThemedView`) in components/
- **Fonts:** Platform-specific (iOS system fonts vs. web defaults)

### Routing
- **Tab screen access:** Use `<Tabs.Screen name="screenName" />` structure; file names must match
- **Modal:** Add to root layout: `<Stack.Screen name="modal" options={{ presentation: 'modal' }} />`
- **Internal linking:** `href` routes relative to (tabs), e.g., `/modal` or `./explore`

## Development Commands

```bash
npm install                  # Install dependencies
npm start                    # Start Expo dev server
npm run android             # Run on Android emulator
npm run ios                 # Run on iOS simulator
npm run web                 # Run web version (static export)
npm run build               # Build web: expo export:web → dist/
npm run lint                # Run ESLint (expo config)
npm run reset-project       # Reset app/ to blank slate
```

## Common Tasks

**Add a new tab screen:**
1. Create `app/(tabs)/screen-name.tsx`
2. Add to `(tabs)/_layout.tsx`: `<Tabs.Screen name="screen-name" options={{ title: "...", tabBarIcon: ... }} />`

**Update server URL for deployment:**
- Edit `app.json` `expo.extra.SERVER_URL` field; rebuilt app will read it via `Constants.expoConfig.extra`

**Export data:**
- Manager screen generates CSV; copy/share via native share dialog (see manager.tsx `generateCSV()`)

**Debug week grouping:**
- Check `getISOWeekKey()` in sales.tsx; week key format is "YYYY-Wxx" for stable filtering

## Gotchas

- **Emulator localhost:** Use `10.0.2.2:4000` (not `localhost:4000`); Android emulator maps host localhost to this IP
- **AsyncStorage latency:** Reads/writes are not instant; always await or handle in callbacks
- **ISO week year boundary:** `getISOWeekKey()` may return year different from calendar date (e.g., "2025-W01" for Dec 28, 2024)
- **Server sync best-effort:** App is fully functional offline; server failure does not block saves
- **TypeScript strict mode:** Enabled in tsconfig.json; ensure null/undefined handling in Optional fields (e.g., `val?.sims`)

## File Reference

| File | Purpose |
|------|---------|
| `app/(tabs)/sales.tsx` | Entry form, week totals, server sync logic |
| `app/(tabs)/manager.tsx` | CSV export, clipboard/share UI |
| `app/_layout.tsx` | Root stack navigator, theme provider |
| `app/(tabs)/_layout.tsx` | Tab navigator configuration |
| `server/index.js` | Express app, data file I/O |
| `constants/theme.ts` | Color/font constants for light/dark mode |
| `package.json` | Scripts, dependencies (Expo, React Native) |
