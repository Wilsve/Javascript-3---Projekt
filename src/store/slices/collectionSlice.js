import { createSlice } from '@reduxjs/toolkit';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    savedCountries: JSON.parse(localStorage.getItem('savedCountries') || '[]'),
  },
  reducers: {
    addCountry: (state, action) => {
      const country = action.payload;
      const existingCountry = state.savedCountries.find(
        saved => saved.name?.common === country.name?.common
      );
      
      if (!existingCountry) {
        state.savedCountries.push(country);
        localStorage.setItem('savedCountries', JSON.stringify(state.savedCountries));
      }
    },
    removeCountry: (state, action) => {
      const countryName = action.payload;
      state.savedCountries = state.savedCountries.filter(
        country => country.name?.common !== countryName
      );
      localStorage.setItem('savedCountries', JSON.stringify(state.savedCountries));
    },
  },
});

export const { addCountry, removeCountry } = collectionSlice.actions;
export default collectionSlice.reducer;