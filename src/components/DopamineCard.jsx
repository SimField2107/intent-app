import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { dummyData } from '../data/dummyActivities'; // Import the new data
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard, setActivities } = useContext(AppContext);

  const handleClick = () => {
    // Load the dummy data for this specific card into the global state
    if (dummyData[card.id]) {
      setActivities(dummyData[card.id]);
    }
    // Navigate to the activity view
    setActiveCard(card);
  };

  const cardStyle = {
    backgroundImage: card.imgSrc ? `url(${card.imgSrc})` : 'none',
  };

  return (
    <div
      className={`${styles.card} ${card.imgSrc ? styles.hasImage : ''}`}
      onClick={handleClick}
      style={cardStyle}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      <h3 className={styles.title}>{card.title}</h3>
    </div>
  );
};

export default DopamineCard;