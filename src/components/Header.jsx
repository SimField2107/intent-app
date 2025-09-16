import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import styles from './Header.module.css';

const Header = () => {
  const { setIsSettingsOpen } = useContext(AppContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Intent</h1>
      <button 
        className={styles.settingsButton}
        onClick={() => setIsSettingsOpen(true)}
      >
        Settings
      </button>
    </header>
  );
};

export default Header;
