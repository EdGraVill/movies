import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieListSelector, moviesActions, searchListSelector } from './Movies';
import { Content, Grid, Jumbo } from './UI';
import useTrending from './useTrending';

function App() {
  const dispatch = useDispatch();
  const movieList = useSelector(movieListSelector);
  const searchList = useSelector(searchListSelector);
  const [trendingList] = useTrending();

  React.useEffect(() => {
    if (!movieList.length) {
      dispatch(moviesActions.fetchDiscovery({ sort_by: 'popularity.desc' }));
    }
  }, [movieList]);

  return (
    <>
      <Jumbo />
      <Content>
        <Grid
          highlightFirst={!searchList.length}
          movieList={!searchList.length ? movieList : searchList}
          rows={!searchList.length ? 2 : Math.floor(searchList.length / 4) + 1}
          title={searchList.length ? 'Search results' : 'Popular Movies'}
        />
        <Grid movieList={trendingList} title="Trending" />
      </Content>
    </>
  );
}

export default App;
