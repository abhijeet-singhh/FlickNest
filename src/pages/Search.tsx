import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.config";
import Card from "../components/common/Card";
import Pagination from "../components/common/Pagination";
import { SearchResult } from "../types/movie.types";
import Footer from "../components/layout/Footer";
import PromoBadge from "../components/common/PromoBadge";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentQuery = params.get("q") || "";
    const currentPage = Number(params.get("page")) || 1;

    setQuery(currentQuery);
    setPage(currentPage);

    if (!currentQuery.trim()) {
      setResults([]);
      setTotalPages(1);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchAllPages = async () => {
      try {
        const maxPagesToFetch = 5;

        // Create all fetch promises
        const requests = Array.from({ length: maxPagesToFetch }, (_, i) =>
          axiosInstance.get(
            `/search/multi?query=${encodeURIComponent(currentQuery)}&page=${i + 1}`
          )
        );

        const responses = await Promise.all(requests);

        let allResults: SearchResult[] = [];

        responses.forEach((res) => {
          const filtered = res.data.results.filter(
            (item: SearchResult) =>
              item.media_type === "movie" || item.media_type === "tv"
          );
          allResults = [...allResults, ...filtered];
        });

        setResults(allResults);
        setTotalPages(Math.ceil(allResults.length / 18)); // 18 per page
      } catch {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPages();
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const startIndex = (page - 1) * 18;
  const visibleResults = results.slice(startIndex, startIndex + 18);

  return (
    <div className="flex flex-col min-h-screen bg-[#151320] pt-15 pb-15 md:pb-0 border">
      <PromoBadge />
      <form onSubmit={handleSubmit} className="mb-8 px-4 mt-5 flex justify-center md:hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies or TV shows..."
          className="w-full max-w-md px-4 py-2 rounded-l bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:border-[#B1D960] transition duration-200 ease-in-out"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-r bg-[#B1D690] text-black font-bold"
        >
          Search
        </button>
      </form>

      {loading && <div className="text-center text-white mt-2 md:mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && query.trim() === "" && (
        <div className="text-center text-zinc-400">
          Start typing to find your next favorite.
        </div>
      )}

      {!loading && !error && visibleResults.length === 0 && query.trim() !== "" && (
        <div className="text-center text-zinc-400">No results found.</div>
      )}

      <div className="flex flex-wrap gap-3 md:gap-7 justify-center md:mt-10">
        {visibleResults.map((item) => (
          <div key={item.id} className="w-[160px] md:w-[200px] flex-shrink-0">
            <Card
              data={{
                ...item,
                title: item.title || item.name,
                poster_path: item.poster_path || '',
                backdrop_path: item.backdrop_path || '',
                vote_average: item.vote_average,
                popularity: item.popularity,
                release_date: item.release_date,
                first_air_date: item.first_air_date,
              }}
              mediaType={item.media_type === "movie" ? "Movie" : "TV"}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ScrollToTopButton />
      <div className="pt-6 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Search;
