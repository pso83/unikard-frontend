import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function HomePublic() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 p-6 text-center">
        <h1 className="text-4xl font-bold text-blue-900 dark:text-white mb-4">
          Bienvenue sur Unikard
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          La carte de fidélité universelle pour tous vos commerces préférés ✨
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Créer un compte
          </Link>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Se connecter
          </Link>
        </div>
      </main>
    </>
  );
}
