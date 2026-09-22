# FlickNest v2 — Architecture Decisions

## Decision 001 — TMDB Must Remain Server-Side

### Context

TMDB is not reliably accessible directly from the user's browser on
some networks, including the Jio network in India.

This means FlickNest should not depend on the user's browser being able
to communicate directly with TMDB.

### Decision

All TMDB API requests must go through FlickNest's server-side layer.

The intended flow is:

Browser
↓
FlickNest / Next.js server
↓
TMDB

The browser must never call the TMDB API directly.

### Consequences

- TMDB credentials remain server-side.
- Client Components must not import the TMDB client.
- TMDB requests should be centralized inside `lib/tmdb/`.
- FlickNest's server communicates with TMDB on behalf of the client.
- Caching/revalidation should be used where appropriate to reduce
  dependence on TMDB availability.

### Important Note

TMDB image delivery is a separate concern. The application should not
assume that handling API requests server-side automatically solves
direct browser requests to TMDB's image infrastructure. Image delivery
needs to be evaluated separately during the TMDB integration phase.

### Decision: Movie image fields

During Phase 2, `Movie` currently uses:

- `posterUrl`
- `backdropUrl`

However, these fields currently represent TMDB image **paths**, such as `/abc.jpg`, rather than complete URLs.
This creates a naming mismatch.
**Decision:** Keep the current `posterUrl` and `backdropUrl` fields unchanged during Phase 2.
**Phase 3 decision:** When implementing the TMDB mapper, decide between:

1. Renaming them to:
   - `posterPath`
   - `backdropPath`
     if the application model stores TMDB paths.
2. Keeping:
   - `posterUrl`
   - `backdropUrl`
     if the mapper converts the TMDB paths into complete image URLs.

Do not change the Phase 2 `Movie` type until this decision is made in Phase 3.
