# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Soul Sync (branded as "Lovitché") is an astrology-based matchmaking/dating mobile app built with Expo (SDK 54) and React Native 0.81. The backend is Supabase (auth + database). The app features kundli/birth chart displays, profile galleries, and zodiac-based compatibility.

## Build & Development Commands

All commands must be run from the `soul_sync_mapp/` directory.

- **Install dependencies:** `npm install` (lockfile also exists for `bun`)
- **Start dev server:** `npx expo start`
- **Run on Android:** `npm run android` or `npx expo start --android`
- **Run on iOS:** `npm run ios` or `npx expo start --ios`
- **Run on web:** `npm run web` or `npx expo start --web`
- **Lint:** `npm run lint` (uses eslint-config-expo flat config)
- **Type checking:** `npx tsc --noEmit` (strict mode enabled)

There is no test runner currently configured in the project.

## Environment Variables

Supabase credentials are loaded via `dotenv/config` in `app.config.ts` and accessed directly via `process.env` in `src/lib/supabase.ts`. Required env vars in `.env`:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Note: `.env` is **not** gitignored (only `.env*.local` is). This should be addressed.

## Architecture

### Routing (expo-router, file-based)

The app uses expo-router with typed routes enabled. Two top-level route groups:

- **`app/(auth)/`** — Unauthenticated screens: landing page (`index.tsx`), login, register, forget-password, change-password. Uses a Stack navigator with slide animation.
- **`app/(tabs)/`** — Authenticated screens: Home and Settings are visible tabs. Profile, notifications, and security are hidden tab routes (rendered as pages but not shown in the tab bar). Nested groups `(profile)/` and `(settings)/` hold sub-pages.

### Auth Guard (`app/_layout.tsx`)

The root layout wraps everything in `AuthProvider` and uses a `RootNavigator` that checks `useAuth().session` + `useSegments()` to redirect:
- No session + not in `(auth)` → redirect to `/login`
- Has session + in `(auth)` → redirect to `/(tabs)`

This is the single source of truth for route protection. Do not add auth checks in individual screens.

### Supabase Client (`src/lib/supabase.ts`)

Single shared Supabase client instance using `AsyncStorage` for session persistence. `detectSessionInUrl` is disabled (not relevant for native). All auth operations go through `src/services/auth.service.ts` which wraps Supabase auth methods (login, register, logout, resetPassword).

### Auth State (`providers/AuthProvider.tsx`)

React Context providing `session`, `loading`, and `signOut`. Listens to `onAuthStateChange` for real-time session updates. Consumed via the `useAuth()` hook.

### Theme System (`constants/theme.ts`)

Centralized dark theme with exports:
- `COLORS` — background (#000), surface (#0a0a0a), primary gradient (purple #6A00F4 → #C77DFF), text colors, overlay, input background
- `SIZES` — standard padding, radius, font sizes
- `GLOBAL` — reusable StyleSheet (container, center, title, subtitle, row)

Always use these constants instead of hardcoded color/size values. Gradient buttons use `expo-linear-gradient` with `COLORS.primaryStart`/`COLORS.primaryEnd`.

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`). Use `@/constants/theme`, `@/providers/AuthProvider`, `@/src/services/auth.service`, etc.

### Component Patterns

- **Profile components** (`components/ProfileHeader.tsx`, `ProfileDetails.tsx`, `profleBio.tsx`, `PhotoGallary.tsx`, `KundliDetail.tsx`) — domain-specific, used in the profile page
- **`PolicySection`** — reusable component for static content pages (About Us, Privacy Policy, Terms, etc.). Takes a `title` and `sections` array
- **`components/ui/`** — generic UI primitives (collapsible, icon-symbol with `.ios.tsx` platform variant)

### Key Technical Choices

- New Architecture is enabled (`newArchEnabled: true`)
- React Compiler experiment is enabled (`reactCompiler: true`)
- TypeScript strict mode is on
- The floating tab bar is absolutely positioned with rounded styling (see `(tabs)/_layout.tsx`)
- `@shopify/flash-list` is available for performant lists
- `react-native-svg` is used for kundli chart rendering
