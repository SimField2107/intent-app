import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../context/AppContext';
import styles from './SettingsModal.module.css';

const SettingsModal = () => {
  const { isSettingsOpen, setIsSettingsOpen, settings, setSettings } = useContext(AppContext);
  const [pomodoroDuration, setPomodoroDuration] = useState(settings.pomodoro.toString());
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreak.toString());
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreak.toString());

  // Update local state when settings change
  useEffect(() => {
    setPomodoroDuration(settings.pomodoro.toString());
    setShortBreakDuration(settings.shortBreak.toString());
    setLongBreakDuration(settings.longBreak.toString());
  }, [settings]);

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSettings({
      pomodoro: parseInt(pomodoroDuration) || 25,
      shortBreak: parseInt(shortBreakDuration) || 5,
      longBreak: parseInt(longBreakDuration) || 15
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
          <div className={styles.field}>
            <label htmlFor="pomodoro">
              Pomodoro (minutes)
            </label>
            <input
              type="number"
              id="pomodoro"
              value={pomodoroDuration}
              onChange={(e) => setPomodoroDuration(e.target.value)}
              min="1"
              max="60"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="shortBreak">
              Short Break (minutes)
            </label>
            <input
              type="number"
              id="shortBreak"
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(e.target.value)}
              min="1"
              max="30"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="longBreak">
              Long Break (minutes)
            </label>
            <input
              type="number"
              id="longBreak"
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(e.target.value)}
              min="1"
              max="60"
            />
          </div>
          
          <div className={styles.actions}>
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
