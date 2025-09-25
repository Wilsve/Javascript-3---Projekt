import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    selectedRegion: 'Europe',
    selectedCountry: null, 
    loading: false,
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    }, 
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCountries,setSelectedRegion,setSelectedCountry,setLoading, } = countriesSlice.actions;
export default countriesSlice.reducer;