import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faBookmark,faUsers,faCity,faCoins,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { setSelectedCountry, setLoading } from '../../store/slices/countriesSlice';
import { addCountry } from '../../store/slices/collectionSlice';
import { fetchCountryByName } from '../../api';
import styles from './CountryDetail.module.css';

const CountryDetail = () => {
  const { countryName } = useParams();
  const dispatch = useDispatch();
  
  const { selectedCountry: country, loading } = useSelector(state => state.countries);
  const { savedCountries } = useSelector(state => state.collection);

  const isSaved = savedCountries.some(
    saved => saved.name?.common === country?.name?.common
  );

  useEffect(() => {
    const loadCountry = async () => {
      dispatch(setLoading(true));
      
      try {
        const data = await fetchCountryByName(countryName);
        dispatch(setSelectedCountry(data));
      } catch (error) {
        console.error('Error loading country:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCountry();
  }, [countryName, dispatch]);

  const saveCountry = () => {
    if (country && !isSaved) {
      dispatch(addCountry(country));
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (!country) return <div className={styles.container}>Country not found</div>;

  const currency = country.currencies ? Object.values(country.currencies)[0] : null;

  return (
    <div className={styles.container}>
      <div className={styles.buttonRow}>
        <Link to="/countries" className={styles.backButton}>
          ← Back to Countries
        </Link>
        
        <button className={`${styles.saveButton} ${isSaved ? styles.savedButton : ''}`}
          onClick={saveCountry}
          disabled={isSaved}>
          <FontAwesomeIcon icon={isSaved ? faCheck : faBookmark} />
          {isSaved ? ' Saved to collection' : ' Save to Collection'}
        </button>
      </div>
      
      <div className={styles.countryLayout}>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className={styles.flag}/>
        
        <div className={styles.countryInfo}>
          <h1>{country.name.common}</h1>
          <p className={styles.regionText}>{country.region}</p>
          
          <div className={styles.infoList}>
            <div className={styles.info}>
              <FontAwesomeIcon icon={faUsers} className={`${styles.infoIcon} ${styles.populationIcon}`} />
              <strong>Population:</strong> {country.population?.toLocaleString()}
            </div>
            
            <div className={styles.info}>
              <FontAwesomeIcon icon={faCity} className={`${styles.infoIcon} ${styles.capitalIcon}`} />
              <strong>Capital:</strong> {country.capital}
            </div>
            
            {currency && (
              <div className={styles.info}>
                <FontAwesomeIcon icon={faCoins} className={`${styles.infoIcon} ${styles.currencyIcon}`} />
                <strong>Currency:</strong> {currency.name} ({currency.symbol})
              </div>
            )}
            
            {country.maps?.googleMaps && (
              <div className={styles.info}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={`${styles.infoIcon} ${styles.locationIcon}`} />
                <strong>Location:</strong> 
                <a href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}>
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;