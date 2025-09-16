import React, { useContext } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Timer from '../components/Timer';
import NotePad from '../components/NotePad';
import SettingsModal from '../components/SettingsModal';
import AppContext from '../context/AppContext';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { isSettingsOpen, activityToDelete, setActivityToDelete, confirmDeleteActivity } = useContext(AppContext);

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
      {activityToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this activity?</p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.cancelButton}
                onClick={() => setActivityToDelete(null)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={confirmDeleteActivity}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
