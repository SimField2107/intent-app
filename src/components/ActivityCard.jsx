import React from 'react';
import styles from './ActivityCard.module.css';

const ActivityCard = ({ activity, onDelete }) => {
  return (
    <li className={styles.listItem}>
      <span className={styles.activityText}>{activity.text}</span>
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
