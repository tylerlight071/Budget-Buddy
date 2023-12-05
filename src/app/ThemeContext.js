"use client"

import { createContext, useState, useContext, useEffect } from "react";

// Define the available themes
const themes = {
  default: {
    background: "bg-gradient-to-r from-[#f0dfd6] to-[#c9a795]",
    // Add other default theme styles here
  },
  candy: {
    background: "bg-gradient-to-r from-[#FF69B4] to-[#FF4500]",
    // Add other candy theme styles here
  },
  darkula: {
    background: "bg-gradient-to-r from-[#282A36] to-[#44475A]",
    // Add other darkula theme styles here
  },
  lavender: {
    background: "bg-gradient-to-r from-[#E6E6FA] to-[#9370DB]",
    // Add other lavender theme styles here
  },
  seabreeze: {
    background: "bg-gradient-to-r from-[#5C7C7C] to-[#3D9D9D]",
    // Add other seabreeze theme styles here
  },
  sunflower: {
    background: "bg-gradient-to-r from-[#FFD700] to-[#FCCD04]",
    // Add other sunflower theme styles here
  },
  peachy: {
    background: "bg-gradient-to-r from-[#FFDAB9] to-[#FFA07A]",
    // Add other peachy theme styles here
  },
  christmas: {
    background: "bg-gradient-to-b from-[#000040] to-[#000000]",
    // Add other christmas theme styles here
    star: "absolute w-1 h-1 bg-white rounded-full",
  },

  halloween: {
    background: "bg-gradient-to-r from-[#FFA500] via-[#8B4513] to-[#000000]",
    // Add other halloween theme styles here
  },

  easter: {
    background: "bg-gradient-to-r from-[#FFC0CB] to-[#FFFF00]",
    // Add other easter theme styles here
  },
};

// Create the ThemeContext
const ThemeContext = createContext();

// Create the ThemeProvider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    (typeof window !== 'undefined' && window.localStorage.getItem('theme')) || 'default'
  );

  // Save the selected theme to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
