import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    is_merchant: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', form);
      navigate('/login');
    } catch (err) {
      alert('Erreur lors de l\'inscription');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Créer un compte
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-2 mb-4 border rounded text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 mb-4 border rounded text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <label className="flex items-center text-gray-800 dark:text-gray-200 mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={form.is_merchant}
              onChange={(e) => setForm({ ...form, is_merchant: e.target.checked })}
            />
            Je suis un commerçant
          </label>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}