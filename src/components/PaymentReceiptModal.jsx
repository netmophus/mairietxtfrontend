// // PaymentReceiptModal.jsx
// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// import { PDFViewer } from '@react-pdf/renderer';
// import PaymentReceiptPDF from './PaymentReceiptPDF';

// function PaymentReceiptModal({ open, onClose, paymentDetails }) {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
//       <DialogTitle sx={{ textAlign: 'center' }}>Reçu de Paiement</DialogTitle>
//       <DialogContent dividers>
//         <PDFViewer width="100%" height="600">
//           <PaymentReceiptPDF paymentDetails={paymentDetails} />
//         </PDFViewer>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="contained" color="primary">
//           Fermer
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default PaymentReceiptModal;
