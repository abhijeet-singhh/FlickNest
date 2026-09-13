> Environment setup: see [`.env.example`](./.env.example).

# Complete project structure

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
