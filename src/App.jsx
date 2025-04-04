import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardClient from './pages/DashboardClient';
import DashboardMerchant from './pages/DashboardMerchant';
import HomePublic from './pages/HomePublic';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client" element={<PrivateRoute><DashboardClient /></PrivateRoute>} />
        <Route path="/merchant" element={<PrivateRoute><DashboardMerchant /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;