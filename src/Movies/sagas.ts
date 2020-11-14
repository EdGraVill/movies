import { AxiosResponse } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ThenArg } from '../types';
import { discover, getGenreList } from './api';
import { genreMapLengthSelector } from './selectors';
import { moviesActions } from './slicer';

export function* fetchDiscoveryEffect({ payload }: ReturnType<typeof moviesActions['fetchDiscovery']>) {
  try {
    const discoverResponse: ThenArg<AxiosResponse<MovieDB.Responses.Discover.Movie>> = yield call(discover, payload);

    yield put(moviesActions.fulfillMovieList(discoverResponse.data.results));

    const genreMapLength: number = yield select(genreMapLengthSelector);

    if (!genreMapLength) {
      const genreListResponse: ThenArg<AxiosResponse<MovieDB.Responses.Genre.Common>> = yield call(getGenreList);

      yield put(moviesActions.fulfillGenreMap(genreListResponse.data));
    }
  } catch (error) {
    yield put(moviesActions.catchError(error.message));
  }
}

export function* moviesSagas() {
  yield takeEvery(moviesActions.fetchDiscovery, fetchDiscoveryEffect);
}
