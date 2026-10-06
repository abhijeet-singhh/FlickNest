import { getTrendingMovies } from "@/server/services/movie.service";

export default async function Home() {
  const trending = await getTrendingMovies();

  return (
    <main>
      <h1>FlickNest</h1>

      <p>{trending.results[0]?.title}</p>
    </main>
  );
}
