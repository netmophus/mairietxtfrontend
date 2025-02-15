import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Paper, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText,Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';

import DescriptionIcon from '@mui/icons-material/Description';

function CollectorDashboard() {

  const [totalCollected, setTotalCollected] = useState(0); // État pour le total collecté

 
  const [totalTaxes, setTotalTaxes] = useState(0); // Taxes créées
  const [activeTaxpayers, setActiveTaxpayers] = useState(0); // Contribuables actifs

  const [recentPayments, setRecentPayments] = useState([]); // Paiements récents

  const [overduePayments, setOverduePayments] = useState([]); // Paiements en retard

  const [showOverduePayments, setShowOverduePayments] = useState(false); // État pour afficher ou masquer la liste

  const [activeReceipts, setActiveReceipts] = useState([]); // État pour stocker les reçus activés

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const [selectedMarket, setSelectedMarket] = useState(""); // État pour suivre le marché sélectionné
const [markets, setMarkets] = useState([]); // Liste des marchés associés au collecteur


 // Fonction pour récupérer le total collecté
 const fetchTotalCollected = async () => {
  try {
    const response = await fetch(`${API_URL}/api/collector-dashboard/total-collected`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Token du collecteur connecté
      },
    });
    
   
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du total collecté.');
    }
    const data = await response.json();
    setTotalCollected(data.totalCollected); // Met à jour l'état avec le montant récupéré
  } catch (err) {
    console.error('Erreur:', err.message);
  }
};


// Fonction pour récupérer le nombre de taxes créées
const fetchTaxesCreated = async () => {
  try {
    const response = await fetch(`${API_URL}/api/collector-dashboard/taxes-created`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des taxes créées.');
    const data = await response.json();
    setTotalTaxes(data.totalTaxes);
  } catch (err) {
    console.error('Erreur :', err.message);
  }
};

// Fonction pour récupérer le nombre de contribuables actifs
 // Fonction pour récupérer le nombre de contribuables actifs attribués au collecteur
 const fetchActiveTaxpayers = async () => {
  try {
    const response = await fetch(`${API_URL}/api/collector-dashboard/active-taxpayers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des contribuables actifs.');
    const data = await response.json();
    setActiveTaxpayers(data.activeTaxpayers);
  } catch (err) {
    console.error('Erreur :', err.message);
  }
};


 // Fonction pour récupérer les paiements récents
 const fetchRecentPayments = async () => {
  try {
    const response = await fetch(`${API_URL}/api/collector-dashboard/recent-payments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des paiements récents.');
    const data = await response.json();
    setRecentPayments(data.recentPayments);
  } catch (err) {
    console.error('Erreur :', err.message);
  }
};


// Fonction pour récupérer les paiements en retard
const fetchOverduePayments = async () => {
  try {
    const response = await fetch(`${API_URL}/api/collector-dashboard/overdue-payments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Erreur lors de la récupération des paiements en retard.');
    const data = await response.json();
    setOverduePayments(data.overduePayments);
  } catch (err) {
    console.error('Erreur :', err.message);
  }
};


  // Charger les données au montage du composant
  useEffect(() => {
    fetchTotalCollected();
    fetchTaxesCreated();
    fetchActiveTaxpayers();
    fetchRecentPayments();
    fetchOverduePayments();
  }, []);



  const fetchActiveReceipts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/collector-dashboard/active-receipts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      if (!response.ok) throw new Error('Erreur lors de la récupération des reçus activés.');
  
      const data = await response.json();
      setActiveReceipts(data.activeReceipts); // Mettre à jour l'état avec les reçus activés
    } catch (err) {
      console.error("Erreur :", err.message);
    }
  };
  
  // Charger les reçus activés au montage du composant
  useEffect(() => {
    fetchActiveReceipts();
  }, []);


  const fetchMarkets = async () => {
    console.log("📥 Début de la récupération des marchés pour le collecteur connecté...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Aucun token trouvé. L'utilisateur n'est pas authentifié.");
        alert("Non autorisé. Veuillez vous connecter.");
        return;
      }
  
      console.log("🔑 Token trouvé :", token);
  
      // Appel à la route GET /api/markets/collector-markets
      const response = await fetch(`${API_URL}/api/markets/collector-markets`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token d'autorisation
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des marchés : ${response.status} ${response.statusText}`);
      }
  
      const allMarkets = await response.json();
  
      // Vérifiez quels marchés ont des reçus activés
      const marketsWithActiveReceipts = [];
      for (const market of allMarkets) {
        const receiptResponse = await fetch(
          `${API_URL}/api/receipt-batches/${market._id}/activated`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const receiptData = await receiptResponse.json();
        if (receiptData.receipts && receiptData.receipts.length > 0) {
          marketsWithActiveReceipts.push(market);
        }
      }
  
      console.log("✅ Marchés avec reçus activés :", marketsWithActiveReceipts);
      setMarkets(marketsWithActiveReceipts);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des marchés :", err.message);
    }
  };
  
  
  
  
  
  useEffect(() => {
    fetchMarkets();
  }, []);
  


  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' , mt:18,}}>
      {/* Titre principal */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tableau de Bord Collecteur
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Bienvenue, voici un aperçu de vos tâches et données.
      </Typography>

      {/* Section des statistiques personnelles */}
      <Grid container spacing={3}>
    
        {/* Total collecté */}
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
              <Typography variant="h6">Total Collecté</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalCollected.toLocaleString()} FCFA
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
      <Typography variant="h6">Paiements Récents</Typography>
      <Typography variant="h4" fontWeight="bold">
        {recentPayments.length} {/* Nombre de paiements récents */}
      </Typography>
    </Box>
    <Avatar sx={{ bgcolor: 'white', color: '#4caf50' }}>
      <PeopleIcon />
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
      cursor: 'pointer', // Rend la carte cliquable
    }}
    onClick={() => setShowOverduePayments(true)} // Ouvre la liste des paiements en retard
  >
    <Box>
      <Typography variant="h6">Retards de Paiement</Typography>
      <Typography variant="h4" fontWeight="bold">
        {overduePayments.length}
      </Typography>
    </Box>
    <Avatar sx={{ bgcolor: 'white', color: '#ff9800' }}>
      <NotificationsActiveIcon />
    </Avatar>
  </Paper>
</Grid>




{/* Taxes Créées */}
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
              <Typography variant="h6">Taxes Créées</Typography>
              <Typography variant="h4" fontWeight="bold">
                {totalTaxes}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', color: '#4caf50' }}>
              <DescriptionIcon />
            </Avatar>
          </Paper>
        </Grid>

        {/* Contribuables Actifs */}
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
              <Typography variant="h6">Contribuables Actifs</Typography>
              <Typography variant="h4" fontWeight="bold">
                {activeTaxpayers}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: 'white', color: '#ff9800' }}>
              <PeopleIcon />
            </Avatar>
          </Paper>
        </Grid>

{/* Reçu pour collecteur */}
<Grid item xs={12} md={4}>
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Typography variant="h6" fontWeight="bold">
      Taxe du Marché
    </Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
      Sélectionnez un marché pour gérer les paiements.
    </Typography>

   

<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel>Marché</InputLabel>
  <Select
    value={selectedMarket} // État pour suivre la sélection du marché
    onChange={(e) => setSelectedMarket(e.target.value)} // Mettre à jour l'état
  >
    {markets.map((market) => (
      <MenuItem key={market._id} value={market._id}>
        {market.name} - {market.location}
      </MenuItem>
    ))}
  </Select>
</FormControl>

{markets.length === 0 && (
  <Typography variant="body2" color="error" sx={{ mt: 2 }}>
    Aucun marché avec des reçus activés n'est disponible.
  </Typography>
)}


    {/* Bouton pour valider */}
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => {
        if (!selectedMarket) {
          alert("Veuillez sélectionner un marché.");
          return;
        }
        navigate(`/collector/taxemarket/${selectedMarket}`);
      }}
    >
      Ouvrir la page
    </Button>
  </Paper>
</Grid>





      </Grid>

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
            <Typography variant="h6">Enregistrer un Paiement</Typography>
            <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => navigate('/collector/payments')}
    >
      Enregistrer
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
              <NotificationsActiveIcon />
            </Avatar>
            <Typography variant="h6">Notifier les Contribuables</Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => console.log('Notifier les contribuables')}
            >
              Notifier
            </Button>
          </Paper>
        </Grid>

        {/* Nouvelle carte : Créer un Contribuable */}
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
          bgcolor: '#ff9800',
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <PeopleIcon />
      </Avatar>
      <Typography variant="h6">Créer un Contribuable</Typography>
      <Button
        variant="contained"
        color="warning"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate('/collector/taxpayers')}
      >
        Créer
      </Button>
    </Paper>
  </Grid>


{/* Nouvelle carte : Associer contribuable à taxes */}

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
        bgcolor: '#3f51b5',
        mx: 'auto',
        width: 60,
        height: 60,
        mb: 2,
      }}
    >
      <MonetizationOnIcon />
    </Avatar>
    <Typography variant="h6">Associer des Taxes</Typography>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => navigate('/collector/associate-taxes')}
    >
      Associer
    </Button>
  </Paper>
</Grid>


      </Grid>

      {showOverduePayments && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
      Liste des Paiements en Retard
    </Typography>
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <List>
        {overduePayments.length > 0 ? (
          overduePayments.map((payment, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#ff9800' }}>
                  <NotificationsActiveIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Contribuable : ${payment.taxpayerName}`}
                secondary={`Taxe : ${payment.taxName} | Montant dû : ${payment.amountDue} FCFA | Date d'échéance : ${new Date(payment.dueDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
            Aucun paiement en retard.
          </Typography>
        )}
      </List>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={() => setShowOverduePayments(false)}>
          Fermer
        </Button>
      </Box>
    </Paper>
  </Box>
)}
    </Box>
  );
}

export default CollectorDashboard;
