import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';

// Timer mode durations in seconds
const POMODORO = 1500; // 25 minutes
const SHORT_BREAK = 300; // 5 minutes
const LONG_BREAK = 900; // 15 minutes

const Timer = ({ activities, selectedActivityId }) => {
  const [timeLeft, setTimeLeft] = useState(POMODORO);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const audioRef = useRef(null);

  // Find the selected activity
  const selectedActivity = activities.find(activity => activity.id === selectedActivityId);

  // Reset timer when mode changes
  useEffect(() => {
    setIsActive(false);
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(POMODORO);
        break;
      case 'shortBreak':
        setTimeLeft(SHORT_BREAK);
        break;
      case 'longBreak':
        setTimeLeft(LONG_BREAK);
        break;
      default:
        setTimeLeft(POMODORO);
    }
  }, [mode]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      audioRef.current.play();
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft]);

  // Update document title when timer is active
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      const activityText = selectedActivity ? ` | ${selectedActivity.text}` : ' | Time to focus!';
      document.title = `${timeString}${activityText}`;
    } else {
      document.title = 'Intent App';
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'Intent App';
    };
  }, [isActive, timeLeft, selectedActivity]);

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
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(POMODORO);
        break;
      case 'shortBreak':
        setTimeLeft(SHORT_BREAK);
        break;
      case 'longBreak':
        setTimeLeft(LONG_BREAK);
        break;
      default:
        setTimeLeft(POMODORO);
    }
  };

  const getModeDuration = () => {
    switch (mode) {
      case 'pomodoro':
        return POMODORO;
      case 'shortBreak':
        return SHORT_BREAK;
      case 'longBreak':
        return LONG_BREAK;
      default:
        return POMODORO;
    }
  };

  return (
    <div className={styles.timer}>
      <audio ref={audioRef} src="/assets/notification.mp3" />
      {selectedActivity && (
        <div className={styles.selectedActivity}>
          <h3 className={styles.activityTitle}>Focusing on:</h3>
          <p className={styles.activityText}>{selectedActivity.text}</p>
        </div>
      )}
      <div className={styles.modeButtons}>
        <button 
          className={`${styles.modeButton} ${mode === 'pomodoro' ? styles.activeMode : ''}`}
          onClick={() => setMode('pomodoro')}
        >
          Pomodoro
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'shortBreak' ? styles.activeMode : ''}`}
          onClick={() => setMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`${styles.modeButton} ${mode === 'longBreak' ? styles.activeMode : ''}`}
          onClick={() => setMode('longBreak')}
        >
          Long Break
        </button>
      </div>
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
