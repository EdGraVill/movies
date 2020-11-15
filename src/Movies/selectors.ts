import { createSelector } from '@reduxjs/toolkit';
import { State } from '../store';

export const moviesRootStateSelector = (state: State) => state.movies;

export const genreMapSelector = createSelector(moviesRootStateSelector, ({ genreMap }) => genreMap);
export const genreMapLengthSelector = createSelector(
  moviesRootStateSelector,
  ({ genreMap }) => Object.values(genreMap).length,
);

export const searchTextSelector = createSelector(moviesRootStateSelector, ({ searchText }) => searchText);

export const movieListSelector = createSelector(moviesRootStateSelector, ({ movieList }) => movieList);
