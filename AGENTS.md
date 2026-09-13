<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Flicknest Project Instructions

## 1. The architecture at a glance

The final application should conceptually look like this:
┌──────────────────────┐
│ USER / WEB │
└──────────┬───────────┘
│
▼
┌──────────────────────┐
│ Next.js │
│ App Router │
└──────────┬───────────┘
│
┌─────────────────────┼─────────────────────┐
│ │ │
▼ ▼ ▼
Server Components Client Components Route Handlers
│ │ │
│ ▼ │
│ Zustand │
│ │ │
└──────────┬──────────┘ │
▼ │
Application Layer │
│ │
┌─────────────┼─────────────┐ │
│ │ │ │
▼ ▼ ▼ ▼
TMDB Services Auth API endpoints
Client │
│ │
│ ▼
│ Repositories
│ │
│ ▼
│ Drizzle ORM
│ │
│ ▼
│ PostgreSQL
│
▼
TMDB API
There are therefore two different data worlds:

### External data

TMDB
owns:
movies
TV shows
cast
crew
genres
posters
backdrops
trailers
release dates
etc.

### Your application data

PostgreSQL
owns:
users
profiles
watchlists
favorites
ratings
reviews
history
preferences
etc.
This distinction is extremely important.

## 2. The complete project structure

This is the structure I would ultimately build toward:

FlickNest/
│
├── app/
│ │
│ ├── (public)/
│ │ ├── page.tsx
│ │ ├── search/
│ │ │ └── page.tsx
│ │ │
│ │ ├── discover/
│ │ │ └── page.tsx
│ │ │
│ │ ├── movies/
│ │ │ ├── page.tsx
│ │ │ └── [id]/
│ │ │ ├── page.tsx
│ │ │ ├── loading.tsx
│ │ │ └── not-found.tsx
│ │ │
│ │ └── tv/
│ │ ├── page.tsx
│ │ └── [id]/
│ │ ├── page.tsx
│ │ ├── loading.tsx
│ │ └── not-found.tsx
│ │
│ ├── (auth)/
│ │ ├── login/
│ │ │ └── page.tsx
│ │ ├── register/
│ │ │ └── page.tsx
│ │ ├── forgot-password/
│ │ │ └── page.tsx
│ │ └── reset-password/
│ │ └── page.tsx
│ │
│ ├── (app)/
│ │ ├── layout.tsx
│ │ │
│ │ ├── watchlist/
│ │ │ └── page.tsx
│ │ │
│ │ ├── favorites/
│ │ │ └── page.tsx
│ │ │
│ │ ├── history/
│ │ │ └── page.tsx
│ │ │
│ │ ├── profile/
│ │ │ └── page.tsx
│ │ │
│ │ └── settings/
│ │ └── page.tsx
│ │
│ ├── api/
│ │ ├── auth/
│ │ │ └── ...
│ │ │
│ │ ├── watchlist/
│ │ │ └── route.ts
│ │ │
│ │ ├── favorites/
│ │ │ └── route.ts
│ │ │
│ │ ├── history/
│ │ │ └── route.ts
│ │ │
│ │ └── ratings/
│ │ └── route.ts
│ │
│ ├── layout.tsx
│ ├── not-found.tsx
│ ├── error.tsx
│ ├── loading.tsx
│ └── globals.css
│
├── components/
│ │
│ ├── ui/
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ ├── dialog.tsx
│ │ ├── dropdown.tsx
│ │ ├── badge.tsx
│ │ ├── skeleton.tsx
│ │ ├── spinner.tsx
│ │ └── ...
│ │
│ ├── layout/
│ │ ├── navbar.tsx
│ │ ├── footer.tsx
│ │ ├── mobile-nav.tsx
│ │ └── page-container.tsx
│ │
│ ├── movie/
│ │ ├── movie-card.tsx
│ │ ├── movie-grid.tsx
│ │ ├── movie-row.tsx
│ │ ├── movie-poster.tsx
│ │ ├── movie-rating.tsx
│ │ ├── movie-actions.tsx
│ │ └── movie-meta.tsx
│ │
│ ├── details/
│ │ ├── details-hero.tsx
│ │ ├── details-header.tsx
│ │ ├── details-meta.tsx
│ │ ├── details-overview.tsx
│ │ ├── cast-list.tsx
│ │ ├── trailer-section.tsx
│ │ ├── similar-section.tsx
│ │ └── recommendation-section.tsx
│ │
│ ├── search/
│ │ ├── search-input.tsx
│ │ ├── search-results.tsx
│ │ ├── search-filters.tsx
│ │ └── search-empty.tsx
│ │
│ ├── discover/
│ │ ├── discover-filters.tsx
│ │ ├── genre-filter.tsx
│ │ ├── year-filter.tsx
│ │ └── sort-filter.tsx
│ │
│ ├── home/
│ │ ├── hero-section.tsx
│ │ ├── trending-section.tsx
│ │ ├── popular-section.tsx
│ │ ├── upcoming-section.tsx
│ │ └── new-on-flicknest-section.tsx
│ │
│ ├── watchlist/
│ │ ├── watchlist-button.tsx
│ │ ├── watchlist-grid.tsx
│ │ └── watchlist-empty.tsx
│ │
│ ├── favorites/
│ │ └── ...
│ │
│ ├── auth/
│ │ ├── login-form.tsx
│ │ ├── register-form.tsx
│ │ └── auth-guard.tsx
│ │
│ └── providers/
│ └── ...
│
├── lib/
│ │
│ ├── tmdb/
│ │ ├── client.ts
│ │ ├── endpoints.ts
│ │ ├── constants.ts
│ │ ├── types.ts
│ │ ├── mappers.ts
│ │ └── index.ts
│ │
│ ├── db/
│ │ ├── index.ts
│ │ ├── schema/
│ │ │ ├── users.ts
│ │ │ ├── profiles.ts
│ │ │ ├── watchlists.ts
│ │ │ ├── favorites.ts
│ │ │ ├── history.ts
│ │ │ ├── ratings.ts
│ │ │ ├── reviews.ts
│ │ │ └── index.ts
│ │ │
│ │ ├── queries/
│ │ │ ├── users.ts
│ │ │ ├── watchlists.ts
│ │ │ ├── favorites.ts
│ │ │ ├── history.ts
│ │ │ └── ratings.ts
│ │ │
│ │ └── relations.ts
│ │
│ ├── auth/
│ │ ├── config.ts
│ │ ├── session.ts
│ │ ├── permissions.ts
│ │ └── helpers.ts
│ │
│ ├── validations/
│ │ ├── auth.ts
│ │ ├── search.ts
│ │ ├── watchlist.ts
│ │ └── profile.ts
│ │
│ ├── utils/
│ │ ├── cn.ts
│ │ ├── format-date.ts
│ │ ├── format-runtime.ts
│ │ └── image-url.ts
│ │
│ └── constants/
│ ├── routes.ts
│ ├── genres.ts
│ └── config.ts
│
├── server/
│ │
│ ├── services/
│ │ ├── movie.service.ts
│ │ ├── search.service.ts
│ │ ├── user.service.ts
│ │ ├── watchlist.service.ts
│ │ ├── favorite.service.ts
│ │ ├── history.service.ts
│ │ └── rating.service.ts
│ │
│ ├── repositories/
│ │ ├── user.repository.ts
│ │ ├── watchlist.repository.ts
│ │ ├── favorite.repository.ts
│ │ ├── history.repository.ts
│ │ └── rating.repository.ts
│ │
│ └── actions/
│ ├── watchlist.actions.ts
│ ├── favorite.actions.ts
│ ├── history.actions.ts
│ └── profile.actions.ts
│
├── stores/
│ ├── ui.store.ts
│ ├── search.store.ts
│ ├── player.store.ts
│ └── filter.store.ts
│
├── types/
│ ├── movie.ts
│ ├── tv.ts
│ ├── user.ts
│ ├── watchlist.ts
│ ├── search.ts
│ └── api.ts
│
├── hooks/
│ ├── use-debounce.ts
│ ├── use-media-query.ts
│ ├── use-mobile.ts
│ └── use-mounted.ts
│
├── config/
│ ├── site.ts
│ └── navigation.ts
│
├── public/
│ ├── images/
│ ├── icons/
│ └── ...
│
├── drizzle/
│ ├── migrations/
│ └── meta/
│
├── tests/
│ ├── unit/
│ ├── integration/
│ └── e2e/
│
├── .env.example
├── .env.local
├── .gitignore
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md

That's the destination architecture.
But I would not create all of these folders today.
We'll grow into it.

## 3. The most important architectural rule

The biggest mistake you could make is treating this as:

app/
pages
components
api
database
everything

Instead, separate your application into layers.
I want FlickNest to have roughly this dependency direction:

UI
│
▼
Application
│
┌──────────┴──────────┐
▼ ▼
Services Server Actions
│ │
▼ ▼
Repositories Repositories
│ │
└──────────┬──────────┘
▼
Database

And external services:

Application
│
▼
TMDB Client
│
▼
TMDB

The UI should not directly talk to PostgreSQL.

## 4. What goes inside app/

This is where Next.js's architecture differs from your old React application.
Your app/ directory represents routes and route-specific composition, not your entire application.
Next.js uses folders as route segments and page.tsx as the actual route entry point. Layouts can then be nested around those routes. Next.js
For example:
app/
└── movies/
└── [id]/
└── page.tsx
means:
/movies/123

## 5. Route groups

I'd heavily use route groups.
For example:
app/
├── (public)/
├── (auth)/
└── (app)/
The parentheses mean these are organizational route groups rather than URL segments.
So:
app/(public)/search/page.tsx
still becomes:
/search
not:
/public/search
This gives you clean separation without polluting URLs.

## 6. Public application

I'd put your movie experience here:
app/(public)/
For example:
app/(public)/
├── page.tsx
├── search/
├── discover/
├── movies/
└── tv/
These pages should be primarily concerned with rendering the movie experience.
They shouldn't contain huge TMDB API implementations.

## 7. Movie page architecture

Take:
/movies/550
You might have:
app/(public)/movies/[id]/page.tsx
The page should conceptually be:
MoviePage
│
├── fetch movie
│
├── fetch credits
│
├── fetch recommendations
│
└── render
│
├── DetailsHero
├── DetailsMeta
├── DetailsOverview
├── CastList
├── TrailerSection
└── RecommendationSection
The page shouldn't contain hundreds of lines of markup.

## 8. components/

This becomes your reusable UI layer.
I would not make:
components/
Header.tsx
Card.tsx
Search.tsx
Movie.tsx
etc.
Instead organize around responsibility.
components/ui
These are your generic primitives:
Button
Input
Dialog
Badge
Dropdown
Tabs
Skeleton
Spinner
Tooltip
These should know nothing about movies.
Bad:
<MovieButton />
Good:
<Button />

## 9. Movie-specific components

Then:
components/movie/
contains components that understand movie data.
For example:
MovieCard
MovieGrid
MovieRow
MoviePoster
MovieMeta
MovieRating
MovieActions
This is where you can build the reusable visual language of FlickNest.

## 10. lib/tmdb

This is one of the most important directories.
Your old application had API code under:
src/api/
In v2 I'd turn that into a proper external-service client.
lib/tmdb/
├── client.ts
├── endpoints.ts
├── constants.ts
├── types.ts
├── mappers.ts
└── index.ts
client.ts
Responsible for communicating with TMDB.
Conceptually:
tmdbClient
↓
request()
↓
TMDB API
This is where you centralize:

- base URL
- authentication
- headers
- error handling
- request behavior
  endpoints.ts
  This contains domain operations:
  getTrending()
  getPopularMovies()
  getPopularTv()
  getMovieDetails()
  getTvDetails()
  searchMulti()
  discoverMovies()
  discoverTv()
  getRecommendations()
  getCredits()
  This keeps your UI from knowing how TMDB works.

## 11. TMDB types

Don't use any.
Have:
types.ts
with types such as:
TMDBMovie
TMDBTV
TMDBMovieDetails
TMDBCredits
TMDBSearchResponse
TMDBGenre
Then your application can transform those into your own domain types.

## 12. Why mappers.ts matters

This is an advanced but very useful layer.
TMDB might return:
poster_path
backdrop_path
vote_average
release_date
Your application might prefer:
posterUrl
backdropUrl
rating
releaseDate
So:
TMDB response
↓
mapper
↓
FlickNest domain object
This prevents your entire application from becoming tightly coupled to TMDB's API format.

## 13. types/

This is where your application-level types live.
For example:
types/
├── movie.ts
├── tv.ts
├── user.ts
├── watchlist.ts
├── history.ts
└── api.ts
There is an important distinction:
lib/tmdb/types.ts
means:
What TMDB gives us.

while:
types/movie.ts
means:
What FlickNest considers a movie.

That separation is excellent for long-term maintainability.

## 14. PostgreSQL architecture

Now the backend side.
I'd structure it as:
lib/db/
├── index.ts
├── schema/
├── queries/
└── relations.ts
Drizzle's PostgreSQL documentation similarly separates the database connection/schema and migration configuration, and its current PostgreSQL integrations support PostgreSQL drivers such as pg and postgres.js. Drizzle ORM

## 15. db/index.ts

This is your database connection.
Conceptually:
PostgreSQL
↑
│
Drizzle
↑
│
lib/db/index.ts
Only server-side code should access this.
Never import the database client into a client component.

## 16. Database schema

Instead of one gigantic:
schema.ts
I'd eventually split it:
schema/
├── users.ts
├── profiles.ts
├── watchlists.ts
├── favorites.ts
├── history.ts
├── ratings.ts
├── reviews.ts
└── index.ts
This is easier to navigate.

## 17. Database model

The initial schema could look approximately like:
users
│
├── id
├── email
├── username
├── password_hash / auth identity
├── created_at
└── updated_at
│
├──────────────┐
│ │
▼ ▼
profiles watchlists
│
▼
watchlist_items
Then:
users
│
├── favorites
│
├── ratings
│
├── reviews
│
└── watch_history

## 18. Important: don't make a movies table immediately

I would not start with:
movies
containing every TMDB movie.
Why?
Because TMDB is already your movie database.
Your database primarily needs to remember:
user 123
added TMDB movie 550
to watchlist
So:
watchlist_items

id
user_id
tmdb_id
media_type
created_at
is enough initially.
That keeps your database focused on application-owned state.

## 19. When should you create a local movies table?

Later, if you want:

- local caching
- analytics
- recommendation engine
- reviews
- internal search
- popularity calculations
- custom metadata
  then you can introduce:
  media
  instead of blindly duplicating TMDB.
  For example:
  media
  ├── id
  ├── tmdb_id
  ├── type
  ├── title
  ├── cached_metadata
  ├── created_at
  └── updated_at
  But this is a later optimization.
  Don't build it just because you can.

## 20. server/

This is the layer I especially want you to understand.
You don't need Express to have a backend architecture.
You can have:
server/
├── services/
├── repositories/
└── actions/
inside your Next.js application.

## 21. Services

Services represent business logic.
For example:
watchlist.service.ts
might conceptually do:
addToWatchlist(userId, tmdbId)
│
├── validate
├── check authentication
├── check duplicate
└── insert
The service should not care whether the request came from:
API route
Server Action
future mobile API
That's why this layer is useful.

## 22. Repositories

Repositories are responsible for database operations.
For example:
watchlist.repository.ts
contains things like:
findByUser()
findItem()
create()
delete()
exists()
So your architecture becomes:
UI
↓
Server Action
↓
Watchlist Service
↓
Watchlist Repository
↓
Drizzle
↓
PostgreSQL
That's a clean backend architecture without needing another backend framework.

## 23. Why not query Drizzle directly from components?

Avoid:
page.tsx
↓
db.select(...)
everywhere.
It's tempting.
But then six months later:
page A
page B
API route
server action
cron job
may all implement slightly different versions of the same database logic.
Instead:
page
↓
service
↓
repository
↓
db
gives you one place for that logic.

## 24. Server Actions

For mutations, you can use Server Actions where appropriate.
For example:
server/actions/watchlist.actions.ts
could expose:
addToWatchlist()
removeFromWatchlist()
The flow becomes:
Movie Page
│
▼
WatchlistButton
│
▼
Server Action
│
▼
Watchlist Service
│
▼
Repository
│
▼
PostgreSQL
That's very clean.

## 25. Route handlers

Then why do you need:
app/api/
?
Because sometimes you want an HTTP endpoint.
For example:
/api/watchlist
/api/history
/api/ratings
This becomes useful if you eventually have:
mobile app
browser extension
third-party client
or need an external HTTP API.
So:
Server Action
Good for:
FlickNest web application → FlickNest backend
Route Handler
Good for:
HTTP client → FlickNest API

## 26. Zustand architecture

This part requires care because you're using Next.js.
Zustand's own Next.js guidance warns against treating a store as shared global server state and recommends request-safe store creation; it also explicitly says React Server Components should not read from or write to Zustand stores. Zustand Docs
Therefore don't do this:
Everything
↓
Zustand
Instead:
STATE

        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼

Server/Application Client/UI
state state
│ │
▼ ▼
PostgreSQL/TMDB Zustand

## 27. What should Zustand contain?

Good examples:
ui.store.ts
sidebarOpen
mobileMenuOpen
activeModal
search.store.ts
Potentially:
searchInput
but preferably don't put actual server results here.
filter.store.ts
For temporary UI state:
selectedGenre
selectedYear
selectedSort
although URL search parameters should often be the source of truth for shareable filters.
player.store.ts
For:
isPlayerOpen
currentTrailer
volume
muted
etc.

## 28. What should NOT go into Zustand?

Don't make:
movieStore
that contains:
trendingMovies
popularMovies
movieDetails
searchResults
recommendations
as your primary architecture.
That's essentially rebuilding the Redux architecture you are trying to escape.
For server data, prefer:
Server Components +
server-side fetching +
URL state +
proper caching/revalidation
and reserve Zustand for client state.

## 29. hooks/

Your custom hooks should be small and client-oriented:
hooks/
├── use-debounce.ts
├── use-media-query.ts
├── use-mobile.ts
└── use-mounted.ts
Don't put API/business logic into hooks.
Avoid:
useMovies()
that secretly performs five API calls, modifies global state and talks to the database.
Keep responsibilities clear.

## 30. Validation

Have:
lib/validations/
For example:
auth.ts
watchlist.ts
profile.ts
search.ts
Zod schemas can validate:
forms
server actions
API input
query parameters
This is especially important because anything coming from the browser should be treated as untrusted input.

## 31. Authentication architecture

Authentication should eventually look like:
Browser
│
▼
Login Form
│
▼
Validation
│
▼
Auth System
│
▼
Session
│
▼
User
Then protected operations:
Browser
│
▼
Server Action
│
▼
getCurrentUser()
│
├── not authenticated → reject
│
└── authenticated
│
▼
Service
│
▼
Database
The frontend should never be trusted to tell your server which user is making a request.
The server gets the authenticated identity from the session.

## 32. Error handling

At the application level:
app/
├── error.tsx
├── not-found.tsx
└── loading.tsx
Then route-specific states:
movies/[id]/
├── page.tsx
├── loading.tsx
└── not-found.tsx
You want proper states for:
loading
error
empty
not found
unauthorized
forbidden
Not just:
<p>Something went wrong</p>
everywhere.

## 33. Caching strategy

You should think about data according to how frequently it changes.
TMDB trending
Can be cached.
TMDB
↓
Next server
↓
cache/revalidation
↓
UI
Movie details
Can also be cached/revalidated.
User watchlist
Should be user-specific and dynamically retrieved.
User history
Dynamic.
Profile
Dynamic.
So don't apply one caching strategy to everything.

## 34. URL state

This is another thing I'd improve from the Redux architecture.
For discover:
/discover?genre=28&year=2026&sort=rating
The URL becomes the source of truth.
Advantages:
shareable
bookmarkable
refresh-safe
SEO-friendly
back-button friendly
instead of:
Redux/Zustand
↓
filters
that disappear when the page reloads.

## 35. Example: complete watchlist flow

This is the kind of architecture you should understand before implementing it.
User clicks:
Add to Watchlist
Step 1
Client component:
WatchlistButton
calls:
addToWatchlist()
Step 2
Server Action:
watchlist.actions.ts
gets the authenticated user.
Step 3
Validation:
tmdbId
mediaType
are validated.
Step 4
Service:
watchlist.service.ts
applies business rules.
Step 5
Repository:
watchlist.repository.ts
performs the database query.
Step 6
Drizzle:
INSERT INTO watchlist_items ...
Step 7
PostgreSQL stores:
user_id
tmdb_id
media_type
created_at
Step 8
UI updates.
That's the architecture you want repeated across user-owned features.

## 36. Example: movie details flow

Now compare that to movie data.
User visits:
/movies/550
Flow:
Next.js route
│
▼
Movie page
│
▼
TMDB service
│
▼
TMDB client
│
▼
TMDB API
│
▼
mapper
│
▼
Movie domain model
│
▼
Server Component
│
▼
UI
No Zustand.
No PostgreSQL required.
That's the separation I want.

## 37. Directory ownership rules

This will keep the codebase sane.
Directory Responsibility
app/ Routes, layouts, route composition
components/ Reusable UI
components/ui/ Generic primitives
lib/tmdb/ TMDB integration
lib/db/ Database/Drizzle
lib/auth/ Authentication utilities
lib/validations/ Zod schemas
server/services/ Business logic
server/repositories/ Database access
server/actions/ Mutations from UI
stores/ Client state
types/ Application types
hooks/ Small reusable client hooks
config/ Static configuration
public/ Static assets
drizzle/ Generated SQL migrations

## 38. Dependency rules

I would enforce these mentally from day one.
UI can import:
components
types
hooks
stores
utils
Server components can additionally import:
services
TMDB
database
auth
Client components cannot import:
db
repositories
server services
private API keys
Repositories can import:
db
types
Services can import:
repositories
TMDB
validation
types
Database should never import:
components
stores
app
That gives you a one-directional architecture.

## 39. Environment variables

Eventually:
.env.local
something like:
DATABASE_URL=

TMDB_API_KEY=
TMDB_ACCESS_TOKEN=

AUTH_SECRET=

NEXT_PUBLIC_APP_URL=
And:
.env.example
contains the names but never the secrets.
Public variables should only receive the NEXT_PUBLIC_ prefix when they genuinely need to be exposed to the browser.

## 40. Drizzle structure

I would follow a structure close to:
lib/db/
├── index.ts
├── schema/
│ ├── users.ts
│ ├── profiles.ts
│ ├── watchlists.ts
│ ├── favorites.ts
│ ├── history.ts
│ ├── ratings.ts
│ └── index.ts
│
├── relations.ts
│
└── queries/
├── users.ts
├── watchlists.ts
├── favorites.ts
├── history.ts
└── ratings.ts
and:
drizzle/
├── meta/
└── 0000_*.sql
This follows the general schema/connection/migration separation used in Drizzle's PostgreSQL setup. Drizzle ORM

## 41. Testing architecture

Don't wait until the end to add tests.
Eventually:
tests/
├── unit/
│ ├── utils/
│ ├── services/
│ └── validations/
│
├── integration/
│ ├── database/
│ ├── auth/
│ └── api/
│
└── e2e/
├── auth.spec.ts
├── search.spec.ts
├── movie-details.spec.ts
└── watchlist.spec.ts
For FlickNest, the most valuable E2E tests would be:
register
login
search movie
open movie
add watchlist
remove watchlist
favorite movie
rate movie
logout

## 42. What the final architecture looks like conceptually

This is the part I'd keep in your head while coding:
FLICKNEST
│
┌───────────────┴────────────────┐
│ │
FRONTEND BACKEND
│ │
Next.js App Router │
│ │
┌─────┴─────┐ ┌─────┴─────┐
│ │ │ │
Server Client Services Route/API
Components Components │ │
│ │ │ │
│ Zustand │ │
│ │ └─────┬─────┘
│ │ │
└─────┬─────┘ Repository
│ │
│ ┌─────┴─────┐
│ │ │
│ Drizzle Auth
│ │
│ ▼
│ PostgreSQL
│
▼
TMDB Service
│
▼
TMDB API

## 43. What you should actually create right now

Don't create the entire tree I showed above.
You're currently at:
Next.js skeleton
So your Phase 1 target should be only:
FlickNest/
│
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ └── globals.css
│
├── components/
│ ├── ui/
│ └── layout/
│
├── lib/
│ ├── tmdb/
│ ├── utils/
│ └── validations/
│
├── stores/
│
├── types/
│
├── hooks/
│
├── config/
│
├── public/
│
├── .env.example
├── package.json
├── next.config.ts
└── tsconfig.json
Then, when you reach the database phase, introduce:
lib/db/
server/
drizzle/
drizzle.config.ts
Then, when authentication arrives, introduce:
lib/auth/
app/(auth)/
Then user features:
server/services/
server/repositories/
server/actions/
app/(app)/
That is much better than creating 70 empty directories right now.

## 44. Final stack

So the architecture I'm recommending for FlickNest v2 is:
┌───────────────────────────────────────┐
│ FRONTEND │
│ │
│ Next.js App Router │
│ React 19 │
│ TypeScript │
│ Tailwind │
│ │
│ Server Components │
│ Client Components │
│ Server Actions │
└───────────────────┬───────────────────┘
│
┌─────────┴─────────┐
│ │
▼ ▼
Zustand URL State
│
│
▼
┌───────────────────────────────────────┐
│ APPLICATION │
│ │
│ Services │
│ Validation │
│ Auth │
└───────────────┬───────────┬───────────┘
│ │
▼ ▼
TMDB Client Repositories
│ │
▼ ▼
TMDB Drizzle ORM
│
▼
PostgreSQL
And the repository itself remains:
FLICKNEST
│
┌─────────┴─────────┐
│ │
Next.js PostgreSQL
│ │
┌─────┼─────┐ │
│ │ │ │
UI Server API Drizzle ORM
│ │ │ │
│ └──┬──┘ │
│ │ │
│ Services ────────────┘
│
Zustand
│
Client state

       +

      TMDB
       │
       ▼

External movie data
And importantly:
No Express.
No NestJS.
No pnpm monorepo.
No giant Redux replacement in Zustand.
No duplicate TMDB database.
No direct DB access from components.
No business logic buried inside pages.
