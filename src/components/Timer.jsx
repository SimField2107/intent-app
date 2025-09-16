import React from 'react';
import styles from './Timer.module.css';

const Timer = () => {
  return (
    <div className={styles.timer}>
      <div className={styles.timeDisplay}>25:00</div>
      <div className={styles.controls}>
        <button className={`${styles.button} ${styles.startButton}`}>
          Start
        </button>
        <button className={`${styles.button} ${styles.pauseButton}`}>
          Pause
        </button>
        <button className={`${styles.button} ${styles.resetButton}`}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
