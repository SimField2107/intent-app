import React from 'react';
import DopamineCard from './DopamineCard';
import styles from './DopamineBoard.module.css';

const cardData = [
  { id: 1, title: 'For when you feel stressed' },
  { id: 2, title: 'For when you feel anxious' },
  { id: 3, title: 'After a bad day at work' },
  { id: 4, title: 'A burst of physical energy' },
  { id: 5, title: 'A moment of creativity' },
  { id: 6, title: 'To connect with others' },
];

const DopamineBoard = () => {
  return (
    <div className={styles.board}>
      {cardData.map((card) => (
        <DopamineCard key={card.id} title={card.title} />
      ))}
    </div>
  );
};

export default DopamineBoard;
