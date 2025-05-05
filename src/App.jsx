import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePublic from './pages/HomePublic';
import PrivateRoute from './components/PrivateRoute';
import DashboardClient from './pages/DashboardClient';
import DashboardMerchant from './pages/DashboardMerchant';
import MyRewards from './pages/MyRewards';
import TransactionsClient from './pages/TransactionsClient';
import TransactionsMerchant from './pages/TransactionsMerchant';
import AndroidWalletPage from './pages/AndroidWalletPage';
import AppleWalletPage from './pages/AppleWalletPage';
import MerchantHome from './pages/MerchantHome';
import CommerceSettings from './pages/CommerceSettings';
import RewardsConfig from './pages/RewardsConfig';
import ClientHome from './pages/ClientHome';
import QRCodePage from './pages/QRCodePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Client */}
        <Route path="/client" element={<PrivateRoute><DashboardClient /></PrivateRoute>}>
        <Route index element={<ClientHome />} />
        <Route path="rewards" element={<MyRewards />} />
        <Route path="qrcode" element={<QRCodePage />} />
        <Route path="android" element={<AndroidWalletPage />} />
        <Route path="pass" element={<AppleWalletPage />} />
        <Route path="transactions" element={<TransactionsClient />} />
        </Route>

        {/* Marchand */}
        <Route path="/merchant" element={<PrivateRoute><DashboardMerchant /></PrivateRoute>}>
        <Route index element={<MerchantHome />} />
        <Route path="settings" element={<CommerceSettings />} />
        <Route path="rewards" element={<RewardsConfig />} />
        <Route path="transactions" element={<TransactionsMerchant />} />
      </Route>
        {/* Tu peux aussi ajouter /merchant/settings si tu sépares la page */}
      </Routes>
    </Router>
  );
}

export default App;
