import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommerceStats() {
  const [stats, setStats] = useState({ clients: 0, tampons: 0, rewards: 0 });
  const [clientList, setClientList] = useState([]);
  const [clientStats, setClientStats] = useState({});
  const [selectedClientId, setSelectedClientId] = useState(null);

  const fetchData = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/commerce', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const id = res.data.id;

      axios.get(`http://localhost:5000/commerce/${id}/stats`)
        .then(r => setStats(r.data));

      axios.get('http://localhost:5000/users', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => {
        const clients = r.data.filter(u => !u.is_merchant && u.referrer_commerce === id);
        setClientList(clients);
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (id) => {
    axios.get(`http://localhost:5000/client/${id}/stats`).then((res) => {
      setSelectedClientId(id);
      setClientStats(res.data);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Confirmer la suppression de ce client ?')) {
      axios.delete(`http://localhost:5000/client/${id}`).then(() => {
        fetchData();
        setSelectedClientId(null);
        setClientStats({});
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Clients liés</h3>
          <p className="text-3xl">{stats.clients}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">ayant choisi ce commerce</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 text-gray-900 dark:text-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Tampons</h3>
          <p className="text-3xl">{stats.tampons}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800 text-gray-900 dark:text-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Récompenses</h3>
          <p className="text-3xl">{stats.rewards}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h4 className="text-lg font-semibold mb-2">Liste des clients associés :</h4>
        {clientList.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Aucun client enregistré.</p>
        ) : (
          <ul className="space-y-2 text-left">
            {clientList.map((client) => (
              <li key={client.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2 text-gray-800 dark:text-white">
                <div>
                  👤 {client.name || 'Utilisateur'} — <span className="text-sm text-gray-600 dark:text-gray-300">{client.email}</span>
                  {selectedClientId === client.id && (
                    <div className="text-sm text-green-500 mt-1">
                      Points: {clientStats.points} | Tampons: {clientStats.tampons}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(client.id)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    👁 Voir
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑 Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}