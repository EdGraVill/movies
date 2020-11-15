import * as React from 'react';
import { getTrending } from './Movies';

const useTrending = (): [trendingList: MovieDB.Objects.Movie[], fetchTrendingList: () => void] => {
  const [trendingList, setTrendingList] = React.useState<MovieDB.Objects.Movie[]>([]);

  const fetchTrendingList = React.useCallback(async () => {
    const response = await getTrending();

    setTrendingList(response.data.results);
  }, []);

  React.useEffect(() => {
    fetchTrendingList();
  }, []);

  return [trendingList, fetchTrendingList];
};

export default useTrending;
