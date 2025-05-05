import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddPointsTampons({ commerceId }) {
  const [clients, setClients] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/commerce/${commerceId}/clients`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setClients(res.data));
  }, [commerceId]);

  const addPoints = async () => {
    const res = await axios.post(`http://localhost:5000/commerce/${commerceId}/add_points`, {
      user_id: selectedUser,
      amount: parseInt(amount)
    }, { headers: { Authorization: `Bearer ${token}` } });
    setMessage(res.data.message);
  };

  const addTampon = async () => {
    const res = await axios.post(`http://localhost:5000/commerce/${commerceId}/add_tampon`, {
      user_id: selectedUser
    }, { headers: { Authorization: `Bearer ${token}` } });
    setMessage(res.data.message);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Ajouter Points ou Tampons</h3>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="block w-full p-2 mb-4 rounded border dark:bg-gray-700 dark:text-white"
      >
        <option value="">Choisir un client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
        ))}
      </select>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-20 p-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button onClick={addPoints} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Ajouter Points
        </button>
        <button onClick={addTampon} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          🔖 Ajouter Tampon
        </button>
      </div>

      {message && <p className="text-sm text-green-500">{message}</p>}
    </div>
  );
}
