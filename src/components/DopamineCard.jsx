import React, { useContext, useRef } from 'react';
import AppContext from '../context/AppContext';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking edit button
    fileInputRef.current.click();
  };

  return (
    <div className={styles.card} onClick={() => setActiveCard(card)}>
      <h3 className={styles.title}>{card.title}</h3>
      <button 
        className={styles.editButton}
        onClick={handleEditClick}
        title="Edit image"
      >
        ✏️
      </button>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
      />
    </div>
  );
};

export default DopamineCard;
