export default function TransactionsClient() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Appel pour récupérer les transactions
  }, []);

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  return (
    <LayoutClient>
      <div className="p-6 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">📜 Historique des transactions</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="all">Toutes</option>
          <option value="points">Points</option>
          <option value="tampons">Tampons</option>
          <option value="reward">Récompenses</option>
        </select>

        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <p>Aucune transaction trouvée.</p>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 border rounded dark:bg-gray-800 dark:border-gray-600"
              >
                <p>
                  <strong>Type :</strong> {tx.type}
                </p>
                <p>
                  <strong>Montant :</strong> {tx.amount || '-'}
                </p>
                <p>
                  <strong>Date :</strong> {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutClient>
  );
}
