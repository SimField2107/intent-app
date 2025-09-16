import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Menu from './Menu';
import Timer from './Timer';
import styles from './ActivityView.module.css';

const ActivityView = () => {
  const { activeCard, setActiveCard } = useContext(AppContext);

  if (!activeCard) return null;

  return (
    <div className={styles.view}>
      <button onClick={() => setActiveCard(null)} className={styles.backButton}>
        &larr; Back to Board
      </button>
      <h1 className={styles.title}>{activeCard.title}</h1>
      <div className={styles.toolsContainer}>
        <Menu />
        <Timer />
      </div>
    </div>
  );
};

export default ActivityView;
