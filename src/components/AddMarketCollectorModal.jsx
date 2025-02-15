import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';
import axios from 'axios';


const AddMarketCollectorModal = ({ open, onClose, refreshMarkets }) => {
  const [marketName, setMarketName] = useState('');
  const [marketLocation, setMarketLocation] = useState('');
  const [collector, setCollector] = useState('');
  const [collectors, setCollectors] = useState([]);
  const [loadingCollectors, setLoadingCollectors] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  useEffect(() => {
    if (open) {
      // Charger la liste des collecteurs au moment de l'ouverture du modal
      const fetchCollectors = async () => {
        try {
          setLoadingCollectors(true);
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/api/markets/collectorss`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('✅ Collecteurs récupérés :', response.data); // Log pour vérifier les données
          setCollectors(response.data);
        } catch (err) {
          console.error('❌ Erreur lors de la récupération des collecteurs :', err.message);
        } finally {
          setLoadingCollectors(false);
        }
      };
  
      fetchCollectors();
    }
  }, [open]);
  

  const handleSubmit = async () => {
    if (!marketName || !collector) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Non autorisé. Connectez-vous d’abord.');
        return;
      }
  
      const response = await axios.post(
        `${API_URL}/api/markets`,
        {
          name: marketName,
          location: marketLocation,
          collector,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        alert('Marché créé avec succès !');
        refreshMarkets(); // Recharger les marchés
        onClose();
        setMarketName('');
        setMarketLocation('');
        setCollector('');
      }
    } catch (error) {
      console.error('Erreur lors de la création du marché :', error.message);
      alert('Une erreur est survenue lors de la création du marché.');
    }
  };
  
  


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Créer un Marché
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nom du Marché"
              variant="outlined"
              value={marketName}
              onChange={(e) => setMarketName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Localisation"
              variant="outlined"
              value={marketLocation}
              onChange={(e) => setMarketLocation(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
          <TextField
  fullWidth
  select
  label="Sélectionner un Collecteur"
  variant="outlined"
  value={collector}
  onChange={(e) => setCollector(e.target.value)}
  disabled={loadingCollectors}
>
  {loadingCollectors ? (
    <MenuItem disabled>Chargement...</MenuItem>
  ) : collectors.length > 0 ? (
    collectors.map((c) => (
      <MenuItem key={c._id} value={c._id}>
        {c.name} ({c.phone})
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>Aucun collecteur disponible</MenuItem>
  )}
</TextField>

          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Ajouter un Marché
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddMarketCollectorModal;
