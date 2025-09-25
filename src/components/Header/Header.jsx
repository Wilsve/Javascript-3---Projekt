import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
        <FontAwesomeIcon icon={faGlobe} />
        </Link>
        <div className={styles.navLinks}>
          <Link to="/countries" className={styles.navLink}>
            Countries
          </Link>
          <Link to="/collection" className={styles.navLink}>
            Collection
          </Link>
          <Link to="/quiz" className={styles.navLink}>
            Quiz
          </Link>
          <Link to="/leaderboard" className={`${styles.navLink}`}>
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;