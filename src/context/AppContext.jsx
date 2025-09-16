import React, { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
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

  const value = {
    activities,
    setActivities,
    inputValue,
    setInputValue,
    filter,
    setFilter,
    selectedActivityId,
    setSelectedActivityId,
    handleSubmit,
    handleDeleteActivity,
    handleToggleComplete,
    handleSelectActivity
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
