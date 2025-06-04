import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieService } from '../api/services/movieService';
import { setBannerData, setImageURL, setTrendingData, setUpcomingData } from '../store/slices/movieSlice';
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

        const [trendingWeek, trendingDay, config, upcoming] = await Promise.all([
          movieService.getTrendingWeek(),
          movieService.getTrendingDay(),
          movieService.getConfiguration(),
          movieService.getUpcoming()
        ]);

        dispatch(setBannerData(trendingWeek.data.results));
        dispatch(setTrendingData(trendingDay.data.results));
        dispatch(setImageURL(config.data.images.secure_base_url + API_CONFIG.DEFAULT_IMAGE_SIZE));
        dispatch(setUpcomingData(upcoming.data.results));
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