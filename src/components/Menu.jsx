import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityCard from './ActivityCard';
import AppContext from '../context/AppContext';
import styles from './Menu.module.css';

const Menu = () => {
  const {
    activities,
    inputValue,
    setInputValue,
    filter,
    setFilter,
    handleSubmit,
    handleToggleComplete,
    handleSelectActivity,
    selectedActivityId
  } = useContext(AppContext);

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
      
      {activities.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>Ready to focus? Add your first activity to get started!</p>
        </div>
      ) : (
        (() => {
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
            <motion.ul className={styles.list}>
              <AnimatePresence>
                {filteredActivities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onToggleComplete={handleToggleComplete}
                onSelectActivity={handleSelectActivity}
                selectedActivityId={selectedActivityId}
              />
                ))}
              </AnimatePresence>
            </motion.ul>
          );
        })()
      )}
    </div>
  );
};

export default Menu;
