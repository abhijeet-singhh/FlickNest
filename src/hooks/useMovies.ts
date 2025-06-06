import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieService } from '../api/services/movieService';
import { setAiringToday, setBannerData, setImageURL, setNowPlaying, setOnTheAir, setTopRated, setTrendingData, setUpcomingData } from '../store/slices/movieSlice';
import { API_CONFIG } from '../utils/constants';

export const useMovies = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovieData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [trendingWeek, trendingDay, config, upcoming, nowPlaying, topRated, onTheAir, airingToday] = await Promise.all([
          movieService.getTrendingWeek(),
          movieService.getTrendingDay(),
          movieService.getConfiguration(),
          movieService.getUpcoming(),
          movieService.getNowPlaying(),
          movieService.getTopRated(),
          movieService.getOnTheAir(),
          movieService.getAiringToday(),
        ]);

        dispatch(setBannerData(trendingWeek.data.results));
        dispatch(setTrendingData(trendingDay.data.results));
        dispatch(setImageURL(config.data.images.secure_base_url + API_CONFIG.DEFAULT_IMAGE_SIZE));
        dispatch(setUpcomingData(upcoming.data.results));
        // dispatch discover data
        dispatch(setNowPlaying(nowPlaying.data.results))
        dispatch(setTopRated(topRated.data.results))
        dispatch(setOnTheAir(onTheAir.data.results))
        dispatch(setAiringToday(airingToday.data.results))
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch movie data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMovieData();
  }, [dispatch]);

  return { error, isLoading };
};