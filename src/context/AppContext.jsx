import React, { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useLocalStorage('activities', [
    { id: 1, text: 'Go for a 10-minute walk', completed: true },
    { id: 2, text: 'Read one chapter of a book', completed: false },
    { id: 3, text: "Plan tomorrow's top 3 priorities", completed: false },
  ]);
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
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Initial card data for the Dopamine Board
  const initialCards = [
    { id: 1, title: 'For when you feel stressed', imgSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop&crop=center' },
    { id: 2, title: 'For when you feel anxious', imgSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&h=1080&fit=crop&crop=center' },
    { id: 3, title: 'After a bad day at work', imgSrc: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080&h=1080&fit=crop&crop=center' },
    { id: 4, title: 'A burst of physical energy', imgSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&h=1080&fit=crop&crop=center' },
    { id: 5, title: 'A moment of creativity', imgSrc: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1080&h=1080&fit=crop&crop=center' },
    { id: 6, title: 'To connect with others', imgSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1080&h=1080&fit=crop&crop=center' },
  ];

  const [cards, setCards] = useLocalStorage('dopamineCards', initialCards);

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
    setActivityToDelete(id);
  };

  const confirmDeleteActivity = () => {
    setActivities(activities.filter(activity => activity.id !== activityToDelete));
    setActivityToDelete(null);
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

  const updateCardImage = (cardId, newImgSrc) => {
    console.log('3. updateCardImage function called for card ID:', cardId);
    setCards(currentCards =>
      currentCards.map(card =>
        card.id === cardId ? { ...card, imgSrc: newImgSrc } : card
      )
    );
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const handleTimerComplete = () => {
    setIsActive(false);
    
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
    activityToDelete,
    setActivityToDelete,
    isActive,
    setIsActive,
    cards,
    setCards,
    updateCardImage,
    activeCard,
    setActiveCard,
    handleSubmit,
    handleDeleteActivity,
    confirmDeleteActivity,
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
