import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './Menu.module.css';

const Menu = () => {
  const [activities, setActivities] = useLocalStorage('activities', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

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
      
      <div className={styles.filterButtons}>
        <button 
          className={`${styles.filterButton} ${filter === 'all' ? styles.activeButton : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterButton} ${filter === 'active' ? styles.activeButton : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`${styles.filterButton} ${filter === 'completed' ? styles.activeButton : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {(() => {
        let filteredActivities;
        switch (filter) {
          case 'active':
            filteredActivities = activities.filter(activity => !activity.completed);
            break;
          case 'completed':
            filteredActivities = activities.filter(activity => activity.completed);
            break;
          case 'all':
          default:
            filteredActivities = activities;
            break;
        }
        
        return (
          <ul className={styles.list}>
            {filteredActivities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            onDelete={handleDeleteActivity}
            onToggleComplete={handleToggleComplete}
          />
            ))}
          </ul>
        );
      })()}
    </div>
  );
};

export default Menu;
