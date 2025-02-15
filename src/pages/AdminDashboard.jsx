import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Card,
 
  Avatar,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PieChartIcon from '@mui/icons-material/PieChart';

import AjouterContribuableCard from '../components/AjouterContribuableCard'; // Import du composant
import SuivrePaiementsCard from '../components/SuivrePaiementsCard';
import GestionZoneCard from '../components/GestionZoneCard';
import GestionUtilisateurCard from '../components/GestionUtilisateurCard';

import GestionRecusCard from '../components/GestionRecusCard';


import { useNavigate } from 'react-router-dom';


function AdminDashboard() {

    const navigate = useNavigate();
    const [taxesCollected, setTaxesCollected] = useState(0);
    const [activeCollectors, setActiveCollectors] = useState(0);
    const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

 
    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          // Récupérer les taxes collectées
          const taxesResponse = await fetch(`${API_URL}/api/admin-dashboard/taxes-collected`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const taxesData = await taxesResponse.json();
          setTaxesCollected(taxesData.totalTaxesCollected || 0);
  
          // Récupérer le nombre de collecteurs actifs
          const collectorsResponse = await fetch(`${API_URL}/api/admin-dashboard/active-collectors`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const collectorsData = await collectorsResponse.json();
          setActiveCollectors(collectorsData.activeCollectors || 0);
        } catch (err) {
          console.error('Erreur lors de la récupération des données du tableau de bord :', err.message);
        }
      };
  
      fetchDashboardData();
    }, []);
  



  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh', mt:17, }}>
      {/* Titre principal */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Tableau de Bord Administrateur
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Bienvenue, voici un aperçu de vos données et actions disponibles.
      </Typography>

      {/* Section des statistiques principales */}
      <Grid container spacing={3}>
        {/* Statistiques des taxes */}
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
              <Typography variant="h6">Taxes Collectées</Typography>
              <Typography variant="h4" fontWeight="bold">{taxesCollected} FCFA</Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <MonetizationOnIcon fontSize="large" />
            </IconButton>
          </Paper>
        </Grid>

        {/* Statistiques des collecteurs */}
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
              <Typography variant="h6">Collecteurs Actifs</Typography>
              <Typography variant="h4" fontWeight="bold">{activeCollectors}</Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <PersonIcon fontSize="large" />
            </IconButton>
          </Paper>
        </Grid>

        {/* Statistiques des projets financés */}
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
              <Typography variant="h6">Projets Financés</Typography>
              <Typography variant="h4" fontWeight="bold">
                8
              </Typography>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <PieChartIcon fontSize="large" />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      {/* Actions principales */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        Actions Rapides
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                mx: 'auto',
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <AddCircleOutlineIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6">Gestion de Taxe</Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate('/admin/taxes')} // Navigue vers la page des taxes
            >
              Ajouter
            </Button>

          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'secondary.main',
                mx: 'auto',
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <BarChartIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6">Suivre les Collecteurs</Typography>
            <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/admin/collectors')} // Redirige vers la page de gestion des collecteurs
          >
            Gérer
          </Button>

          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'error.main',
                mx: 'auto',
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              <NotificationsIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6">Envoyer des Notifications</Typography>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
            >
              Envoyer
            </Button>
          </Card>
        </Grid>


          {/* Ajouter le composant ici */}
          <Grid item xs={12} md={4} sx={{ mb:4 }} >
          <AjouterContribuableCard />
        </Grid>

        
          {/* Nouvelle carte : Suivre les Paiements */}
          <Grid item xs={12} md={4} sx={{ mb:4 }}>
            <SuivrePaiementsCard />
          </Grid>


          {/* Carte Gestion des Zones */}
          <Grid item xs={12} md={4} sx={{ mb:4 }}>
              <GestionZoneCard />
            </Grid>

            {/* Carte Gestion des Utilisateurs */}
            <Grid item xs={12} md={4} sx={{ mb:4 }}>
              <GestionUtilisateurCard />
            </Grid>


{/* Carte Gestion des Reçus */}
<Grid item xs={12} md={4} sx={{ mb:4  }}>
  <GestionRecusCard />
</Grid>


      </Grid>
    </Box>
  );
}

export default AdminDashboard;
