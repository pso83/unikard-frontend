import LayoutClient from '../components/LayoutClient';
import { useState } from 'react';

export default function AndroidWalletPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const downloadCard = async () => {
    setLoading(true);
    setError('');

    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
  const res = await fetch(`http://localhost:5000/generate_android_card/${userId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

  if (!res.ok) {
    const errData = await res.json();
    console.error("🛑 Erreur serveur :", errData);
    setError(errData.error || errData.msg || "Erreur inconnue");
    return;
  }

  const data = await res.json();

  if (data.url) {
    window.open(data.url, "_blank");
  } else {
    setError("Impossible de générer la carte.");
  }
} catch (err) {
  console.error("🚨 Erreur JS :", err);
  setError("Erreur lors de la connexion au serveur.");
}

    setLoading(false);
  };

  return (
    <LayoutClient>
      <div className="text-center text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6">📱 Carte Android - Unikard</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Téléchargez votre carte Unikard avec QR Code pour l’utiliser sur Android.
        </p>

        <button
          onClick={downloadCard}
          disabled={loading}
          className={`px-6 py-2 rounded font-semibold transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loading ? 'Génération...' : '📥 Télécharger la carte'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </LayoutClient>
  );
}
