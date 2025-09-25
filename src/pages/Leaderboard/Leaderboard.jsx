import React, { useState, useEffect } from 'react';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const [allScores, setAllScores] = useState({});
  
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    const results = savedResults ? JSON.parse(savedResults) : [];

    const scoresByRegion = {};
    
    regions.forEach(region => {
      scoresByRegion[region] = results
        .filter(result => result.region === region)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    });

    setAllScores(scoresByRegion);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Leaderboard</h1>
      
      <div className={styles.allRegions}>
        {regions.map(region => (
          <div key={region} className={styles.regionCard}>
            <h2 className={styles.regionName}>{region}</h2>
            
            {allScores[region] && allScores[region].length > 0 ? (
              <ol className={styles.top3List}>
                {allScores[region].map((player, index) => (
                  <li key={index} className={styles.playerItem}>
                    <span className={styles.playerRank}>
                      {index + 1}.
                    </span>
                    <span className={styles.playerName}>
                      {player.username}
                    </span>
                    <span className={styles.playerScore}>
                      {player.score}/15 points
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.noScores}>No results</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;