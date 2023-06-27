import { configureStore } from "@reduxjs/toolkit";

import learnVocabulery from './slice/vocabulery';
export const store = configureStore({
  reducer: {
    learnVocabulery:learnVocabulery
  },
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware().concat(pokemonApi.middleware);
  // },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;