import React, { useContext } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Timer from '../components/Timer';
import NotePad from '../components/NotePad';
import SettingsModal from '../components/SettingsModal';
import AppContext from '../context/AppContext';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { isSettingsOpen } = useContext(AppContext);

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
      {isSettingsOpen && <SettingsModal />}
    </div>
  );
};

export default DashboardPage;
