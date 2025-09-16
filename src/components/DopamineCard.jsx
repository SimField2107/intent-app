import React, { useContext, useRef } from 'react';
import AppContext from '../context/AppContext';
import styles from './DopamineCard.module.css';

const DopamineCard = ({ card }) => {
  const { setActiveCard, updateCardImage } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking edit button
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCardImage(card.id, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const cardStyle = card.imgSrc ? {
    backgroundImage: `url(${card.imgSrc})`
  } : {};

  return (
    <div 
      className={`${styles.card} ${card.imgSrc ? styles.hasImage : ''}`}
      style={cardStyle}
      onClick={() => setActiveCard(card)}
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
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />
    </div>
  );
};

export default DopamineCard;
