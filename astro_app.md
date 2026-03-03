# AI Astrology Dating SaaS — Full App Plan
## Current State
* Expo Router + Supabase auth scaffold is in place (login, register, forgot-password, session handling).
* Profile page exists with hardcoded mock data (kundli chart, traits, photo gallery).
* Settings sub-pages (security, privacy, terms, etc.) exist but are incorrectly nested — `(settings)/` group is not wired to the tab layout.
* No database models, no real data fetching, no dating-specific features.
## Folder Structure Issues & Fix
Current problems:
1. **Inconsistent source layout** — `src/lib/` and `src/services/` exist while `hooks/`, `providers/`, `components/`, `constants/` are at root. Move everything under a single convention (recommend root-level, no `src/`).
2. **Broken route groups** — `(settings)` and `(profile)` groups inside `(tabs)` have no corresponding tab screen or stack navigator. They need their own `_layout.tsx` with a `Stack` navigator, and the parent `(tabs)/_layout.tsx` must register them.
3. **Missing folders** — No `types/`, `utils/`, or organized service layer.
Proposed folder structure:
```warp-runnable-command
app/
├── (auth)/                  # Auth flow
│   ├── _layout.tsx
│   ├── index.tsx            # Welcome/landing
│   ├── login.tsx
│   ├── register.tsx
│   ├── forget-password.tsx
│   └── change-password.tsx
├── (onboarding)/            # NEW — post-signup onboarding
│   ├── _layout.tsx
│   ├── birth-details.tsx    # Birth date/time/place
│   ├── preferences.tsx      # Age range, distance, zodiac prefs
│   ├── photos.tsx           # Upload photos
│   └── bio.tsx              # Bio & interests
├── (tabs)/                  # Main app (authenticated)
│   ├── _layout.tsx          # Bottom tabs
│   ├── index.tsx            # Discovery / Swipe
│   ├── matches.tsx          # Matches list
│   ├── chat/                # Chat stack
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Conversations list
│   │   └── [id].tsx         # Individual chat
│   ├── horoscope.tsx        # Daily horoscope + AI insights
│   └── profile/             # Profile stack
│       ├── _layout.tsx
│       ├── index.tsx        # Own profile view
│       └── edit.tsx         # Edit profile
├── user/                    # Standalone screens (modals)
│   ├── _layout.tsx
│   ├── [id].tsx             # View another user's profile
│   └── compatibility/[id].tsx  # Detailed compatibility report
├── (settings)/              # Settings stack (pushed from profile)
│   ├── _layout.tsx
│   ├── index.tsx            # Settings menu
│   ├── account.tsx
│   ├── notifications.tsx
│   ├── security.tsx
│   ├── privacy_policy.tsx
│   ├── term.tsx
│   ├── AboutUs.tsx
│   ├── ContactUs.tsx
│   └── community_guidelines.tsx
└── _layout.tsx              # Root layout (auth gate + onboarding gate)
components/
├── profile/                 # Profile-related components
│   ├── ProfileHeader.tsx
│   ├── ProfileDetails.tsx
│   ├── KundliDetail.tsx
│   ├── PhotoGallery.tsx
│   └── ProfileBio.tsx
├── discovery/               # Discovery/swipe components
│   ├── SwipeCard.tsx
│   └── CompatibilityBadge.tsx
├── chat/                    # Chat components
│   ├── MessageBubble.tsx
│   └── ChatInput.tsx
├── common/                  # Shared UI
│   ├── GradientButton.tsx
│   ├── Input.tsx
│   └── PolicySection.tsx
└── horoscope/
    └── DailyCard.tsx
lib/
├── supabase.ts
└── ai.ts                    # AI/LLM integration client
services/
├── auth.service.ts
├── profile.service.ts
├── match.service.ts
├── chat.service.ts
├── horoscope.service.ts
└── compatibility.service.ts
types/
├── database.ts              # Supabase generated types
├── profile.ts
├── match.ts
└── chat.ts
providers/
├── AuthProvider.tsx
└── OnboardingProvider.tsx
hooks/
├── useProfile.ts
├── useMatches.ts
├── useChat.ts
└── useCompatibility.ts
constants/
└── theme.ts
```
## Supabase Database Models
### 1. `profiles`
Extends Supabase auth.users. Core user data.
* `id` (uuid, FK → auth.users.id, PK)
* `full_name` (text)
* `bio` (text)
* `avatar_url` (text)
* `gender` (text — male/female/other)
* `date_of_birth` (date)
* `location_city` (text)
* `location_state` (text)
* `location_lat` (float)
* `location_lng` (float)
* `occupation` (text)
* `education` (text)
* `mother_tongue` (text)
* `diet` (text — veg/non-veg/vegan)
* `smoking` (text — never/occasionally/regularly)
* `drinking` (text — never/occasionally/regularly)
* `marital_status` (text — never_married/divorced/widowed)
* `height_cm` (int)
* `social_handle` (text)
* `is_onboarded` (boolean, default false)
* `is_verified` (boolean, default false)
* `created_at` / `updated_at` (timestamptz)
### 2. `birth_details`
Astrology-specific birth info for kundli generation.
* `id` (uuid, PK)
* `user_id` (uuid, FK → profiles.id, unique)
* `birth_date` (date)
* `birth_time` (time)
* `birth_place` (text)
* `birth_lat` (float)
* `birth_lng` (float)
* `zodiac_sign` (text)
* `moon_sign` (text — rashi)
* `nakshatra` (text)
* `gotra` (text)
* `manglik` (boolean)
* `charan` (int)
* `planetary_positions` (jsonb — sun, moon, mars, etc.)
* `kundli_chart_data` (jsonb — house placements)
* `created_at` (timestamptz)
### 3. `photos`
User photo gallery.
* `id` (uuid, PK)
* `user_id` (uuid, FK → profiles.id)
* `url` (text)
* `order` (int)
* `is_primary` (boolean, default false)
* `created_at` (timestamptz)
### 4. `interests`
User-selected interest tags.
* `id` (uuid, PK)
* `user_id` (uuid, FK → profiles.id)
* `name` (text — e.g. "Reading", "Travel")
* `icon` (text — icon name)
### 5. `preferences`
Match preferences.
* `id` (uuid, PK)
* `user_id` (uuid, FK → profiles.id, unique)
* `min_age` (int)
* `max_age` (int)
* `max_distance_km` (int)
* `preferred_gender` (text)
* `preferred_zodiac_signs` (text[] — array)
* `preferred_diet` (text)
* `manglik_preference` (text — yes/no/no_preference)
* `updated_at` (timestamptz)
### 6. `swipes`
Like/pass actions.
* `id` (uuid, PK)
* `swiper_id` (uuid, FK → profiles.id)
* `swiped_id` (uuid, FK → profiles.id)
* `action` (text — like/pass/superlike)
* `created_at` (timestamptz)
* Unique constraint on (swiper_id, swiped_id)
### 7. `matches`
Created when two users like each other.
* `id` (uuid, PK)
* `user1_id` (uuid, FK → profiles.id)
* `user2_id` (uuid, FK → profiles.id)
* `compatibility_score` (float — 0-100, AI-calculated)
* `matched_at` (timestamptz)
* `is_active` (boolean, default true)
### 8. `messages`
Chat messages between matched users.
* `id` (uuid, PK)
* `match_id` (uuid, FK → matches.id)
* `sender_id` (uuid, FK → profiles.id)
* `content` (text)
* `type` (text — text/image/icebreaker)
* `read_at` (timestamptz, nullable)
* `created_at` (timestamptz)
### 9. `compatibility_reports`
AI-generated kundli compatibility analysis.
* `id` (uuid, PK)
* `user1_id` (uuid, FK → profiles.id)
* `user2_id` (uuid, FK → profiles.id)
* `overall_score` (float)
* `guna_milan_score` (float — out of 36)
* `strengths` (text[])
* `challenges` (text[])
* `ai_summary` (text — LLM-generated narrative)
* `detailed_analysis` (jsonb — breakdown by category)
* `created_at` (timestamptz)
### 10. `daily_horoscopes`
AI-generated daily horoscope content.
* `id` (uuid, PK)
* `zodiac_sign` (text)
* `date` (date)
* `general` (text)
* `love` (text)
* `career` (text)
* `lucky_number` (int)
* `lucky_color` (text)
* `created_at` (timestamptz)
* Unique constraint on (zodiac_sign, date)
### 11. `reports`
Safety — user reports and blocks.
* `id` (uuid, PK)
* `reporter_id` (uuid, FK → profiles.id)
* `reported_id` (uuid, FK → profiles.id)
* `reason` (text)
* `type` (text — report/block)
* `created_at` (timestamptz)
## Pages Breakdown
### Auth Pages (existing, minor tweaks)
* **Welcome** — app branding, "Login" / "Sign Up" CTAs
* **Login** — email + password
* **Register** — email + password + name
* **Forgot Password** — email input → reset link
* **Change Password** — new password form
### Onboarding Pages (NEW)
Multi-step flow after first sign-up, gated by `profiles.is_onboarded`.
1. **Birth Details** — date picker, time picker, place autocomplete → compute zodiac/nakshatra
2. **Preferences** — age range slider, distance, gender, zodiac preferences
3. **Photos** — upload 2-6 photos (camera or gallery)
4. **Bio & Interests** — text input for bio, multi-select interest tags
### Main Tabs (5 tabs)
1. **Discovery (Home)** — Tinder-style swipe cards showing user photo, name, age, zodiac sign, compatibility %. Swipe right = like, left = pass. "Super Like" button.
2. **Matches** — Grid/list of matched profiles. Each card shows avatar, name, compatibility score, last message preview. Tap → opens chat.
3. **Chat** — Conversation list → individual chat with real-time messages via Supabase Realtime. AI icebreaker suggestions.
4. **Horoscope** — Daily horoscope for user's sign. Love/career/general tabs. AI-powered personalized insights.
5. **Profile** — Own profile view (reuse existing profile UI). Edit button → edit screen. Settings gear → settings stack.
### Standalone Screens
* **User Profile [id]** — View another user's full profile + compatibility badge. "Like" / "Pass" / "Super Like" actions.
* **Compatibility Report [id]** — Deep-dive: Guna Milan score (/36), strengths, challenges, AI narrative, house-by-house breakdown.
### Settings Pages (existing, reorganize)
* Settings menu, Account, Notifications, Security, Privacy Policy, Terms, About Us, Contact Us, Community Guidelines.
## AI Integration Points
1. **Compatibility scoring** — Given two users' birth_details, compute Guna Milan + AI narrative (call LLM API from Supabase Edge Function).
2. **Daily horoscope generation** — Cron job (Supabase pg_cron or Edge Function) generates daily horoscope per zodiac sign.
3. **Icebreaker suggestions** — Given two profiles, suggest conversation starters.
4. **Profile insights** — AI-generated personality description based on birth chart.
## Implementation Order
1. Fix folder structure & routing
2. Create Supabase tables (profiles, birth_details, photos, interests, preferences)
3. Onboarding flow
4. Profile service + own profile page (with real data)
5. Create remaining tables (swipes, matches, messages, compatibility_reports, daily_horoscopes, reports)
6. Discovery / swipe page
7. Matches page
8. Chat (with Supabase Realtime)
9. Horoscope page
10. Compatibility reports + AI integration
11. User profile view + settings cleanup
