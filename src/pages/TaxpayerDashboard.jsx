import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Paper, Avatar, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReceiptIcon from '@mui/icons-material/Receipt';



function TaxpayerDashboard() {
  // Exemple de données fictives


 
  const [error, setError] = useState('');
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


  

// Fonction pour récupérer l'historique des paiements

const fetchPaymentHistory = async () => {
  console.log('Début de la récupération des paiements');
  setLoading(true);
  setError('');

  try {
    const response = await fetch(`${API_URL}/api/taxpayers-dashboard/payment-history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log('Réponse brute de l’API :', response);

    if (!response.ok) {
      console.error('Erreur dans la réponse HTTP :', response.status, response.statusText);
      throw new Error(`Erreur lors de la récupération des paiements : ${response.status}`);
    }

    const data = await response.json();
    console.log('Données récupérées :', data);

    setPayments(data.payments);
  } catch (err) {
    console.error('Erreur lors de la récupération des paiements :', err.message);
    setError(err.message);
  } finally {
    setLoading(false);
    console.log('Fin de la récupération des paiements');
  }
};


useEffect(() => {
  fetchPaymentHistory(); // Récupérer l'historique des paiements au chargement
}, []);







  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' , mt:18,}}>
      {/* Titre principal */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tableau de Bord Contribuable
      </Typography>

    




      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Bienvenue, voici un aperçu de votre situation fiscale.
      </Typography>

      {/* Section Vue d’Ensemble */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 3,
              borderRadius: 2,
              backgroundColor: '#1976d2',
              color: 'white',
            }}
          >
            <Box>
              <Typography variant="h6">Montant Total Dû</Typography>
              <Typography variant="h4" fontWeight="bold">
                25,000 FCFA
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', color: '#1976d2' }}>
              <MonetizationOnIcon />
            </Avatar>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 3,
              borderRadius: 2,
              backgroundColor: '#4caf50',
              color: 'white',
            }}
          >
            <Box>
              <Typography variant="h6">Montant Payé</Typography>
              <Typography variant="h4" fontWeight="bold">
                15,000 FCFA
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', color: '#4caf50' }}>
              <ReceiptIcon />
            </Avatar>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 3,
              borderRadius: 2,
              backgroundColor: '#ff9800',
              color: 'white',
            }}
          >
            <Box>
              <Typography variant="h6">Prochaines Échéances</Typography>
              <Typography variant="h4" fontWeight="bold">
                10,000 FCFA
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', color: '#ff9800' }}>
              <NotificationsActiveIcon />
            </Avatar>
          </Paper>
        </Grid>
      </Grid>

   

{/* Section Historique des Paiements */}
<Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
  Historique des Paiements
</Typography>

{/* Message d'erreur */}
{error && (
  <Typography variant="body1" color="error" sx={{ mb: 3 }}>
    {error}
  </Typography>
)}

{/* Affichage des paiements */}
<TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
  <Table>
    <TableHead sx={{ backgroundColor: '#1976d2' }}>
      <TableRow>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Montant</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description de la Taxe</TableCell>
        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Collecteur</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {payments.length > 0 ? (
        payments.map((payment, index) => (
          <TableRow
            key={payment._id}
            sx={{
              backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff', // Couleur alternée des lignes
              '&:hover': { backgroundColor: '#e3f2fd' }, // Couleur au survol
            }}
          >
            <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
            <TableCell>{payment.amount.toLocaleString()} FCFA</TableCell>
            <TableCell>{payment.tax?.name || 'Non spécifiée'}</TableCell>
            <TableCell>{payment.collector?.name || 'Non spécifié'}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} align="center" sx={{ fontStyle: 'italic', color: 'gray' }}>
            Aucun paiement trouvé.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>




















      {/* Actions Rapides */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        Actions Rapides
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              boxShadow: 3,
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#1976d2',
                mx: 'auto',
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <MonetizationOnIcon />
            </Avatar>
            <Typography variant="h6">Payer Maintenant</Typography>
            <Button variant="contained" color="primary" fullWidth>
              Payer
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              boxShadow: 3,
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#4caf50',
                mx: 'auto',
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <ReceiptIcon />
            </Avatar>
            <Typography variant="h6">Télécharger un Reçu</Typography>
            <Button variant="contained" color="success" fullWidth>
              Télécharger
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaxpayerDashboard;
