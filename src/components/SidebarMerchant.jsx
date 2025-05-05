import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function SidebarMerchant() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const menuItems = [
    { label: 'Tableau de bord', path: '/merchant' },
    { label: 'Récompenses', path: '/merchant/rewards' },
    { label: 'Transactions', path: '/merchant/transactions' },
    { label: 'Paramètres', path: '/merchant/settings' },
  ];

  return (
    <div className="md:w-64 w-full md:fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow z-40">
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <span className="text-lg font-bold text-gray-900 dark:text-white">Unikard</span>
        <button onClick={toggle} className="text-gray-600 dark:text-gray-200">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`${open ? 'block' : 'hidden'} md:block px-4 py-2`}>
        <nav className="space-y-2 mt-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
