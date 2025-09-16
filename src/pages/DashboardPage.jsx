import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Timer from '../components/Timer';
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
          <Timer />
        </div>
        <div className={styles.rightColumn}>
          <h2>Notes</h2>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
