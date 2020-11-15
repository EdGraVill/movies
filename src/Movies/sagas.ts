import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ThenArg } from '../types';
import { discover, getGenreList, searchMovie } from './api';
import { genreMapLengthSelector, searchTextSelector } from './selectors';
import { moviesActions } from './slicer';

export function* fetchDiscoveryEffect({ payload }: ReturnType<typeof moviesActions['fetchDiscovery']>) {
  try {
    const discoverResponse: ThenArg<ReturnType<typeof discover>> = yield call(discover, payload);

    yield put(moviesActions.fulfillMovieList(discoverResponse.data.results));

    const genreMapLength: number = yield select(genreMapLengthSelector);

    if (!genreMapLength) {
      const genreListResponse: ThenArg<ReturnType<typeof getGenreList>> = yield call(getGenreList);

      yield put(moviesActions.fulfillGenreMap(genreListResponse.data));
    }
  } catch (error) {
    yield put(moviesActions.catchError(error.message));
  }
}

export function* setSearchTextEffect() {
  const newText: string = yield select(searchTextSelector);

  if (!newText) {
    history.replaceState('', document.title, `${location.pathname}`);
  } else {
    history.replaceState('', document.title, `${location.pathname}?search=${newText}`);

    try {
      const searchList: ThenArg<ReturnType<typeof searchMovie>> = yield call(searchMovie, {
        query: newText,
        include_adult: false,
      });

      yield put(moviesActions.fulfillSearchList(searchList.data.results));
    } catch (error) {
      yield put(moviesActions.catchError(error.message));
    }
  }
}

export function* moviesSagas() {
  yield takeEvery(moviesActions.fetchDiscovery, fetchDiscoveryEffect);
  yield takeEvery(['@@INIT', moviesActions.setSearchText, moviesActions.clearSearchText], setSearchTextEffect);
}
