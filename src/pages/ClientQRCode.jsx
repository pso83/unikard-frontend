import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Layout from '../components/Layout';

export default function ClientQRCode() {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    id: localStorage.getItem('user_id') || 'inconnu'
  });

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_email');
    setClientInfo(prev => ({
      ...prev,
      name: name || 'Utilisateur',
      email: email || 'email inconnu'
    }));
  }, []);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎫 Mon QR Code</h2>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="text-gray-800 dark:text-white font-medium">Nom : {clientInfo.name}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Email : {clientInfo.email}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">ID : {clientInfo.id}</p>
        </div>

        <div className="mt-4">
          <QRCode
            value={clientInfo.id}
            size={180}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin
          />
        </div>

        <button
          onClick={() => window.print()}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          🖨 Imprimer ce reçu
        </button>
      </div>
    </Layout>
  );
}