import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignUserForm() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data.filter(u => !u.is_merchant)))
      .catch(() => setUsers([]));
  }, []);

  const assignUser = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/assign_user_to_commerce', { user_id: selectedUserId }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage("❌ Erreur lors de l’affectation."));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">🧑‍🤝‍🧑 Affecter un utilisateur au commerce</h3>
      <div className="flex gap-4 items-center">
        <select
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
          className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
        >
          <option value="">-- Choisir un utilisateur --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name || user.email}</option>
          ))}
        </select>
        <button
          onClick={assignUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assigner
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
}
