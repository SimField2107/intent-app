import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, children, headerAccessory }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {headerAccessory && <div>{headerAccessory}</div>}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;
