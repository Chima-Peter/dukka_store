"use client"


import { createContext, useState, ReactNode } from "react";

// Define types for the context state
export interface NavigationContextType {
  showCategories: boolean;
  setShowCategories: (showCategories: boolean) => void;
  showAllCategories: boolean;
  setShowAllCategories: (showCategories: boolean) => void;
  showLoginBox: boolean;
  setShowLoginBox: (showLoginBox: boolean) => void
  categoryIndex: number;
  setCategoryIndex: (categoryIndex: number) => void
}


export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

// Create the provider component
const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // This state controls when the sub categories box should be shown
  const [showCategories, setShowCategories] = useState(false);

  // This state controls when the all categories box should be shown
  const [showAllCategories, setShowAllCategories] = useState(false);

  // This state controls when the login box should be shown
  const [showLoginBox, setShowLoginBox] = useState(false);

  // this state controls which category to show from category box
  const [categoryIndex, setCategoryIndex] = useState(100)

  const value = { showCategories, setShowCategories, showAllCategories, setShowAllCategories, showLoginBox, setShowLoginBox, categoryIndex, setCategoryIndex };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
};

export default NavigationProvider;
