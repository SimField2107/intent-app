import React from 'react';
import styles from './ActivityCard.module.css';

const ActivityCard = ({ activity, onDelete, onToggleComplete }) => {
  return (
    <li className={`${styles.listItem} ${activity.completed ? styles.completed : ''}`}>
      <div className={styles.activityContent}>
        <input
          type="checkbox"
          checked={activity.completed}
          onChange={() => onToggleComplete(activity.id)}
          className={styles.checkbox}
        />
        <span className={styles.activityText}>{activity.text}</span>
      </div>
      <button 
        className={styles.deleteButton}
        onClick={() => onDelete(activity.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default ActivityCard;
