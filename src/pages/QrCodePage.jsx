import LayoutClient from '../components/LayoutClient';
import QRCode from 'react-qr-code';

export default function QrCodePage() {
  const userId = localStorage.getItem('user_id') || 'unknown';

  return (
    <LayoutClient>
      <div className="text-center text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-6">🎟️ Votre QR Code</h2>
        <div className="inline-block bg-white p-4 rounded shadow">
          <QRCode value={userId} />
        </div>
      </div>
    </LayoutClient>
  );
}
