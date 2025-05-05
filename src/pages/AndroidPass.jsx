import Layout from '../components/Layout';
import QRCode from 'qrcode.react';

export default function AndroidPass() {
  const client_id = localStorage.getItem('user_id');
  const client_name = localStorage.getItem('user_name') || 'Client Unikard';
  const client_email = localStorage.getItem('user_email') || 'email@example.com';

  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${client_name}
EMAIL:${client_email}
NOTE:ID Unikard ${client_id}
END:VCARD
`;

  const downloadVCard = () => {
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'unikard.vcf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded shadow text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🤖 Ajouter à Google Wallet</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Scannez ce QR Code dans une app comme <strong>WalletPasses</strong> ou téléchargez votre carte .vcf.
        </p>

        <div className="flex justify-center">
          <QRCode
            value={client_id}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin
          />
        </div>

        <button
          onClick={downloadVCard}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          📥 Télécharger carte Android (.vcf)
        </button>
      </div>
    </Layout>
  );
}