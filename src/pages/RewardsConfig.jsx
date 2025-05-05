import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RewardsConfig() {
  const [rewards, setRewards] = useState([]);
  const [newLabel, setNewLabel] = useState('');
  const [newThreshold, setNewThreshold] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/rewards', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRewards(res.data));
  }, []);

  const addReward = async () => {
    const token = localStorage.getItem('token');
    const newReward = { label: newLabel, threshold: newThreshold };
    try {
      await axios.post('http://localhost:5000/rewards', newReward, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRewards([...rewards, newReward]);
      setNewLabel('');
      setNewThreshold(10);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Configuration des offres</h2>
      <ul className="mb-4 space-y-1">
        {rewards.map((r, i) => (
          <li key={i}>🎁 {r.label} — {r.threshold} tampons</li>
        ))}
      </ul>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Offre"
          className="flex-1 border p-2 rounded"
        />
        <input
          type="number"
          value={newThreshold}
          onChange={(e) => setNewThreshold(Number(e.target.value))}
          placeholder="Seuil"
          className="w-24 border p-2 rounded"
        />
        <button
          onClick={addReward}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}