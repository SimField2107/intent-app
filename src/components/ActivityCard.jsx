import React from 'react';
import styles from './ActivityCard.module.css';

const ActivityCard = ({ activity, onDelete, onToggleComplete, onSelectActivity, selectedActivityId }) => {
  const isSelected = selectedActivityId === activity.id;
  
  return (
    <li className={`${styles.listItem} ${activity.completed ? styles.completed : ''} ${isSelected ? styles.active : ''}`}>
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
    </li>
  );
};

export default ActivityCard;
