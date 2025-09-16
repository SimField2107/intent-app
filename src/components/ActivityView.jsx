import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
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
      <p>
        {/* This is where our tools like the Menu and Timer will go later. */}
        Activity content for this section will be here.
      </p>
    </div>
  );
};

export default ActivityView;
