import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignUserForm() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filtered = res.data.filter((u) => !u.is_merchant);
        setUsers(filtered);
      });
  }, [token]);

  const handleAssign = async () => {
    if (!selectedUserId) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/assign_user_to_commerce",
        { user_id: selectedUserId, commerce_id: null }, // null côté backend => il utilise get_jwt_identity
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Utilisateur assigné.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Erreur assignation :", err);
      setMessage("❌ Erreur lors de l’assignation.");
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        👤 Assigner un client à ce commerce
      </h3>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="w-full p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
      >
        <option value="">-- Sélectionner un client --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>
      <button
        onClick={handleAssign}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        🔗 Assigner
      </button>
      {message && (
        <p className="text-sm mt-2 text-gray-900 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
}
