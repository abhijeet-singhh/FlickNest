# FlickNest — Development Phases

Derived from `AGENTS.md` (§1–§44). Do not create the full tree up front (§43).
Grow into the architecture phase by phase. Complete phases **in order**.

## How to track progress

- Each phase has a top-level checkbox: `- [ ] Phase N ...`.
- Mark a phase done only when **every** item in its `Done when` list is checked.
- Work on **one phase at a time**. Do not start Phase N+1 until Phase N is green.
- Verify each phase with: `pnpm dev`, `pnpm lint`, `pnpm build`.
- If you violate a `Do NOT` rule, stop and fix before continuing.

## Progress overview

- [x] Phase 0 — Baseline hygiene (env, git, scripts)
- [x] Phase 1 — App shell + global states (layout, loading, error, not-found)
- [x] Phase 2 — Shared foundations (config, utils, types, validations, hooks, stores)
- [x] Phase 3 — TMDB integration layer (`lib/tmdb/`)
- [ ] Phase 4 — Reusable UI: `ui/` + `layout/` + `movie/` + home
- [ ] Phase 5 — Details routes: `/movies/[id]` + `/tv/[id]`
- [ ] Phase 6 — Search + Discover with URL state
- [ ] Phase 7 — Database with Drizzle (no movies table)
- [ ] Phase 8 — Server layer pattern: repository → service → action (watchlist slice)
- [ ] Phase 9 — Auth (`lib/auth/` + `(auth)` + protected `(app)` shell)
- [ ] Phase 10 — User library: watchlist, favorites, ratings, history, profile, settings
- [ ] Phase 11 — HTTP API routes (`app/api/`)
- [ ] Phase 12 — Hardening: caching, errors, tests, cleanup

---

## Mental models that never change (from AGENTS.md)

### 1. Two data worlds (§1, §18–§19)

- **TMDB owns:** movies, TV, cast, crew, genres, posters, backdrops, trailers, dates.
- **PostgreSQL owns:** users, profiles, watchlists, favorites, ratings, reviews, history, preferences.
- App DB stores **references** (`tmdb_id + media_type`), not a copy of TMDB.
- Only introduce a local `media` cache table later for caching/analytics/recommendations — not at the start.

### 2. Dependency direction (§3, §20–§24, §38)

```text
UI
 ↓
Application / Server Components
 ↓
Services / Server Actions
 ↓
Repositories
 ↓
Drizzle → PostgreSQL

Application → TMDB Client → TMDB API
```

### 3. Ownership (§37)

| Directory              | Responsibility                                |
| ---------------------- | --------------------------------------------- |
| `app/`                 | Routes, layouts, route composition only       |
| `components/`          | Reusable UI                                   |
| `components/ui/`       | Generic primitives, know nothing about movies |
| `lib/tmdb/`            | TMDB integration                              |
| `lib/db/`              | Database / Drizzle (server-only)              |
| `lib/auth/`            | Auth utilities (server-first)                 |
| `lib/validations/`     | Zod schemas for all browser input             |
| `server/services/`     | Business logic                                |
| `server/repositories/` | DB access only                                |
| `server/actions/`      | Mutations from UI                             |
| `stores/`              | Client/UI state only                          |
| `types/`               | What FlickNest considers a movie/user/etc.    |
| `hooks/`               | Small client hooks                            |
| `config/`              | Static config                                 |
| `drizzle/`             | Generated SQL migrations                      |

### 4. Import rules (§38)

- UI may import: `components`, `types`, `hooks`, `stores`, `utils`.
- Server Components may additionally import: `services`, `tmdb`, `db`, `auth`.
- Client Components must **never** import: `db`, `repositories`, server services, private keys.
- Repositories may import: `db`, `types`.
- Services may import: `repositories`, `tmdb`, `validation`, `types`.
- DB must never import: `components`, `stores`, `app`.

---

## Phase 0 — Baseline hygiene

**Goal:** Reproducible local setup. **Ref:** §39, §43.

**Why:** Secrets, env names, and scripts must exist before TMDB/DB work, otherwise keys leak into client code.

**Build:**

- [x] Create `.env.example` with names only, no secrets:
      `DATABASE_URL=`, `TMDB_API_KEY=` or `TMDB_ACCESS_TOKEN=`, `AUTH_SECRET=`, `NEXT_PUBLIC_APP_URL=`
- [x] Ensure `.env.local` is gitignored and never committed
- [x] Confirm `NEXT_PUBLIC_` prefix is used only for truly browser-safe values
- [x] Add `db:generate`, `db:migrate`, `db:studio` placeholder scripts later in Phase 7 (do not add deps yet)
- [x] Update root `README.md` link/pointer to this file (1 line only)

**Do NOT:**

- [x] Do not put real keys in `.env.example`
- [x] Do not install `drizzle-orm`, `postgres`/`pg`, or auth libs yet
- [x] Do not create empty `lib/db/`, `server/`, `drizzle/` folders yet (§43)

**Done when:**

- [x] `pnpm dev` runs on a fresh clone with `.env.local` present
- [x] `git status` shows no secrets
- [x] New contributor knows which env vars to ask for from `.env.example` alone

---

## Phase 1 — App shell + global states

**Goal:** Real FlickNest shell, no starter template. **Ref:** §4–§6, §32.

**Why:** `app/` is routes + composition, not business logic. Global `loading/error/not-found` prevents ad-hoc `<p>Something went wrong</p>` everywhere.

**Build:**

- [x] `app/layout.tsx` — FlickNest metadata, font, theme wrapper, `navbar` + `footer` slots
- [x] `app/globals.css` — Tailwind v4 theme tokens only, no page-specific CSS
- [x] `app/loading.tsx` — global loading skeleton
- [x] `app/error.tsx` — global error with retry (`"use client"` boundary)
- [x] `app/not-found.tsx` — global 404
- [x] `app/page.tsx` — temporary placeholder that only composes sections (real home comes in Phase 4)
- [x] `components/layout/navbar.tsx`, `footer.tsx`, `mobile-nav.tsx`, `page-container.tsx`
- [x] `config/site.ts`, `config/navigation.ts`
- [x] `lib/constants/routes.ts`, `lib/constants/config.ts`

**Do NOT:**

- [x] Do not fetch TMDB or DB in layout
- [x] Do not put movie markup directly in `page.tsx` (§7: page composes, components render)

**Done when:**

- [x] `/` renders navbar + placeholder + footer with no console errors
- [x] `/does-not-exist` hits custom `not-found.tsx`
- [x] Forced error hits custom `error.tsx` with working retry
- [x] `pnpm lint` + `pnpm build` pass

---

## Phase 2 — Shared foundations

**Goal:** Types, utils, validations, hooks, stores skeleton. **Ref:** §13, §26–§30.

**Why:** This is the vocabulary every later phase reuses. Getting `lib/tmdb/types.ts` vs `types/movie.ts` right now avoids coupling the whole app to TMDB's shape.

**Build:**

- [x] `types/movie.ts`, `types/tv.ts`, `types/search.ts`, `types/api.ts`, `types/user.ts`, `types/watchlist.ts`
- [x] `lib/utils/cn.ts`, `lib/utils/image-url.ts`, `lib/utils/format-date.ts`, `lib/utils/format-runtime.ts`
- [x] `lib/validations/search.ts` (query params, Zod)
- [x] `lib/validations/watchlist.ts`, `lib/validations/profile.ts`, `lib/validations/auth.ts` (schemas only, no wiring yet)
- [x] `lib/constants/genres.ts`
- [x] `hooks/use-debounce.ts`, `hooks/use-mounted.ts`, `hooks/use-media-query.ts`, `hooks/use-mobile.ts`
- [x] `stores/ui.store.ts` (`sidebarOpen`, `mobileMenuOpen`, `activeModal`)
- [x] `stores/player.store.ts` (`isPlayerOpen`, `currentTrailer`, `volume`, `muted`)
- [x] `stores/search.store.ts` (input text only, **not** results), `stores/filter.store.ts` (ephemeral UI only)
- [x] `components/ui/` — `button.tsx`, `input.tsx`, `badge.tsx`, `skeleton.tsx`, `spinner.tsx`, `dialog.tsx`, `dropdown.tsx`

**Key rules:**

- [x] `lib/tmdb/types.ts` = what TMDB gives us. `types/*` = what FlickNest thinks. Map between them, never `any`.
- [x] Zustand = client/UI state only. No `trendingMovies`, `searchResults`, `movieDetails` in stores (§28).
- [x] Hooks stay small and client-oriented. No `useMovies()` that fetches + mutates + talks to DB (§29).

**Done when:**

- [x] Every util/hook/store has a single import path and no circular imports
- [x] `Button`/`Input`/`Skeleton` render in isolation with no movie knowledge (§8)
- [x] Types compile with `strict: true`, zero `any` for domain models

---

## Phase 3 — TMDB integration layer

**Goal:** Only place in the app that knows TMDB exists. **Ref:** §10–§12, §33, §36, §39.

**Why:** UI must never know base URLs, headers, or `poster_path` vs `posterUrl`. Centralize auth, errors, and mapping here.

**Build:**

- [x] `lib/tmdb/constants.ts` — base URL, image sizes, language defaults
- [x] `lib/tmdb/client.ts` — `request()` with base URL + auth header + centralized error handling + no key leakage to client
- [x] `lib/tmdb/types.ts` — `TMDBMovie`, `TMDBTV`, `TMDBMovieDetails`, `TMDBCredits`, `TMDBSearchResponse`, `TMDBGenre`
- [x] `lib/tmdb/endpoints.ts` — `getTrending()`, `getPopularMovies()`, `getPopularTv()`, `getMovieDetails()`, `getTvDetails()`, `searchMulti()`, `discoverMovies()`, `discoverTv()`, `getRecommendations()`, `getCredits()`
- [x] `lib/tmdb/mappers.ts` — `poster_path → posterUrl`, `backdrop_path → backdropUrl`, `vote_average → rating`, `release_date → releaseDate`
- [x] `lib/tmdb/index.ts` — public barrel exports only
- [x] `server/services/movie.service.ts` + `search.service.ts` — thin TMDB-only services (no DB imports)

**Do NOT:**

- [x] Do not call `fetch("https://api.themoviedb.org/...")` outside `lib/tmdb/`
- [x] Do not import TMDB client from a Client Component with a secret key
- [x] Do not store TMDB payloads verbatim in UI state — always map first

**Done when:**

- [x] Server Component can call `getTrending()` → mapped domain objects → render, with no TMDB field names leaking into `components/`
- [x] 401/429/5xx from TMDB surface as typed errors, not crashes
- [x] TMDB calls are cacheable/revalidatable; no per-request secrets in client bundle

---

## Phase 4 — Reusable UI: `ui/` + `layout/` + `movie/` + home

**Goal:** First real public experience, server-fetched. **Ref:** §6–§9, §26, §28, §33.

**Why:** Proves the clean flow: route → TMDB service → mapper → Server Component → UI. No Zustand, no Postgres needed (§36).

**Build:**

- [ ] `components/movie/` — `movie-card.tsx`, `movie-grid.tsx`, `movie-row.tsx`, `movie-poster.tsx`, `movie-meta.tsx`, `movie-rating.tsx`, `movie-actions.tsx` (actions UI only for now, no mutations)
- [ ] `components/home/` — `hero-section.tsx`, `trending-section.tsx`, `popular-section.tsx`, `upcoming-section.tsx`
- [ ] `app/(public)/page.tsx` — compose home sections, fetch on server with caching/revalidation
- [ ] `components/providers/` — client providers (Zustand/context) mounted once in layout, never in Server Components

**Do NOT:**

- [ ] Do not create `movieStore` with `trendingMovies`/`popularMovies` (§28)
- [ ] Do not make `MovieButton`; use generic `Button` (§8)
- [ ] Do not query DB from these components (§23)

**Done when:**

- [ ] `/` shows hero + trending + popular from live TMDB data
- [ ] Sections use `loading.tsx` skeletons, not blank screens
- [ ] No client store holds server data; refresh produces same UI

---

## Phase 5 — Details routes

**Goal:** `/movies/[id]` and `/tv/[id]` done right. **Ref:** §7, §32–§33, §36.

**Why:** Reference implementation for route composition: thin page that fetches in parallel and delegates to `components/details/`.

**Build:**

- [ ] `app/(public)/movies/page.tsx` (browse placeholder or redirect to discover)
- [ ] `app/(public)/movies/[id]/page.tsx` — fetch movie + credits + recommendations in parallel, then render
- [ ] `app/(public)/movies/[id]/loading.tsx`, `not-found.tsx`
- [ ] `app/(public)/tv/page.tsx`, `app/(public)/tv/[id]/page.tsx`, `loading.tsx`, `not-found.tsx`
- [ ] `components/details/` — `details-hero.tsx`, `details-header.tsx`, `details-meta.tsx`, `details-overview.tsx`, `cast-list.tsx`, `trailer-section.tsx` (wired to `player.store.ts`), `similar-section.tsx`, `recommendation-section.tsx`

**Do NOT:**

- [ ] Do not put hundreds of lines of markup in `page.tsx` — page fetches + composes (§7)
- [ ] Do not reuse one generic `[id]` route for both movies and TV if types diverge

**Done when:**

- [ ] `/movies/550` renders hero + meta + overview + cast + trailer + recommendations
- [ ] Invalid ID renders route-level `not-found.tsx`, failed fetch renders `error.tsx`
- [ ] Trailer open/close/volume lives in `player.store.ts`, movie data does not

---

## Phase 6 — Search + Discover with URL state

**Goal:** Shareable, bookmarkable filtering. **Ref:** §30, §34, §28.

**Why:** Filters belong in the URL (`/discover?genre=28&year=2026&sort=rating`), not in a store that vanishes on reload.

**Build:**

- [ ] `app/(public)/search/page.tsx` — reads `?q=`, validates with `lib/validations/search.ts`, server-fetches via `searchMulti()`
- [ ] `components/search/` — `search-input.tsx` (debounced via `use-debounce.ts`), `search-results.tsx`, `search-filters.tsx`, `search-empty.tsx`
- [ ] `app/(public)/discover/page.tsx` — reads `?genre=&year=&sort=`, validates, calls `discoverMovies()/discoverTv()`
- [ ] `components/discover/` — `discover-filters.tsx`, `genre-filter.tsx`, `year-filter.tsx`, `sort-filter.tsx`
- [ ] Back/forward, refresh, and pasted URL all reproduce the same results

**Do NOT:**

- [ ] Do not store `searchResults` or canonical filters in Zustand as source of truth (§28)
- [ ] Do not trust raw query params — always parse with Zod first (§30)

**Done when:**

- [ ] Typing in search updates URL (debounced) and results without full-page jank
- [ ] Empty query shows `search-empty.tsx`, not an error
- [ ] Copy-pasting `/discover?genre=28&year=2026&sort=rating` reproduces the view

---

## Phase 7 — Database with Drizzle

**Goal:** Postgres owns app state, nothing else. **Ref:** §14–§19, §40.

**Why:** First backend milestone. Schema stays narrow: users + join tables keyed by `tmdb_id`. No `movies` table (§18).

**Build:**

- [ ] Install `drizzle-orm` + driver (`postgres` or `pg`) + `drizzle-kit`; add `drizzle.config.ts`
- [ ] `lib/db/index.ts` — server-only connection (guard against client import)
- [ ] `lib/db/schema/users.ts`, `profiles.ts`, `watchlists.ts` (+ `watchlist_items`), `favorites.ts`, `history.ts`, `ratings.ts`, `reviews.ts`, `index.ts`
- [ ] `lib/db/relations.ts`
- [ ] `lib/db/queries/` — `users.ts`, `watchlists.ts`, `favorites.ts`, `history.ts`, `ratings.ts` (typed helpers only, no business rules)
- [ ] `drizzle/` migrations generated + applied locally
- [ ] Minimal seed for local dev (1 test user shape, no real passwords in repo)

**Schema shape (initial):**

- [ ] `users`: `id`, `email`, `username`, auth identity, `created_at`, `updated_at`
- [ ] `watchlist_items`: `id`, `user_id`, `tmdb_id`, `media_type`, `created_at`
- [ ] Same reference pattern for `favorites`, `ratings`, `reviews`, `watch_history`

**Do NOT:**

- [ ] Do not create `movies`/`media` tables yet (§19 — only later for caching/analytics)
- [ ] Do not import `lib/db/` from any Client Component (§15, §38)
- [ ] Do not write `db.select()` in pages — pages call services (§23)

**Done when:**

- [ ] `drizzle-kit generate` + `migrate` succeed from scratch
- [ ] `lib/db/queries/` functions round-trip in a local script (create → read → delete)
- [ ] `pnpm build` still passes with DB code tree-shaken out of client bundle

---

## Phase 8 — Server layer pattern (watchlist slice)

**Goal:** Prove the canonical mutation flow once, then repeat it. **Ref:** §20–§24, §35.

```text
WatchlistButton → Server Action → Service → Repository → Drizzle → PostgreSQL
```

**Build:**

- [ ] `server/repositories/watchlist.repository.ts` — `findByUser()`, `findItem()`, `create()`, `delete()`, `exists()`
- [ ] `server/services/watchlist.service.ts` — `addToWatchlist(userId, tmdbId)`: validate → auth check → duplicate check → insert
- [ ] `server/actions/watchlist.actions.ts` — `addToWatchlist()`, `removeFromWatchlist()` with Zod validation + `getCurrentUser()` stub (real session in Phase 9)
- [ ] `components/watchlist/watchlist-button.tsx` — client button calling the action, optimistic UI, error toast
- [ ] Mount button on details page (read-only state until auth lands is fine)

**Do NOT:**

- [ ] Do not let the client pass `userId` — server derives identity from session (§31)
- [ ] Do not put business rules in the repository or SQL in the component

**Done when:**

- [ ] Clicking Add → row `(user_id, tmdb_id, media_type)` exists; clicking again is idempotent (no duplicates)
- [ ] Unauthenticated call is rejected server-side
- [ ] Invalid `tmdbId`/`mediaType` fails Zod before touching DB

---

## Phase 9 — Auth

**Goal:** Real identity for all protected operations. **Ref:** §31, §9 (auth components), §5 (route groups).

**Why:** Everything in Phases 10–11 depends on `getCurrentUser()`. Frontend never dictates who the user is.

**Build:**

- [ ] `lib/auth/config.ts`, `session.ts`, `permissions.ts`, `helpers.ts` (+ `getCurrentUser()`)
- [ ] `app/(auth)/login/page.tsx`, `register/page.tsx`, `forgot-password/page.tsx`, `reset-password/page.tsx`
- [ ] `components/auth/login-form.tsx`, `register-form.tsx`, `auth-guard.tsx`
- [ ] `app/(app)/layout.tsx` — protected shell, redirects unauthenticated users
- [ ] Wire `server/actions/*` to real `getCurrentUser()` (replace Phase 8 stub)
- [ ] Session handling + password hashing/identity per chosen auth system

**Do NOT:**

- [ ] Do not read session on the client to authorize — server re-checks on every mutation (§31)
- [ ] Do not store auth tokens in Zustand

**Done when:**

- [ ] Register → login → visit protected route → logout works end to end
- [ ] Direct navigation to `/(app)/*` without session redirects to login
- [ ] Every server action rejects when `getCurrentUser()` is null

---

## Phase 10 — User library

**Goal:** Repeat the Phase 8 pattern for every user-owned feature. **Ref:** §31, §35 (repeat), §6 (`(app)` routes).

**Build:**

- [ ] `server/repositories/` — `favorite.repository.ts`, `history.repository.ts`, `rating.repository.ts`, `user.repository.ts`
- [ ] `server/services/` — `favorite.service.ts`, `history.service.ts`, `rating.service.ts`, `user.service.ts`
- [ ] `server/actions/` — `favorite.actions.ts`, `history.actions.ts`, `profile.actions.ts`
- [ ] `app/(app)/watchlist/page.tsx` + `components/watchlist/watchlist-grid.tsx`, `watchlist-empty.tsx`
- [ ] `app/(app)/favorites/page.tsx` + `components/favorites/*`
- [ ] `app/(app)/history/page.tsx`, `app/(app)/profile/page.tsx`, `app/(app)/settings/page.tsx`
- [ ] Movie/TV details pages show live watchlist/favorite/rating state for logged-in users

**Do NOT:**

- [ ] Do not fetch other users' libraries — every query is scoped by session user
- [ ] Do not cache user-specific pages as public; they are dynamic (§33)

**Done when:**

- [ ] Logged-in user can add/remove watchlist + favorites, rate, and see history persist across reloads
- [ ] Empty libraries show designed empty states, not errors
- [ ] Each feature follows the identical action → service → repository shape (no one-off SQL in pages)

---

## Phase 11 — HTTP API routes

**Goal:** HTTP surface for non-web clients. **Ref:** §25.

**Why:** Server Actions serve the web app; Route Handlers serve mobile/extensions/third parties. Both call the same services.

**Build:**

- [ ] `app/api/watchlist/route.ts` — `GET` (list), `POST` (add), `DELETE` (remove)
- [ ] `app/api/favorites/route.ts`, `app/api/history/route.ts`, `app/api/ratings/route.ts`
- [ ] Auth via session/cookies on every handler; Zod validation on every input
- [ ] Consistent `types/api.ts` response envelope + status codes

**Do NOT:**

- [ ] Do not duplicate business logic in handlers — call `server/services/*`
- [ ] Do not expose DB errors verbatim to clients

**Done when:**

- [ ] `curl` with session can list/add/remove watchlist via `/api/watchlist`
- [ ] Unauthenticated requests return `401`, invalid bodies return `400` with Zod details
- [ ] Web UI still works unchanged (proves shared service layer)

---

## Phase 12 — Hardening

**Goal:** Production-ready polish. **Ref:** §32–§33, §41.

**Build:**

- [ ] Caching audit: TMDB trending/details cached + revalidated; user data `dynamic` / `no-store` (§33)
- [ ] Route-level `loading.tsx` / `error.tsx` / `not-found.tsx` for every segment; empty/unauthorized/forbidden states designed
- [ ] `tests/unit/` — utils, mappers, validations
- [ ] `tests/integration/` — DB queries, auth gating, API handlers
- [ ] `tests/e2e/` — `auth.spec.ts`, `search.spec.ts`, `movie-details.spec.ts`, `watchlist.spec.ts` covering: register → login → search → open movie → add/remove watchlist → favorite → rate → logout (§41)
- [ ] Remove dead code, starter assets, and any `console.log`; final `pnpm lint` + `pnpm build` clean
- [ ] Update `README.md` with setup, env, scripts, and architecture pointer

**Done when:**

- [ ] Full E2E happy path passes locally
- [ ] No route shows a blank screen or raw exception
- [ ] New clone → install → env → migrate → dev → test works from docs alone

---

## Phase entry checklist (copy before starting any phase)

- [ ] I can state the phase goal in one sentence
- [ ] I know which AGENTS.md sections apply
- [ ] I know which folders I am allowed to create (§43: only what this phase needs)
- [ ] I know what must stay untouched until a later phase
- [ ] I know how I will verify `Done when`
