import React from 'react';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ title }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default DopamineCard;
