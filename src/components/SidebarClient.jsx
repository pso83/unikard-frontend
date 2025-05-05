import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function SidebarClient() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: '🏠 Tableau de bord', path: '/client' },
    { label: '🎁 Récompenses', path: '/client/rewards' },
    { label: '📜 Historique', path: '/client/transactions' },
    { label: '📱 Carte Android', path: '/client/android' },
    { label: '🍏 Carte Apple', path: '/client/pass' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="md:w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 min-h-screen md:block fixed left-0 top-0 z-40">
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <span className="text-xl font-bold text-gray-800 dark:text-white">Unikard</span>
        <button onClick={() => setOpen(!open)} className="text-gray-600 dark:text-gray-300">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`px-4 py-2 ${open ? 'block' : 'hidden'} md:block`}>
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded transition ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
