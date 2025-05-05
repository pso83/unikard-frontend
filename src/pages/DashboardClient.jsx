import { Outlet, NavLink } from 'react-router-dom';
import LayoutClient from '../components/LayoutClient';
import LogoutButton from '../components/LogoutButton';

export default function DashboardClient() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-t-lg transition ${
      isActive
        ? 'bg-white font-semibold dark:bg-gray-900 dark:text-white'
        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
    }`;

  return (
    <LayoutClient>
      <div className="max-w-5xl mx-auto mt-4 shadow rounded-lg bg-white dark:bg-gray-800">
        <div className="text-right mt-6 mr-4">
          <LogoutButton />
        </div>

        <div className="flex border-b dark:border-gray-700 px-4">
          <NavLink to="/client" end className={linkClass}>🏠 Accueil</NavLink>
          <NavLink to="/client/rewards" className={linkClass}>🎁 Récompenses</NavLink>
          <NavLink to="/client/qrcode" className={linkClass}>📷 QR Code</NavLink>
          <NavLink to="/client/android" className={linkClass}>🤖 Android</NavLink>
          <NavLink to="/client/pass" className={linkClass}>🍎 Apple Wallet</NavLink>
          <NavLink to="/client/transactions" className={linkClass}>📜 Historique</NavLink>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </LayoutClient>
  );
}
