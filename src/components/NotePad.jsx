import React from 'react';
import styles from './NotePad.module.css';

const NotePad = () => {
  return (
    <div className={styles.notepad}>
      <h2 className={styles.title}>Scratchpad</h2>
      <textarea 
        className={styles.textarea}
        placeholder="Jot down your thoughts..."
      />
    </div>
  );
};

export default NotePad;
