import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Timer from '../components/Timer';
import NotePad from '../components/NotePad';
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
          <NotePad />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
