import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

export const moviesRootStateSelector = (state: State) => state.movies;

export const genreMapSelector = createSelector(moviesRootStateSelector, ({ genreMap }) => genreMap);
export const genreMapLengthSelector = createSelector(genreMapSelector, (genreMap) => Object.values(genreMap).length);

export const searchTextSelector = createSelector(moviesRootStateSelector, ({ searchText }) => searchText);

export const movieListSelector = createSelector(moviesRootStateSelector, ({ movieList }) => movieList);

export const searchListSelector = createSelector(moviesRootStateSelector, ({ searchList, searchFilters }) => {
  let list = searchList;

  if (typeof searchFilters?.vote === 'number') {
    const [floor, roof] = [searchFilters.vote * 2 - 2, searchFilters.vote * 2];

    list = list.filter(({ vote_average }) => vote_average >= floor && vote_average <= roof);
  }

  return list;
});

export const searchFiltersSelector = createSelector(moviesRootStateSelector, ({ searchFilters }) => searchFilters);
