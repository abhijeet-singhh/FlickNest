# CINEMAX - Movie Streaming Platform

A modern movie streaming platform built with React, TypeScript, and the TMDB API.

## Features

- Browse trending movies and TV shows
- Search functionality
- Responsive design
- Modern UI with animations
- TV Shows and Movies categorization
- Upcoming releases section

## Tech Stack

- React 19
- TypeScript
- Redux Toolkit
- React Router v7
- Tailwind CSS
- Vite
- Axios

## Getting Started

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your TMDB API token
4. Start the development server
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
  ├── api/          # API services and endpoints
  ├── components/   # Reusable components
  │   ├── common/   # Generic components
  │   ├── layout/   # Layout components
  │   └── sections/ # Page sections
  ├── hooks/        # Custom React hooks
  ├── pages/        # Page components
  ├── store/        # Redux store
  ├── types/        # TypeScript types
  └── utils/        # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build

## Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT