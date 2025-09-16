import React, { createContext, useState, useEffect } from 'react';
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
  const [settings, setSettings] = useLocalStorage('timerSettings', { 
    pomodoro: 25, 
    shortBreak: 5, 
    longBreak: 15 
  });
  const [theme, setTheme] = useLocalStorage('appTheme', 'dark');

  // Update document theme when theme state changes
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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

  const startTimer = () => {
    setIsActive(true);
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

    // Send browser notification
    if (Notification.permission === 'granted') {
      let title, body;
      
      if (timerMode === 'pomodoro') {
        const newCount = sessionCount + 1;
        if (newCount % 4 === 0) {
          title = 'Pomodoro Complete!';
          body = 'Great work! Time for a long break.';
        } else {
          title = 'Pomodoro Complete!';
          body = 'Time for a short break.';
        }
      } else if (timerMode === 'shortBreak') {
        title = 'Break Complete!';
        body = 'Ready to focus? Start your next Pomodoro session.';
      } else if (timerMode === 'longBreak') {
        title = 'Long Break Complete!';
        body = 'Refreshed and ready! Time to start a new Pomodoro cycle.';
      }
      
      new Notification(title, { body });
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
    settings,
    setSettings,
    theme,
    toggleTheme,
    handleSubmit,
    handleDeleteActivity,
    handleToggleComplete,
    handleSelectActivity,
    startTimer,
    handleTimerComplete
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
