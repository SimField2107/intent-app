import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Menu from './Menu';
import Timer from './Timer';
import Card from './Card';
import styles from './ActivityView.module.css';

const ActivityView = () => {
  const { activeCard, setActiveCard, sessionCount } = useContext(AppContext);

  if (!activeCard) return null;

  return (
    <div className={styles.view}>
      <button onClick={() => setActiveCard(null)} className={styles.backButton}>
        &larr; Back to Board
      </button>
      <h1 className={styles.title}>{activeCard.title}</h1>
      <div className={styles.toolsContainer}>
        <Card title="Activities">
          <Menu />
        </Card>
        <Card
          title="Focus Timer"
          headerAccessory={<p>Sessions: {sessionCount}</p>}
        >
          <Timer />
        </Card>
      </div>
    </div>
  );
};

export default ActivityView;
