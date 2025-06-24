import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { movieService } from '../api/services/movieService';
import { setImageURL, setMovieDataByKey } from '../store/slices/movieSlice';
import { API_CONFIG } from '../utils/constants';

export const useMovies = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEssentialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [
          trendingWeek,
          trendingDay,
          config,
          upcoming,
          newData,
          nowPlaying,
          topRated,
          onTheAir,
          airingToday
        ] = await Promise.all([
          movieService.getTrendingWeek(),
          movieService.getTrendingDay(),
          movieService.getConfiguration(),
          movieService.getUpcoming(),
          movieService.getNew(),
          movieService.getNowPlaying(),
          movieService.getTopRated(),
          movieService.getOnTheAir(),
          movieService.getAiringToday()
        ]);
        console.log(newData)

        // Set image config
        dispatch(setImageURL(config.data.images.secure_base_url + API_CONFIG.DEFAULT_IMAGE_SIZE));

        // Dispatch initial essential movie data
        dispatch(setMovieDataByKey({ key: 'bannerData', data: trendingWeek.data.results }));
        dispatch(setMovieDataByKey({ key: 'trendingData', data: trendingDay.data.results }));
        dispatch(setMovieDataByKey({ key: 'upcomingData', data: upcoming.data.results }));
        dispatch(setMovieDataByKey({ key: 'newData', data: newData.data.results }));
        dispatch(setMovieDataByKey({ key: 'nowPlaying', data: nowPlaying.data.results }));
        dispatch(setMovieDataByKey({ key: 'topRated', data: topRated.data.results }));
        dispatch(setMovieDataByKey({ key: 'onTheAir', data: onTheAir.data.results }));
        dispatch(setMovieDataByKey({ key: 'airingToday', data: airingToday.data.results }));
      } catch (error) {
        console.error('Error fetching essential movie data:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch movie data'));
      } finally {
        setIsLoading(false);
      }
    };

    const fetchHeavyData = async () => {
      try {
        const [
          nowPlaying300,
          topRated300,
          onTheAir300,
          airingToday300,
          upcoming300,
          tvShows300,
          movies300,
          trending300,
          new300
        ] = await Promise.all([
          movieService.getNowPlaying300(),
          movieService.getTopRated300(),
          movieService.getOnTheAir300(),
          movieService.getAiringToday300(),
          movieService.getUpcoming300(),
          movieService.getTvShows300(),
          movieService.getMovies300(),
          movieService.getTrending300(),
          movieService.getNew300()
        ]);

        // Dispatch large datasets separately
        dispatch(setMovieDataByKey({ key: 'nowPlaying300', data: nowPlaying300 }));
        dispatch(setMovieDataByKey({ key: 'topRated300', data: topRated300 }));
        dispatch(setMovieDataByKey({ key: 'onTheAir300', data: onTheAir300 }));
        dispatch(setMovieDataByKey({ key: 'airingToday300', data: airingToday300 }));
        dispatch(setMovieDataByKey({ key: 'upcomingData300', data: upcoming300 }));
        dispatch(setMovieDataByKey({ key: 'tvShows300', data: tvShows300 }));
        dispatch(setMovieDataByKey({ key: 'movies300', data: movies300 }));
        dispatch(setMovieDataByKey({ key: 'trending300', data: trending300 }));
        dispatch(setMovieDataByKey({ key: 'new300', data: new300 }));
      } catch (error) {
        console.error('Error fetching heavy movie data:', error);
        // Optional: setError for background errors
      }
    };

    // Load the initial content
    fetchEssentialData();

    // After a delay, fetch the heavy data in the background
    const timer = setTimeout(() => {
      fetchHeavyData();
    }, 1500); // delay to allow UI to render first

    return () => clearTimeout(timer); // cleanup on unmount
  }, [dispatch]);

  return { error, isLoading };
};
