import React, { useContext, useRef } from 'react';
import AppContext from '../context/AppContext';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard, updateCardImage } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const handleEditClick = (event) => {
    event.stopPropagation(); // Stops click from navigating
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateCardImage(card.id, reader.result);
    };
  };

  const cardStyle = {
    backgroundImage: card.imgSrc ? `url(${card.imgSrc})` : 'none',
  };

  return (
    <div
      className={`${styles.card} ${card.imgSrc ? styles.hasImage : ''}`}
      onClick={() => setActiveCard(card)}
      style={cardStyle}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveCard(card)}
    >
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
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DopamineCard;