import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PublicLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={\`min-h-screen \${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}\`}>
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <Link to="/" className="text-xl font-bold">✨ Unikard</Link>
        <button onClick={() => setDarkMode(!darkMode)} className="px-2 py-1 border rounded">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}