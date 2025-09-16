import React from 'react';
import { motion } from 'framer-motion';
import styles from './ActivityCard.module.css';

const ActivityCard = ({ activity, onDelete, onToggleComplete, onSelectActivity, selectedActivityId }) => {
  const isSelected = selectedActivityId === activity.id;
  
  return (
    <motion.li 
      className={`${styles.listItem} ${activity.completed ? styles.completed : ''} ${isSelected ? styles.active : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className={styles.activityContent}>
        <input
          type="checkbox"
          checked={activity.completed}
          onChange={() => onToggleComplete(activity.id)}
          className={styles.checkbox}
        />
        <span className={styles.activityText}>{activity.text}</span>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.focusButton}
          onClick={() => onSelectActivity(activity.id)}
        >
          Focus
        </button>
        <button 
          className={styles.deleteButton}
          onClick={() => onDelete(activity.id)}
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default ActivityCard;
