import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return <button onClick={handleLogout} className="mt-4 text-sm text-red-500 underline">Se déconnecter</button>;
}