import { configureStore, type Middleware } from '@reduxjs/toolkit';
import fastingReducer from './fastingSlice';

// Middleware to save state to local storage
const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('fitlog_fasting_state', JSON.stringify(state.fasting));
  return result;
};

export const store = configureStore({
  reducer: {
    fasting: fastingReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
