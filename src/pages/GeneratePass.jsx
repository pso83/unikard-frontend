import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

export default function GeneratePass() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePass = async () => {
    setLoading(true);
    setMessage('');
    const client_id = localStorage.getItem('user_id');
    const client_name = localStorage.getItem('user_name');
    const commerce_name = localStorage.getItem('commerce_name') || 'Unikard';

    try {
      const res = await axios.post('http://localhost:5000/generate-pass', {
        client_id,
        client_name,
        commerce_name
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${client_name || 'client'}.pkpass`);
      document.body.appendChild(link);
      link.click();
      setMessage('🎉 Carte générée et téléchargée !');
    } catch (err) {
      console.error(err);
      setMessage('❌ Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎟 Générer ma carte Apple Wallet</h2>
        <p className="text-gray-700 dark:text-gray-300">Ajoutez votre carte Unikard à Wallet (iOS)</p>

        <button
          onClick={generatePass}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {loading ? 'Génération en cours...' : '📲 Télécharger ma carte'}
        </button>

        {message && (
          <div className="mt-4 text-sm text-center text-green-600 dark:text-green-400">{message}</div>
        )}
      </div>
    </Layout>
  );
}