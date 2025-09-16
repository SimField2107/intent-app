import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useLocalStorage('activities', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [timerMode, setTimerMode] = useState('pomodoro');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const handleTimerComplete = () => {
    if (timerMode === 'pomodoro') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      
      // Every 4th session, take a long break, otherwise short break
      if (newCount % 4 === 0) {
        setTimerMode('longBreak');
      } else {
        setTimerMode('shortBreak');
      }
    } else if (timerMode === 'shortBreak' || timerMode === 'longBreak') {
      setTimerMode('pomodoro');
    }
  };

  const value = {
    activities,
    setActivities,
    inputValue,
    setInputValue,
    filter,
    setFilter,
    selectedActivityId,
    setSelectedActivityId,
    sessionCount,
    setSessionCount,
    timerMode,
    setTimerMode,
    isSettingsOpen,
    setIsSettingsOpen,
    handleSubmit,
    handleDeleteActivity,
    handleToggleComplete,
    handleSelectActivity,
    handleTimerComplete
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
