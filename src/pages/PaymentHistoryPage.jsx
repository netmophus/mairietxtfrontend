
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
} from '@mui/material';

const PaymentHistoryPage = () => {
  const { taxpayerId } = useParams(); // Récupère l'ID du contribuable depuis l'URL
  const [taxpayerDetails, setTaxpayerDetails] = useState(null);
  const [payments, setPayments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { taxpayerPhone } = useParams(); // Récupérer le numéro de téléphone depuis les paramètres
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


const fetchPaymentDetails = async () => {
    console.log("ID utilisé dans la requête :", taxpayerId); // Log pour vérifier l'ID
  
    try {
      const response = await fetch(
        `${API_URL}/api/payments/taxpayer/${taxpayerId}/payment-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des paiements.');
      }
  
      const data = await response.json();
      console.log("Données récupérées :", data); // Log des données récupérées
      setTaxpayerDetails(data.taxpayer); // Met à jour les détails du contribuable
      setPayments(data.payments); // Met à jour les paiements
    } catch (err) {
      console.error('Erreur :', err.message);
    }
  };
  
  useEffect(() => {
    console.log("Appel de fetchPaymentDetails avec taxpayerId :", taxpayerId);
    fetchPaymentDetails();
  }, [taxpayerId]);
  
  


  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPayment(null);
  };

  return (
    <Box sx={{ p: 3, mt: 17 }}>
      {/* Informations sur le contribuable */}




      {taxpayerDetails && (
  <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
      Informations sur le Contribuable
    </Typography>
    <Typography><strong>Nom :</strong> {taxpayerDetails.name || "Non disponible"}</Typography>
    <Typography><strong>Téléphone :</strong> {taxpayerDetails.phone || "Non disponible"}</Typography>
    <Typography><strong>Zone Géographique :</strong> {taxpayerDetails.zone?.name || "Non disponible"}</Typography>
  </Box>
)}


      {/* Tableau des paiements */}
      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#007BFF' }}>
            <TableRow>
              {['Montant Payé', 'Montant Restant', 'Date', 'Actions'].map((header) => (
                <TableCell key={header} sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
   





          <TableBody>
  {payments.map((payment) => (
    <TableRow key={payment._id}>
      <TableCell sx={{ textAlign: 'center' }}>{payment.amount} FCFA</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {payment.remainingAmount !== undefined
          ? `${payment.remainingAmount} FCFA`
          : 'Non disponible'}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {new Date(payment.paymentDate).toLocaleDateString()}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Action pour le paiement :", payment)}
        >
          Détails
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>















        </Table>
      </TableContainer>

      {/* Modal pour les détails des paiements partiels */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: '8px' }}>
          <Typography variant="h6" gutterBottom>Détails du Paiement</Typography>
          {selectedPayment && (
            <Box>
              <Typography>Montant Payé : {selectedPayment.amountPaid} FCFA</Typography>
              <Typography>Montant Restant : {selectedPayment.remainingAmount} FCFA</Typography>
              <Typography>Date : {new Date(selectedPayment.paymentDate).toLocaleDateString()}</Typography>
            </Box>
          )}
          <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>Fermer</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentHistoryPage;
