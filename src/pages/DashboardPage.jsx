import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Timer from '../components/Timer';
import NotePad from '../components/NotePad';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [activities, setActivities] = useLocalStorage('activities', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newActivity = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setActivities([...activities, newActivity]);
      setInputValue('');
    }
  };

  const handleDeleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleToggleComplete = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, completed: !activity.completed }
        : activity
    ));
  };

  const handleSelectActivity = (id) => {
    setSelectedActivityId(id);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <Menu 
            activities={activities}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filter={filter}
            setFilter={setFilter}
            onAddActivity={handleSubmit}
            onDeleteActivity={handleDeleteActivity}
            onToggleComplete={handleToggleComplete}
            onSelectActivity={handleSelectActivity}
            selectedActivityId={selectedActivityId}
          />
        </div>
        <div className={styles.centerColumn}>
          <Timer 
            activities={activities}
            selectedActivityId={selectedActivityId}
          />
        </div>
        <div className={styles.rightColumn}>
          <NotePad />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
