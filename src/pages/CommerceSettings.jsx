
import { useEffect, useState } from 'react';
import axios from 'axios';
import AssignUserForm from './AssignUser';
import AssignedUsersList from './AssignedUsersList';

export default function CommerceSettings() {
  const [commerce, setCommerce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/commerce', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setCommerce(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setCommerce(null);
        });
    }
  }, [token]);

  console.log("Token utilisé :", token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommerce({ ...commerce, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/commerce', commerce, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Erreur mise à jour commerce', err);
    }
  };

  const handleCreateCommerce = async () => {
    const token = localStorage.getItem("token");
    setCreateMessage("");

    try {
      const res = await fetch("http://localhost:5000/commerce/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({}) // <-- important sinon content-length = 0
    });

      if (res.ok) {
        setCreateMessage("✅ Commerce créé !");
        setTimeout(() => window.location.reload(), 1000);  // rafraîchir les infos
      } else {
        const data = await res.json();
        console.error("Erreur API :", data);
        setCreateMessage(data.error || "❌ Erreur inconnue lors de la création du commerce.");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setCreateMessage("❌ Impossible de contacter le serveur.");
    }
  };

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Chargement...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">⚙️ Paramètres du commerce</h2>

      {!commerce && (
        <div className="mb-6">
          <button
            onClick={handleCreateCommerce}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            🏪 Créer mon commerce
          </button>
          {createMessage && <p className="mt-2 text-sm text-white dark:text-gray-300">{createMessage}</p>}
        </div>
      )}

      {commerce && (
        <>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="name"
              value={commerce.name || ''}
              onChange={handleChange}
              placeholder="Nom du commerce"
              className="input"
            />
            <input
              type="text"
              name="type"
              value={commerce.type || ''}
              onChange={handleChange}
              placeholder="Type de commerce"
              className="input"
            />
            <input
              type="text"
              name="address"
              value={commerce.address || ''}
              onChange={handleChange}
              placeholder="Adresse"
              className="input"
            />
            <input
              type="text"
              name="phone"
              value={commerce.phone || ''}
              onChange={handleChange}
              placeholder="Téléphone"
              className="input"
            />
            <input
              type="email"
              name="email"
              value={commerce.email || ''}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
            <input
              type="text"
              name="hours"
              value={commerce.hours || ''}
              onChange={handleChange}
              placeholder="Horaires d’ouverture"
              className="input"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
            >
              💾 Enregistrer
            </button>

            {success && <p className="text-green-500">✅ Commerce mis à jour avec succès !</p>}
          </form>
          <AssignUserForm />
          <AssignedUsersList />
        </>
      )}
    </div>
  );
}
