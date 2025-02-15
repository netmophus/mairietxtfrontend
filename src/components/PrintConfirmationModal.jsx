// // Modal de confirmation
// import React from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
// } from '@mui/material';

// const PrintConfirmationModal = ({
//   open,
//   onClose,
//   onConfirm,
//   isLoading,
// }) => {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           Confirmer l'envoi à l'impression
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 3 }}>
//           Voulez-vous générer les fichiers nécessaires pour l'impression de ce lot de reçus ?
//         </Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             gap: 2,
//           }}
//         >
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={onClose}
//             fullWidth
//           >
//             Annuler
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={onConfirm}
//             fullWidth
//             disabled={isLoading}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Confirmer'}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default PrintConfirmationModal;
