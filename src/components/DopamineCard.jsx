import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard } = useContext(AppContext);

  return (
    <div className={styles.card} onClick={() => setActiveCard(card)}>
      <h3 className={styles.title}>{card.title}</h3>
    </div>
  );
};

export default DopamineCard;
