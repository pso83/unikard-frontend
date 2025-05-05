import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function MyRewards() {
  const [tampons, setTampons] = useState(0);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const commerceId = localStorage.getItem('referrer_commerce');

    if (token && commerceId) {
      axios.get(`http://localhost:5000/client/${localStorage.getItem('user_id')}/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setTampons(res.data.tampons || 0);
      });

      axios.get('http://localhost:5000/rewards', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setRewards(res.data);
      });
    }
  }, []);

  const unlockedRewards = rewards.filter(r => tampons >= r.threshold);

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🎁 Mes Récompenses</h2>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Vous avez actuellement <strong className="text-black dark:text-white">{tampons}</strong> tampons.
          </p>

          {unlockedRewards.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Vous n’avez débloqué aucune récompense pour le moment.</p>
          ) : (
            <ul className="space-y-2">
              {unlockedRewards.map((reward) => (
                <li key={reward.id} className="p-3 rounded bg-green-100 dark:bg-green-800 text-gray-800 dark:text-white">
                  🏆 {reward.label} — débloqué à {reward.threshold} tampons
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}