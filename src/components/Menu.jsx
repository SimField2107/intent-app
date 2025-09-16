import React, { useState } from 'react';
import styles from './Menu.module.css';

const Menu = () => {
  const [activities, setActivities] = useState([
    { id: 1, text: '10-Minute Walk' },
    { id: 2, text: 'Deep Work on Project X' },
    { id: 3, text: 'Read for 30 minutes' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newActivity = {
        id: Date.now(), // Simple unique ID generation
        text: inputValue.trim()
      };
      setActivities([...activities, newActivity]);
      setInputValue('');
    }
  };

  return (
    <div className={styles.menu}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add a new activity..." 
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
      
      <ul className={styles.list}>
        {activities.map((activity) => (
          <li key={activity.id} className={styles.listItem}>
            {activity.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
