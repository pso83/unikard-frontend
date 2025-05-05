import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/LayoutMerchant';

export default function TransactionsMerchant() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get("http://localhost:5000/transactions/merchant", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setTransactions(res.data))
    .catch(err => {
      console.error("❌ Erreur lors du chargement des transactions commerçant", err);
    });
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <Layout>
      <div className="text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">📋 Historique des Transactions</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="all">Toutes</option>
          <option value="points">Points</option>
          <option value="tampons">Tampons</option>
          <option value="reward">Récompenses</option>
        </select>

        <div className="space-y-3">
          {filteredTransactions.length === 0 && (
            <p className="text-gray-500">Aucune transaction trouvée.</p>
          )}

          {filteredTransactions.map((t, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow border dark:border-gray-700"
            >
              <p className="font-semibold capitalize">{t.type} {t.amount ? `: +${t.amount}` : ''}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Client ID : {t.user_id} — {new Date(t.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
