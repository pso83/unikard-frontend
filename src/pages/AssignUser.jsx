import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AssignUser() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const nonMerchants = res.data.filter(u => !u.is_merchant);
        setUsers(nonMerchants);
      });
  }, []);

  const assignUser = () => {
    axios.post('http://localhost:5000/assign_user', { user_id: selectedUserId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setMessage(res.data.message);
    }).catch(err => {
      setMessage(err.response?.data?.error || 'Erreur');
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Assigner un client à ce commerce</h3>
      <select
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      >
        <option value="">-- Sélectionner un utilisateur --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name} - {u.email}</option>
        ))}
      </select>
      <button
        onClick={assignUser}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Assigner
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
