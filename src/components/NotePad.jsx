import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './NotePad.module.css';

const NotePad = () => {
  const [note, setNote] = useLocalStorage('notepadContent', 
    'This is your personal scratchpad. Jot down quick thoughts, ideas, or daily affirmations here!'
  );

  return (
    <div className={styles.notepad}>
      <textarea 
        className={styles.textarea}
        placeholder="Jot down your thoughts..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
};

export default NotePad;
