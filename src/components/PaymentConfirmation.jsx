import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentReceiptPDF from '../components/PaymentReceiptPDF';
import { Box, Typography, Button } from '@mui/material';

function PaymentConfirmation() {
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  if (!paymentDetails) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Aucun détail de paiement disponible.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Paiement enregistré avec succès !
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Cliquez ci-dessous pour télécharger votre reçu de paiement au format PDF.
      </Typography>
      <PDFDownloadLink
        document={<PaymentReceiptPDF paymentDetails={paymentDetails} />}
        fileName="recu_paiement.pdf"
      >
        {({ loading }) =>
          loading ? (
            <Typography variant="body1">Génération du reçu...</Typography>
          ) : (
            <Button variant="contained" color="primary">
              Télécharger le reçu PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </Box>
  );
}

export default PaymentConfirmation;
