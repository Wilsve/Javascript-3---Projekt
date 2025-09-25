import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

const CountryCard = ({ 
  country, 
  showRegion = false, 
  showRemoveButton = false, 
  onRemove = null }) => {
    
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove(country.name.common);
    }
  };

  return (
    <div className={styles.card}>
      <Link 
        to={`/countries/${country.name.common}`} className={styles.link}>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`}
          className={styles.flag}/>
        <div className={styles.info}>
          <h3 className={styles.name}>{country.name.common}</h3>
          {showRegion && <p className={styles.region}>{country.region}</p>}
        </div>
      </Link>
      
      {showRemoveButton && onRemove && (
        <button className={styles.removeButton}onClick={handleRemove}
          title="Remove from collection">❌</button>
      )}
    </div>
  );
};

export default CountryCard;