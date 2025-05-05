import { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutMerchant from '../components/LayoutMerchant';

export default function AssignUsersPage() {
  const [users, setUsers] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));

    axios.get('http://localhost:5000/commerce', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCommerces([res.data]))
      .catch(() => setCommerces([]));
  }, []);

  const assignCommerce = (userId, commerceId) => {
    axios.patch(`http://localhost:5000/user/${userId}/assign_commerce`,
      { commerce_id: commerceId },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => setMessage('✅ Commerce assigné avec succès !'))
      .catch(() => setMessage('❌ Une erreur est survenue.'));
  };

  return (
    <LayoutMerchant>
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">👥 Assigner des utilisateurs à un commerce</h2>
        {message && <div className="mb-4 text-green-500 dark:text-green-300">{message}</div>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-800 dark:text-white">
              <th className="border-b p-2">Nom</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Commerce</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => !u.is_merchant).map(user => (
              <tr key={user.id} className="text-gray-800 dark:text-gray-100">
                <td className="p-2">{user.name || 'Sans nom'}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select
                    value={user.referrer_commerce || ''}
                    onChange={(e) => assignCommerce(user.id, e.target.value)}
                    className="rounded border px-2 py-1 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">-- Aucun --</option>
                    {commerces.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => assignCommerce(user.id, user.referrer_commerce)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >Assigner</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutMerchant>
  );
}
