import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-700 dark:text-white">
        🌟 Unikard
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:underline">
          Connexion
        </Link>
        <Link to="/register" className="bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">
          Créer un compte
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
