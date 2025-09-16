import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard, updateCardImage } = useContext(AppContext);
  const inputId = `file-input-${card.id}`; // Create a unique ID for the input

  // We only need to stop propagation on the label's click
  const handleLabelClick = (event) => {
    event.stopPropagation();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateCardImage(card.id, reader.result);
    };
    event.target.value = null;
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
      {/* The button is now a label linked to the input */}
      <label
        htmlFor={inputId}
        className={styles.editButton}
        onClick={handleLabelClick}
        aria-label={`Edit image for ${card.title}`}
      >
        ✏️
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DopamineCard;