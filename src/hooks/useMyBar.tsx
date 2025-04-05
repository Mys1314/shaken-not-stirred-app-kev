
import React, { createContext, useContext, useState, useEffect } from 'react';

interface MyBarContextData {
  userIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
}

const MyBarContext = createContext<MyBarContextData | undefined>(undefined);

export const MyBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load user ingredients from localStorage or use empty array as fallback
  const [userIngredients, setUserIngredients] = useState<string[]>(() => {
    const savedIngredients = localStorage.getItem('userIngredients');
    return savedIngredients ? JSON.parse(savedIngredients) : [];
  });
  
  // Save to localStorage whenever userIngredients changes
  useEffect(() => {
    localStorage.setItem('userIngredients', JSON.stringify(userIngredients));
  }, [userIngredients]);
  
  const toggleIngredient = (ingredient: string) => {
    setUserIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(ing => ing !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    });
  };
  
  return (
    <MyBarContext.Provider value={{ userIngredients, toggleIngredient }}>
      {children}
    </MyBarContext.Provider>
  );
};

export const useMyBar = () => {
  const context = useContext(MyBarContext);
  if (context === undefined) {
    throw new Error('useMyBar must be used within a MyBarProvider');
  }
  return context;
};
