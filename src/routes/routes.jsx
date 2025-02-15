import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Remplace UserContext par AuthContext
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/AdminDashboard';
import CollectorDashboard from '../pages/CollectorDashboard';
import TaxpayerDashboard from '../pages/TaxpayerDashboard';
import UserManagementPage from '../pages/UserManagementPage'; // Import de la nouvelle page
import ProfilePage from '../pages/ProfilePage';
import TaxManagementPage from '../pages/TaxManagementPage';
import ZoneManagementPage from '../pages/ZoneManagementPage';
import CollectorManagementPage from '../pages/CollectorManagementPage';
import TaxpayerManagementPage from '../pages/TaxpayerManagementPage';
import PaymentManagementPage from '../pages/PaymentManagementPage';
import AssociateTaxesPage from '../pages/AssociateTaxesPage';
import PaymentsSummaryPage from '../components/PaymentsSummaryPage';
import ContributorsPage from '../pages/ContributorsPage';
import HomePage from '../pages/HomePage';
import ListeTaxpayerPage from '../pages/ListeTaxpayerPage'; // Importez la nouvelle page

import PaymentHistoryPage from '../pages/PaymentHistoryPage';
import GestionRecusPage from '../pages/GestionRecusPage';
import CreateMarketPage from '../pages/CreateMarketPage';
import ReceiptGeneratePage from '../pages/ReceiptGeneratePage';
import TaxeMarketPaiementPage from '../pages/TaxeMarketPaiementPage';

import MarketStatsPage from '../pages/MarketStatsPage';
import AdminStatDetailsCardPage from '../pages/AdminStatDetailsCardPage';
import MarketStateReportPage from "../pages/MarketStateReportPage";
//import PaymentConfirmation from "../components/PaymentConfirmation";
// Définir une route protégée
const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext); // Utiliser AuthContext pour accéder à l'utilisateur

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to={`/${user.role}-dashboard`} />;
  return children;
};

// Définir les routes principales
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes protégées */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collector-dashboard"
        element={
          <ProtectedRoute role="collector">
            <CollectorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contribuable-dashboard"
        element={
          <ProtectedRoute role="contribuable">
            <TaxpayerDashboard />
          </ProtectedRoute>
        }
      />

<Route
  path="/admin/users"
  element={
    <ProtectedRoute role="admin">
      <UserManagementPage />
    </ProtectedRoute>
  }
/>

   <Route
  path="/profile"
  element={
    <ProtectedRoute role="contribuable">
      <ProfilePage />
    </ProtectedRoute>
  }
/>      


{/* <Route
  path="/profile"
  element={
    <ProtectedRoute roles={['admin', 'collector']}>
     <ProfilePage />
    </ProtectedRoute>
  }
/> */}




<Route
  path="/admin/taxes"
  element={
    <ProtectedRoute role="admin">
      <TaxManagementPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/zones"
  element={
    <ProtectedRoute role="admin">
      <ZoneManagementPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/collectors"
  element={
    <ProtectedRoute role="admin">
      <CollectorManagementPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/collector/taxpayers"
  element={
    <ProtectedRoute role="collector">
      <TaxpayerManagementPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/collector/associate-taxes"
  element={
    <ProtectedRoute role="collector">
      <AssociateTaxesPage />
    </ProtectedRoute>
  }
/>


 <Route
  path="/collector/payments"
  element={
    <ProtectedRoute role="collector">
      <PaymentManagementPage />
    </ProtectedRoute>
  }
/> 


<Route
  path="/liste-taxpayer"
  element={
    <ProtectedRoute role="collector">
      <ListeTaxpayerPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/collector/payment-history/:taxpayerId"
  element={
    <ProtectedRoute role="collector">
      <PaymentHistoryPage />
    </ProtectedRoute>
  }
/>






<Route
  path="/collector/payments/:taxpayerId"
  element={
    <ProtectedRoute role="collector">
      <PaymentManagementPage />
    </ProtectedRoute>
  }
/>





<Route
  path="/admin/payments-summary"
  element={
    <ProtectedRoute role="admin">
      <PaymentsSummaryPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/contributors"
  element={
    <ProtectedRoute role="admin">
      <ContributorsPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/recus"
  element={
    <ProtectedRoute role="admin">
      <GestionRecusPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/create-market"
  element={
    <ProtectedRoute role="admin">
      <CreateMarketPage />
    </ProtectedRoute>
  }
/>;


<Route
  path="/generate-receipts"
  element={
    <ProtectedRoute role="admin">
      <ReceiptGeneratePage />
    </ProtectedRoute>
  }
/>


<Route
  path="/collector/taxemarket/:marketId"
  element={
    <ProtectedRoute role="collector">
      <TaxeMarketPaiementPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/marketstats"
  element={
    <ProtectedRoute role="admin">
      <MarketStatsPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/marketstats/:marketId/details"
  element={
    <ProtectedRoute role="admin">
      <AdminStatDetailsCardPage />
    </ProtectedRoute>
  }
/>


<Route
  path="/admin/marketstatereport/:marketId"
  element={
    <ProtectedRoute role="admin">
      <MarketStateReportPage />
    </ProtectedRoute>
  }
/>





<Route
  path="/markets/:marketId/details"
  element={
    <ProtectedRoute role="admin">
      <AdminStatDetailsCardPage />
    </ProtectedRoute>
  }
/>


 {/* <Route
  path="/payment-confirmation"
  element={
    <ProtectedRoute role="collector">
      <PaymentConfirmation />
    </ProtectedRoute>
  }
/>  */}





    </Routes>
  );
};

export default AppRoutes;
