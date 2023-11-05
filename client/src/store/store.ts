// Modules
import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import langReducer from '../features/language/lang-slice.ts';

export const store = configureStore({
  reducer: { 
    language: langReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
