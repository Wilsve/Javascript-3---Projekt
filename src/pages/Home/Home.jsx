import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe,faBook,faHeart,faTrophy,faChartBar, } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <img src="/nick-fewings-BAZejJdZ57w-unsplash.jpg" className={styles.backgroundImage} />
      <div className={styles.content}>
        <div className={styles.globe}>
          <FontAwesomeIcon icon={faGlobe}/>
        </div>

        <h1 className={styles.h1}>Country Explorer</h1>
        <div className={styles.cards}>
          <Link to="/countries" className={styles.card}>
            <div className={`${styles.icon} ${styles.blueIcon}`}>
              <FontAwesomeIcon icon={faBook}/>
            </div>
            <h3>Study Countries</h3>
            <p>Explore countries by regions and learn fascinating facts</p>
          </Link>

          <Link to="/collection" className={styles.card}>
            <div className={`${styles.icon} ${styles.orangeIcon}`}>
              <FontAwesomeIcon icon={faHeart}/>
            </div>
            <h3>Collection</h3>
            <p>View and manage your saved favorite countries</p>
          </Link>
          
          <Link to="/quiz" className={styles.card}>
            <div className={`${styles.icon} ${styles.goldIcon}`}>
              <FontAwesomeIcon icon={faTrophy}/>
            </div>
            <h3>Quiz</h3>
            <p>Test your geography knowledge with fun quizzes</p>
          </Link>
          
          <Link to="/leaderboard" className={styles.card}>
            <div className={`${styles.icon} ${styles.purpleIcon}`}>
              <FontAwesomeIcon icon={faChartBar}/>
            </div>
            <h3>Leaderboard</h3>
            <p>Compare your quiz scores with other explorers</p>
          </Link>
          </div>
        </div>
      </div>
  );
};

export default Home;