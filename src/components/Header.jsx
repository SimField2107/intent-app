import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import styles from './Header.module.css';

const Header = () => {
  const { setIsSettingsOpen, theme, toggleTheme } = useContext(AppContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Intent</h1>
      <div className={styles.controls}>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <button onClick={() => setIsSettingsOpen(true)}>Settings</button>
      </div>
    </header>
  );
};

export default Header;
