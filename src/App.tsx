import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieListSelector, moviesActions, searchListSelector, searchTextSelector } from './Movies';
import { Content, Grid, Jumbo } from './UI';
import useTrending from './useTrending';

function App() {
  const dispatch = useDispatch();
  const movieList = useSelector(movieListSelector);
  const searchText = useSelector(searchTextSelector);
  const searchList = useSelector(searchListSelector);
  const [trendingList] = useTrending();

  React.useEffect(() => {
    if (!searchText) {
      dispatch(moviesActions.fetchDiscovery({ sort_by: 'popularity.desc' }));
    }
  }, [searchText]);

  return (
    <>
      <Jumbo />
      <Content>
        <Grid
          highlightFirst={!searchText}
          movieList={!searchText ? movieList : searchList}
          rows={!searchText ? 2 : Math.floor(searchList.length / 4) + 1}
          title={searchText ? 'Search results' : 'Popular Movies'}
        />
        <Grid movieList={trendingList} title="Trending" />
      </Content>
    </>
  );
}

export default App;
