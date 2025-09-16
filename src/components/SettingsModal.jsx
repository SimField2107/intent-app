import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import styles from './SettingsModal.module.css';

const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useContext(AppContext);
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement saving timer durations
    console.log('Saving settings:', {
      pomodoro: pomodoroDuration,
      shortBreak: shortBreakDuration,
      longBreak: longBreakDuration
    });
    setIsSettingsOpen(false);
  };

  if (!isSettingsOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Timer Settings</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>
        
        <form className={styles.form} onSubmit={handleSave}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="pomodoro">
              Pomodoro (minutes)
            </label>
            <input
              type="number"
              id="pomodoro"
              className={styles.input}
              value={pomodoroDuration}
              onChange={(e) => setPomodoroDuration(parseInt(e.target.value) || 25)}
              min="1"
              max="60"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="shortBreak">
              Short Break (minutes)
            </label>
            <input
              type="number"
              id="shortBreak"
              className={styles.input}
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(parseInt(e.target.value) || 5)}
              min="1"
              max="30"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="longBreak">
              Long Break (minutes)
            </label>
            <input
              type="number"
              id="longBreak"
              className={styles.input}
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(parseInt(e.target.value) || 15)}
              min="1"
              max="60"
            />
          </div>
          
          <div className={styles.buttons}>
            <button type="button" className={styles.cancelButton} onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
