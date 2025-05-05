import { Outlet, NavLink } from 'react-router-dom';
import LayoutMerchant from '../components/LayoutMerchant';
import LogoutButton from '../components/LogoutButton';

export default function DashboardMerchant() {
  const tabClass = ({ isActive }) =>
    `px-4 py-2 rounded-t-lg transition ${
      isActive
        ? 'bg-white font-semibold dark:bg-gray-900 dark:text-white'
        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
    }`;

  return (
    <LayoutMerchant>
      <div className="max-w-5xl mx-auto mt-4 shadow rounded-lg bg-white dark:bg-gray-800">
        <div className="text-right mt-6 mr-4">
          <LogoutButton />
        </div>

        <div className="flex border-b dark:border-gray-700 px-4">
          <NavLink to="/merchant" end className={tabClass}>📊 Tableau de bord</NavLink>
          <NavLink to="/merchant/settings" className={tabClass}>⚙️ Paramètres</NavLink>
          <NavLink to="/merchant/rewards" className={tabClass}>🎁 Offres</NavLink>
          <NavLink to="/merchant/transactions" className={tabClass}>📜 Transactions</NavLink>
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </LayoutMerchant>
  );
}
