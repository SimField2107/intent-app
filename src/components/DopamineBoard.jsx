import React, { useContext } from 'react';
import DopamineCard from './DopamineCard';
import AppContext from '../context/AppContext';
import styles from './DopamineBoard.module.css';

const DopamineBoard = () => {
  const { cardData } = useContext(AppContext);

  return (
    <div className={styles.board}>
      {cardData.map((card) => (
        <DopamineCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default DopamineBoard;
