import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <Menu />
        </div>
        <div className={styles.centerColumn}>
          <h2>Timer</h2>
        </div>
        <div className={styles.rightColumn}>
          <h2>Notes</h2>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
