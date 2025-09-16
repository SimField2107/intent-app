import React from 'react';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <form className={styles.form}>
        <input 
          type="text" 
          placeholder="Add a new activity..." 
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
      
      <ul className={styles.list}>
        <li className={styles.listItem}>10-Minute Walk</li>
        <li className={styles.listItem}>Deep Work on Project X</li>
        <li className={styles.listItem}>Read for 30 minutes</li>
      </ul>
    </div>
  );
};

export default Menu;
