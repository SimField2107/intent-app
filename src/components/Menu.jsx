import React from 'react';
import ActivityCard from './ActivityCard';
import styles from './Menu.module.css';

const Menu = ({ 
  activities, 
  inputValue, 
  setInputValue, 
  filter, 
  setFilter, 
  onAddActivity, 
  onDeleteActivity, 
  onToggleComplete, 
  onSelectActivity, 
  selectedActivityId 
}) => {

  return (
    <div className={styles.menu}>
      <form className={styles.form} onSubmit={onAddActivity}>
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
            onDelete={onDeleteActivity}
            onToggleComplete={onToggleComplete}
            onSelectActivity={onSelectActivity}
            selectedActivityId={selectedActivityId}
          />
            ))}
          </ul>
        );
      })()}
    </div>
  );
};

export default Menu;
