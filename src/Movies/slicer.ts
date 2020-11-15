import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mergeToLeft, getSearchText } from '../util';

export const getMoviesIntialState = () => ({
  isFetching: false,
  lastError: null as string | null,
  genreMap: {} as { [genreId: number]: string },
  movieList: [] as MovieDB.Objects.Movie[],
  searchText: getSearchText(),
});

export type MoviesState = ReturnType<typeof getMoviesIntialState>;

export const { actions: moviesActions, name: moviesReducerName, reducer: moviesReducer } = createSlice({
  initialState: getMoviesIntialState(),
  name: 'movies',
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchDiscovery(state, { payload }: PayloadAction<MovieDB.Arguments.Discover.Movie['query'] | undefined>) {
      state.isFetching = true;
    },
    fulfillMovieList(state, { payload }: PayloadAction<MovieDB.Objects.Movie[]>) {
      state.isFetching = false;
      state.movieList = mergeToLeft(state.movieList, payload, 'id');
    },
    fulfillGenreMap(state, { payload }: PayloadAction<MovieDB.Responses.Genre.Common>) {
      state.genreMap = payload.genres.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: curr.name,
        }),
        {},
      );
    },
    catchError(state, { payload }: PayloadAction<string>) {
      state.lastError = payload;
    },
    clearError(state) {
      state.lastError = null;
    },
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
    clearSearchText(state) {
      state.searchText = '';
    },
  },
});
