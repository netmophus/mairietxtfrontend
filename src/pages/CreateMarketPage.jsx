import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMarketPage = () => {
  const [markets, setMarkets] = useState([]); // Liste des marchés créés
  const [collectors, setCollectors] = useState([]); // Liste des collecteurs disponibles
  const [isModalOpen, setIsModalOpen] = useState(false); // Contrôle de l'ouverture du modal

  // États pour le formulaire de création
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCollector, setSelectedCollector] = useState('');

  // Gestion de l'ouverture et de la fermeture du modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [isLoading, setIsLoading] = useState(false); // Gestion du chargement
const navigate = useNavigate();

const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  // Fonction pour récupérer la liste des collecteurs depuis l'API
  const fetchCollectors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Non autorisé. Connectez-vous d’abord.');
        return;
      }
  
      const response = await axios.get(`${API_URL}/api/collectors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 && Array.isArray(response.data)) {
        setCollectors(response.data); // Mets à jour l'état des collecteurs
        console.log('✅ Collecteurs récupérés :', response.data);
      } else {
        console.error('❌ Les données récupérées ne sont pas valides :', response.data);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des collecteurs :', error.message);
      alert('Impossible de récupérer les collecteurs.');
    }
  };




  const fetchMarkets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Non autorisé. Connectez-vous d’abord.');
        return;
      }
  
      const response = await axios.get(`${API_URL}/api/markets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log('Données des marchés :', response.data); // Inspectez les données ici
        setMarkets(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des marchés :', error.message);
      alert('Impossible de récupérer les marchés.');
    }
  };

  useEffect(() => {
    fetchMarkets();
    fetchCollectors(); // Récupérer les collecteurs lors du chargement de la page
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/markets`,
        { name, location, collector: selectedCollector },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert('Marché créé avec succès !');
      setName('');
      setLocation('');
      setSelectedCollector('');
      handleCloseModal(); // Ferme le modal après la création
  
      // Recharge les marchés depuis l'API
      fetchMarkets();
    } catch (error) {
      console.error('Erreur lors de la création du marché :', error.message);
      alert('Erreur lors de la création du marché.');
    }
  };
  
  


  const handleChange = (e) => {
    console.log('🔹 Collecteur sélectionné :', e.target.value);
    setSelectedCollector(e.target.value);
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
        p: 4,
      }}
    >
      {/* Titre de la page */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Gestion des Marchés
      </Typography>

      {/* Sous-titre */}
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: '800px' }}>
        Créez et gérez les marchés associés à vos collecteurs. Vous pouvez ajouter de nouveaux
        marchés et les afficher dans la zone ci-dessous.
      </Typography>

      {/* Bouton pour ouvrir le modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mb: 4 }}
      >
        Ajouter un Marché
      </Button>

        <Button
                variant="contained"
                color="primary"
                sx={{
                  mb: 3,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#6c757d', // Gris moderne
                  '&:hover': { backgroundColor: '#5a6268' },
                  ml: 2, // Marge à gauche pour l'espacement
                }}
                onClick={() => navigate("/admin/recus")}
              >
                Retour Gestion reçu
              </Button>

      {/* Liste des marchés créés */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '800px',
          p: 4,
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Marchés Créés
        </Typography>
        {markets.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom du Marché</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Localisation</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Collecteur (ID)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markets.map((market, index) => (
                  <TableRow key={index}>
                    <TableCell>{market.name}</TableCell>
                    <TableCell>{market.location}</TableCell>
                    <TableCell>{market.collector.name}</TableCell>
                    <TableCell>{market.collector ? market.collector.name : 'Aucun collecteur assigné'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Aucun marché n'a été créé pour le moment.
          </Typography>
        )}
      </Paper>

      {/* Modal de création */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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
          <Typography id="modal-title" variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Créer un Nouveau Marché
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom du Marché"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Localisation"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

<FormControl fullWidth margin="normal" required>
  <InputLabel id="collector-select-label">Collecteur</InputLabel>
  <Select
    labelId="collector-select-label"
    value={selectedCollector}
    onChange={handleChange} // Utilisez handleChange qui était déjà défini
    label="Collecteur"
  >
    {collectors.length > 0 ? (
      collectors.map((collector) => (
        <MenuItem key={collector._id} value={collector._id}>
          {collector.user ? collector.user.name : "Nom non disponible"}
        </MenuItem>
      ))
    ) : (
      <MenuItem disabled>Aucun collecteur disponible</MenuItem>
    )}
  </Select>
</FormControl>






            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isLoading} // Désactive le bouton pendant le chargement
            >
            {isLoading ? 'Chargement...' : 'Enregistrer'} 
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateMarketPage;
