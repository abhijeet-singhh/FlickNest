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

### Decision: Movie Image Fields

During Phase 2, `Movie` used:

- `posterUrl`
- `backdropUrl`

These fields were initially intended to be revisited during TMDB integration
because TMDB provides image paths rather than complete URLs.

### Decision

Keep:

- `posterUrl`
- `backdropUrl`

The TMDB mapper converts TMDB image paths into complete image URLs before
they enter the application domain model.

### Consequences

- Domain objects expose usable image URLs rather than TMDB image paths.
- UI components do not need to know how TMDB image URLs are constructed.
- `getImageUrl()` remains responsible for converting TMDB image paths
  into image URLs.

## Deferred Decisions

### Decision 002 — TMDB Cache/Revalidation Strategy

### Context

The initial TMDB client uses:

`revalidate: 300`

This provides cacheable/revalidatable TMDB requests during the initial integration.

However, different TMDB operations may have different freshness requirements. Trending content, popular content, search results, movie details, and other endpoints may not all need the same revalidation period.

### Current Decision

Keep `revalidate: 300` as the common TMDB cache/revalidation strategy.

Do not introduce endpoint-specific cache policies unless a concrete
endpoint requirement makes them necessary.

### Consequences

- TMDB requests remain cacheable and revalidatable.
- The initial implementation stays simple and consistent.
- Endpoint-specific caching can be introduced later if actual
  freshness requirements justify it.

---

## Decision 003 — TMDB Query Parameter Abstraction

### Context

TMDB endpoints such as Discover use optional query parameters.

The endpoint option objects therefore contain properties that may be `undefined`.

The initial request client only accepted:

`Record<string, string | number | boolean>`

which prevented optional endpoint parameters from being passed directly to the client.

### Decision

The TMDB request client accepts:

`Record<string, string | number | boolean | undefined>`

Undefined values are ignored when constructing the URL query string.

### Consequences

- Endpoint option objects can use optional properties naturally.
- Callers do not need to manually remove undefined parameters.
- The request client remains responsible for constructing valid query strings.
- `null` values are not automatically accepted as query parameters; only explicitly supported values should be passed.

## Decision 004 — Local TMDB Connectivity Is Environment-Dependent

### Context

TMDB API requests from the local WSL development environment may fail
when using certain networks.

During Phase 3, TMDB requests from WSL over the Jio network timed out,
while the same requests worked over another network.

Forcing the resolved TMDB address succeeded, confirming that the
application code and authentication were not the cause of the failure.

### Decision

FlickNest will not introduce application-level workarounds for
network-specific TMDB connectivity problems.

TMDB requests will continue to use the normal TMDB hostname through the
server-side TMDB client.

### Consequences

- Local development may require a network that can reach TMDB.
- TMDB IP addresses must not be hardcoded.
- Client-side TMDB fallbacks must not be introduced.
- Production deployment should be tested from the target hosting
  environment.
