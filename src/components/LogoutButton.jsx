import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_merchant');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('referrer_commerce');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 mt-4 rounded bg-red-600 hover:bg-red-700 text-white shadow"
    >
      🔒 Se déconnecter
    </button>
  );
}
