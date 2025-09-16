import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  // Format time into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Button handlers
  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(1500);
  };

  return (
    <div className={styles.timer}>
      <div className={styles.timeDisplay}>{formatTime(timeLeft)}</div>
      <div className={styles.controls}>
        <button 
          className={`${styles.button} ${styles.startButton}`}
          onClick={handleStart}
          disabled={isActive}
        >
          Start
        </button>
        <button 
          className={`${styles.button} ${styles.pauseButton}`}
          onClick={handlePause}
          disabled={!isActive}
        >
          Pause
        </button>
        <button 
          className={`${styles.button} ${styles.resetButton}`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
