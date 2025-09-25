import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername, setRegion, setQuestions } from "../../store/slices/quizSlice";
import { fetchCountriesByRegion } from '../../api';
import styles from './QuizSetup.module.css';

const QuizSetup = ({ startQuiz }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    const handleStart = async () => {
        if (!name.trim()){
            setError('Please enter your name.');
            return;
        }
        if (!selectedRegion){
            setError('Please select a region.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            dispatch(setUsername(name));
            dispatch(setRegion(selectedRegion));

            const countries = await fetchCountriesByRegion(selectedRegion);

            const randomQuestions = [...countries].sort(() => Math.random() - 0.5);
            const selectedQuestions = randomQuestions.slice(0, 15);

            const questions = selectedQuestions.map(country => {
                const otherCountries = countries.filter(c => c.name.common !== country.name.common);
                const wrongOptions = otherCountries
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 3)
                  .map(c => c.name.common);
            
                const options = [...wrongOptions, country.name.common]
                  .sort(() => 0.5 - Math.random());
            
                return {
                  flag: country.flags.svg,
                  correctAnswer: country.name.common,
                  options,
                };
            });
            
            dispatch(setQuestions(questions));

            startQuiz();
        }
        catch (err) {
            setError('Failed to fetch countries. Please try again.');
            setLoading(false);
        }
    };

    return (
      <div className={styles.container}>
           <h2>Flag Quiz!</h2>
          <div className={styles.formGroup}>
            <input type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"/>
          </div>
        
          <div className={styles.formGroup}>
            <label>Choose region:</label>
            <div className={styles.regions}>
              {regions.map(region => (
                <button key={region} onClick={() => 
                  setSelectedRegion(region)}
                  className={selectedRegion === region ? styles.active : ''}>
                  {region}
                </button>
              ))}
            </div>
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button onClick={handleStart} disabled={isLoading}
            className={styles.startButton}>
            {isLoading ? 'Loading' : 'Start Quiz!'}
          </button>
        </div>
      );
    };
    
    export default QuizSetup;