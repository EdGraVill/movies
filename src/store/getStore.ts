import { combineReducers, configureStore, getDefaultMiddleware, StateFromReducersMapObject } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { moviesReducer, moviesReducerName } from '../Movies';
import { isProdEnv } from '../util';

export const reducersMapObject = {
  [moviesReducerName]: moviesReducer,
};

export type State = StateFromReducersMapObject<typeof reducersMapObject>;

export const getStore = () => {
  const sagasMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: combineReducers(reducersMapObject),
    devTools: !isProdEnv,
    middleware: [...getDefaultMiddleware(), sagasMiddleware],
  });

  return store;
};

export type Store = ReturnType<typeof getStore>;
