// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Modal,
// //   TextField,
// //   Button,
// //   Grid,
// //   MenuItem,
// // } from '@mui/material';
// // import axios from 'axios';

// // const GenerateReceiptsModal = ({ open, onClose, refreshReceiptBatches }) => {
// //   const [markets, setMarkets] = useState([]);
// //   const [selectedMarket, setSelectedMarket] = useState('');
// //   const [startReceipt, setStartReceipt] = useState('');
// //   const [endReceipt, setEndReceipt] = useState('');

// //   useEffect(() => {
// //     if (open) {
// //       const fetchMarkets = async () => {
// //         try {
// //           const token = localStorage.getItem('token');
// //           const response = await axios.get('http://localhost:5000/api/markets', {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           setMarkets(response.data);
// //         } catch (error) {
// //           console.error('Erreur lors de la récupération des marchés :', error.message);
// //         }
// //       };

// //       fetchMarkets();
// //     }
// //   }, [open]);

// //   const handleSubmit = async () => {
// //     if (!selectedMarket || !startReceipt || !endReceipt) {
// //       alert('Veuillez remplir tous les champs.');
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.post(
// //         'http://localhost:5000/api/receipt-batches',
// //         {
// //           market: selectedMarket,
// //           startReceipt,
// //           endReceipt,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (response.status === 201) {
// //         alert('Lot de reçus généré avec succès !');
// //         refreshReceiptBatches(); // Rafraîchir les lots de reçus
// //         onClose();
// //         setSelectedMarket('');
// //         setStartReceipt('');
// //         setEndReceipt('');
// //       }
// //     } catch (error) {
// //       console.error('Erreur lors de la génération des reçus :', error.message);
// //       alert('Une erreur est survenue lors de la génération des reçus.');
// //     }
// //   };

// //   return (
// //     <Modal open={open} onClose={onClose}>
// //       <Box
// //         sx={{
// //           position: 'absolute',
// //           top: '50%',
// //           left: '50%',
// //           transform: 'translate(-50%, -50%)',
// //           width: 400,
// //           bgcolor: 'background.paper',
// //           borderRadius: 2,
// //           boxShadow: 24,
// //           p: 4,
// //         }}
// //       >
// //         <Typography variant="h5" fontWeight="bold" gutterBottom>
// //           Générer des Reçus
// //         </Typography>
// //         <Grid container spacing={2}>
// //           <Grid item xs={12}>
// //             <TextField
// //               select
// //               fullWidth
// //               label="Sélectionner un Marché"
// //               value={selectedMarket}
// //               onChange={(e) => setSelectedMarket(e.target.value)}
// //             >
// //               {markets.map((market) => (
// //                 <MenuItem key={market._id} value={market._id}>
// //                   {market.name}
// //                 </MenuItem>
// //               ))}
// //             </TextField>
// //           </Grid>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Numéro de départ"
// //               value={startReceipt}
// //               onChange={(e) => setStartReceipt(e.target.value)}
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               label="Numéro de fin"
// //               value={endReceipt}
// //               onChange={(e) => setEndReceipt(e.target.value)}
// //             />
// //           </Grid>
// //           <Grid item xs={12}>
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               fullWidth
// //               onClick={handleSubmit}
// //             >
// //               Générer
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default GenerateReceiptsModal;



// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
// } from '@mui/material';
// import axios from 'axios';

// const GenerateReceiptsModal = ({ open, onClose, refreshReceiptBatches }) => {
//   const [markets, setMarkets] = useState([]);
//   const [collectors, setCollectors] = useState([]); // Liste des collecteurs
//   const [selectedMarket, setSelectedMarket] = useState('');
//   const [selectedCollector, setSelectedCollector] = useState(''); // Collecteur sélectionné
//   const [startReceipt, setStartReceipt] = useState('');
//   const [endReceipt, setEndReceipt] = useState('');

//   useEffect(() => {
//     if (open) {
//       // Récupérer les marchés
//       const fetchMarkets = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get('http://localhost:5000/api/markets', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setMarkets(response.data);
//         } catch (error) {
//           console.error('Erreur lors de la récupération des marchés :', error.message);
//         }
//       };

//       // Récupérer les collecteurs
//       const fetchCollectors = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get('http://localhost:5000/api/markets/collectorss', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setCollectors(response.data);
//         } catch (error) {
//           console.error('Erreur lors de la récupération des collecteurs :', error.message);
//         }
//       };
  

//       fetchMarkets();
//       fetchCollectors();
//     }
//   }, [open]);

//   const handleSubmit = async () => {
//     if (!selectedMarket || !selectedCollector || !startReceipt || !endReceipt) {
//       alert('Veuillez remplir tous les champs.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/receipt-batches',
//         {
//           market: selectedMarket,
//           collector: selectedCollector,
//           startReceipt,
//           endReceipt,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Lot de reçus généré avec succès !');
//         refreshReceiptBatches(); // Rafraîchir les lots de reçus
//         onClose();
//         setSelectedMarket('');
//         setSelectedCollector('');
//         setStartReceipt('');
//         setEndReceipt('');
//       }
//     } catch (error) {
//       console.error('Erreur lors de la génération des reçus :', error.message);
//       alert('Une erreur est survenue lors de la génération des reçus.');
//     }
//   };

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
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Générer des Reçus
//         </Typography>
//         <Grid container spacing={2}>
//           {/* Sélectionner un marché */}
//           <Grid item xs={12}>
//             <TextField
//               select
//               fullWidth
//               label="Sélectionner un Marché"
//               value={selectedMarket}
//               onChange={(e) => setSelectedMarket(e.target.value)}
//             >
//               {markets.map((market) => (
//                 <MenuItem key={market._id} value={market._id}>
//                   {market.name}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>

//           {/* Sélectionner un collecteur */}
//         {/* Sélectionner un collecteur */}
//       <Grid item xs={12}>
//         <TextField
//           select
//           fullWidth
//           label="Sélectionner un Collecteur"
//           value={selectedCollector}
//           onChange={(e) => setSelectedCollector(e.target.value)}
//         >
//           {collectors.length === 0 ? (
//             <MenuItem disabled>Aucun collecteur disponible</MenuItem>
//           ) : (
//             collectors.map((collector) => (
//               <MenuItem key={collector._id} value={collector._id}>
//                 {collector.name} ({collector.phone})
//               </MenuItem>
//             ))
//           )}
//         </TextField>
//       </Grid>

//           {/* Numéro de départ */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Numéro de départ"
//               value={startReceipt}
//               onChange={(e) => setStartReceipt(e.target.value)}
//             />
//           </Grid>

//           {/* Numéro de fin */}
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Numéro de fin"
//               value={endReceipt}
//               onChange={(e) => setEndReceipt(e.target.value)}
//             />
//           </Grid>

//           {/* Bouton pour soumettre */}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleSubmit}
//             >
//               Générer
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

// export default GenerateReceiptsModal;
