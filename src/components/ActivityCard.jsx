import React from 'react';
import styles from './ActivityCard.module.css';

const ActivityCard = ({ activity }) => {
  return (
    <li className={styles.listItem}>
      {activity.text}
    </li>
  );
};

export default ActivityCard;
