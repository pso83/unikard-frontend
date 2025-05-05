import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      const data = res.data;

      localStorage.setItem('token', data.token);
      localStorage.setItem('is_merchant', data.is_merchant);
      localStorage.setItem('user_name', data.name);
      localStorage.setItem('user_id', data.user_id); // ✅ nouveau

      navigate(data.is_merchant ? '/merchant' : '/client');
    } catch (err) {
      alert('Erreur de connexion');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Connexion
        </h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}