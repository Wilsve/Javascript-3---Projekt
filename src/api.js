import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountriesByRegion = async (region) => {
  const response = await axios.get(`${BASE_URL}/region/${region}`);
  return response.data;
};

export const fetchCountryByName = async (countryName) => {
  const response = await axios.get(`${BASE_URL}/name/${countryName}`);
  return response.data[0];
};