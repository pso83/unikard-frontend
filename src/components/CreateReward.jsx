import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateReward() {
  const [label, setLabel] = useState('');
  const [threshold, setThreshold] = useState(10);
  const [commerces, setCommerces] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/commerce', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setCommerces(res.data);
      if (res.data.length > 0) setSelectedCommerce(res.data[0].id);
    });
  }, [token]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/rewards',
        { commerce_id: selectedCommerce, label, threshold },
        { headers: { Authorization: `Bearer ${token}` } });
      alert('Récompense enregistrée !');
      setLabel('');
      setThreshold(10);
    } catch {
      alert('Erreur lors de l’enregistrement');
    }
  };

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-2">Créer une récompense</h2>
      <select className="border p-2 w-full mb-2" value={selectedCommerce} onChange={(e) => setSelectedCommerce(e.target.value)}>
        {commerces.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input className="border p-2 w-full mb-2" placeholder="Nom de la récompense" value={label} onChange={(e) => setLabel(e.target.value)} />
      <input type="number" className="border p-2 w-full mb-2" placeholder="Seuil" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Enregistrer</button>
    </div>
  );
}