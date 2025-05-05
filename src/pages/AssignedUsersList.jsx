import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignedUsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const commerceId = localStorage.getItem('commerce_id');

    if (token && commerceId) {
      axios.get(`http://localhost:5000/commerce/${commerceId}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setUsers(res.data))
      .catch(() => setError("Impossible de charger les utilisateurs liés."));
    }
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">👥 Clients liés à ce commerce</h3>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Aucun utilisateur lié pour l’instant.</p>
      ) : (
        <ul className="space-y-2">
          {users.map(user => (
            <li
              key={user.id}
              className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
