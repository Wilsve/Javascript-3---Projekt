import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addScore, nextQuestion, restart } from '../../store/slices/quizSlice';
import QuizSetup from '../../components/QuizSetup/QuizSetup';
import styles from './Quiz.module.css';

const Quiz = () => {
  const dispatch = useDispatch();
  
  const { questions, currentQuestion, score, isFinished, username, region } = useSelector(state => state.quiz);
  
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const hasSaved = useRef(false);

  const startQuiz = () => {
    dispatch(restart());
    hasSaved.current = false;
    setGameStarted(true);
  };

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);

    const isCorrect = answer.toLowerCase() === questions[currentQuestion].correctAnswer.toLowerCase();
    if (isCorrect) dispatch(addScore());

    setTimeout(() => {
      dispatch(nextQuestion());
      setSelectedAnswer(null);
      setIsAnswered(false);
    }, 1000);
  };

  useEffect(() => {
    if (isFinished && !hasSaved.current && gameStarted) {
      hasSaved.current = true;
      
      const result = { username, region, score };
      const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      
      localStorage.setItem('quizResults', JSON.stringify([...existingResults, result]));
      console.log('Resultat sparat:', result);
    }
  }, [isFinished, gameStarted, username, region, score]);

  const playAgain = () => {
    hasSaved.current = false;
    dispatch(restart());
    setGameStarted(false);
  };

  if (!gameStarted) {
    return <QuizSetup startQuiz={startQuiz} />;
  }

  if (isFinished) {
    return (
      <div className={styles.container}>
        <h1>Success!</h1>
        <p>You got {score} of {questions.length} correct</p>
        <button onClick={playAgain}>Play again!</button>
        <Link to="/leaderboard" className={styles.leaderboardLink}>
          View Leaderboard
        </Link>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className={styles.container}>
      <p>Question {currentQuestion + 1} of {questions.length}</p>
      <p>Score: {score}</p>
      
      <img src={question.flag} alt="Flag" className={styles.flag}/>
      
      <div className={styles.options}>
        {question.options.map((option, idx) => {
          const getButtonClass = () => {
            if (!isAnswered) return styles.optionButton;
            
            if (option === question.correctAnswer) {
              return `${styles.optionButton} ${styles.correct}`;
            }
            if (option === selectedAnswer) {
              return `${styles.optionButton} ${styles.incorrect}`;
            }
            return styles.optionButton;
          };

          return (
            <button key={idx} type="button" onClick={() => handleAnswer(option)}
              className={getButtonClass()}
              disabled={isAnswered}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;