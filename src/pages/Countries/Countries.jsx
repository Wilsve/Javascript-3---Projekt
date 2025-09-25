import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCountries, setSelectedRegion, setLoading } from '../../store/slices/countriesSlice';
import { fetchCountriesByRegion } from '../../api';
import CountryCard from '../../components/CountryCard/CountryCard';
import styles from './Countries.module.css';

const ALL_REGIONS = ['Europe', 'Asia', 'Africa', 'Americas', 'Oceania'];

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.loading);
  const currentRegion = useSelector(state => state.countries.selectedRegion);

  useEffect(() => {
    loadCountries('Europe');
  }, []);

  const loadCountries = async (regionName) => {
    dispatch(setLoading(true));
    dispatch(setSelectedRegion(regionName));

    try {
      const countryList = await fetchCountriesByRegion(regionName);
      dispatch(setCountries(countryList));
    } catch (error) {
      console.error('Error:', error); 
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clickRegionButton = (regionName) => {
    loadCountries(regionName);
  };

  return (
    <div className={styles.container}>
      <h1>Choose Region</h1>
      <div className={styles.buttons}>
        {ALL_REGIONS.map(region => (
          <button key={region} onClick={() => 
            clickRegionButton(region)}
            className={`${styles.button} ${currentRegion === region ? styles.active : ''}`}>
            {region}</button>
        ))}
      </div>

      {isLoading && <p>Loading Countries</p>}

      {countries.length > 0 && (
        <div className={styles.countries}>
          <h2>Countries in {currentRegion}</h2>
          {countries.map(country => (
            <CountryCard key={country.name.common} country={country}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;