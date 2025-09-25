import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCountry } from '../../store/slices/collectionSlice';
import CountryCard from '../../components/CountryCard/CountryCard';
import styles from './Collection.module.css';

const Collection = () => {
  const dispatch = useDispatch();
  const { savedCountries } = useSelector(state => state.collection);

  const deleteCountry = (name) => {
    dispatch(removeCountry(name));
  };

  const getCountText = () => {
    if (savedCountries.length === 0) {
      return 'You have 0 saved countries';
    }
    if (savedCountries.length === 1) {
      return 'You have saved 1 country';
    }
    return `You have saved ${savedCountries.length} countries`;
  };

  const isListEmpty = savedCountries.length === 0;

  if (isListEmpty) {
    return (
      <div className={styles.container}>
        <h1>My Collection</h1>
        <p className={styles.subtitle}>{getCountText()}</p>
        
        <div className={styles.emptyState}>
          <h2>Your collection is empty</h2>
          <p>Start exploring and save your favorites!</p>
          <Link to="/countries" className={styles.exploreButton}>
            Explore Countries
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>My Collection</h1>
      <p className={styles.subtitle}>{getCountText()}</p>

      <div className={styles.countriesGrid}>
        {savedCountries.map(country => (
          <CountryCard key={country.name.common}
            country={country}
            showRegion={true}
            showRemoveButton={true}
            onRemove={deleteCountry}/>
        ))}
      </div>

      <div className={styles.actions}>
        <Link to="/countries" className={styles.addMoreButton}>
          + Add more countries
        </Link>
      </div>
    </div>
  );
};

export default Collection;