import { configureStore } from "@reduxjs/toolkit";

import learnVocabulery from './slice/vocabulery';
import auth from "./slice/auth";
export const store = configureStore({
  reducer: {
    learnVocabulery:learnVocabulery,
    auth:auth
  },
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware().concat(pokemonApi.middleware);
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;