
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function PaymentsSummaryPage() {
  const [paymentsSummary, setPaymentsSummary] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App
  const fetchPaymentsSummary = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin-dashboard/payments-summary`,
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
      setPaymentsSummary(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des paiements :', err.message);
    }
  };

  useEffect(() => {
    fetchPaymentsSummary();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        mt: 20,
        backgroundColor: '#f7f9fc',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#2c3e50',
        }}
      >
        Résumé des Paiements
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#e0e7ff', // Couleur d’en-tête
              }}
            >
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Collecteur
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Zone
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Total Collecté (FCFA)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Détails des Paiements
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentsSummary.length > 0 ? (
              paymentsSummary.map((summary, index) => (
                <TableRow
                  key={`${summary._id.collector}-${summary._id.zone}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  }}
                >
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {summary._id.collector || 'Non spécifié'}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {summary._id.zone || 'Non spécifiée'}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', color: '#2c3e50' }}>
                    {summary.totalAmount.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    {summary.payments.length > 0 ? (
                      summary.payments.map((payment, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 1,
                            mb: 1,
                            borderRadius: '8px',
                            backgroundColor: '#f1f5f9',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            {new Date(payment.paymentDate).toLocaleDateString()} -{' '}
                            {payment.amount.toLocaleString()} FCFA
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: '#999', textAlign: 'center' }}
                      >
                        Aucun paiement enregistré.
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#999' }}>
                  Aucun résumé de paiement disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PaymentsSummaryPage;
