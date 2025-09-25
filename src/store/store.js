import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from './slices/countriesSlice';
import collectionSlice from './slices/collectionSlice';
import quizSlice from './slices/quizSlice';

export const store = configureStore({
  reducer: {
    countries: countriesSlice,
    collection: collectionSlice,
    quiz: quizSlice,
  },
  
});

export default store;