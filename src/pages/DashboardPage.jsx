import React, { useContext } from 'react';
import Header from '../components/Header';
import DopamineBoard from '../components/DopamineBoard';
import ActivityView from '../components/ActivityView';
import SettingsModal from '../components/SettingsModal';
import AppContext from '../context/AppContext';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { isSettingsOpen, activityToDelete, setActivityToDelete, confirmDeleteActivity, activeCard } = useContext(AppContext);

  return (
    <div className={styles.dashboard}>
      <Header />
      <main className={styles.mainContent}>
        {activeCard ? <ActivityView /> : <DopamineBoard />}
      </main>
      {isSettingsOpen && <SettingsModal />}
      {activityToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this activity?</p>
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
