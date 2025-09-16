import React, { useState, useEffect, useRef, useContext } from 'react';
import AppContext from '../context/AppContext';
import styles from './Timer.module.css';

const Timer = () => {
  const { 
    activities, 
    selectedActivityId, 
    sessionCount, 
    setSessionCount, 
    timerMode, 
    setTimerMode, 
    isActive,
    setIsActive,
    startTimer,
    handleTimerComplete,
    settings
  } = useContext(AppContext);
  
  // Calculate durations from settings (convert minutes to seconds)
  const pomodoroDuration = settings.pomodoro * 60;
  const shortBreakDuration = settings.shortBreak * 60;
  const longBreakDuration = settings.longBreak * 60;
  
  const [timeLeft, setTimeLeft] = useState(() => settings.pomodoro * 60);
  const audioRef = useRef(null);

  // Find the selected activity
  const selectedActivity = activities.find(activity => activity.id === selectedActivityId);

  // Reset timer when mode changes
  useEffect(() => {
    setIsActive(false);
    switch (timerMode) {
      case 'pomodoro':
        setTimeLeft(pomodoroDuration);
        break;
      case 'shortBreak':
        setTimeLeft(shortBreakDuration);
        break;
      case 'longBreak':
        setTimeLeft(longBreakDuration);
        break;
      default:
        setTimeLeft(pomodoroDuration);
    }
  }, [timerMode, pomodoroDuration, shortBreakDuration, longBreakDuration]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
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
  const handleStartClick = async () => {
    // Request notification permission if not already granted
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    
    // Start the timer
    startTimer();
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSessionCount(0);
    setTimerMode('pomodoro');
    setTimeLeft(pomodoroDuration);
  };

  const getModeDuration = () => {
    switch (timerMode) {
      case 'pomodoro':
        return pomodoroDuration;
      case 'shortBreak':
        return shortBreakDuration;
      case 'longBreak':
        return longBreakDuration;
      default:
        return pomodoroDuration;
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
          className={`${styles.modeButton} ${timerMode === 'pomodoro' ? styles.activeMode : ''}`}
          onClick={() => setTimerMode('pomodoro')}
        >
          Pomodoro
        </button>
        <button 
          className={`${styles.modeButton} ${timerMode === 'shortBreak' ? styles.activeMode : ''}`}
          onClick={() => setTimerMode('shortBreak')}
        >
          Short Break
        </button>
        <button 
          className={`${styles.modeButton} ${timerMode === 'longBreak' ? styles.activeMode : ''}`}
          onClick={() => setTimerMode('longBreak')}
        >
          Long Break
        </button>
      </div>
      <div className={styles.timeDisplay}>{formatTime(timeLeft)}</div>
      <div className={styles.controls}>
        <button 
          className={`${styles.button} ${styles.startButton}`}
          onClick={handleStartClick}
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
      <p className={styles.sessionCount}>Sessions Completed: {sessionCount}</p>
    </div>
  );
};

export default Timer;
