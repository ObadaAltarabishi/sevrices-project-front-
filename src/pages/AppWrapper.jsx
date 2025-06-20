// src/pages/AppWrapper.jsx
import { useState, useEffect } from 'react';
import App from '../App';

export default function AppWrapper() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <App darkMode={darkMode} setDarkMode={setDarkMode} />;
}