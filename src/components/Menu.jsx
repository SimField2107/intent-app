import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import styles from './Menu.module.css';

const Menu = () => {
  const [activities, setActivities] = useState([
    { id: 1, text: '10-Minute Walk', completed: false },
    { id: 2, text: 'Deep Work on Project X', completed: false },
    { id: 3, text: 'Read for 30 minutes', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newActivity = {
        id: Date.now(), // Simple unique ID generation
        text: inputValue.trim(),
        completed: false
      };
      setActivities([...activities, newActivity]);
      setInputValue('');
    }
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleToggleComplete = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed }
        : activity
    ));
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
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onDelete={handleDeleteActivity}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
