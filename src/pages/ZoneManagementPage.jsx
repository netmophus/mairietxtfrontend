import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddZoneModal from '../components/AddZoneModal'; // Modal pour ajouter/modifier une zone
import { useNavigate } from 'react-router-dom';



function ZoneManagementPage() {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [openModal, setOpenModal] = useState(false);
const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const fetchZones = async () => {
    const response = await fetch(`${API_URL}/api/zones`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setZones(data);
  };



  const handleAddZone = async (zone) => {
    try {
      const response = await fetch(`${API_URL}/api/zones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(zone),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout de la zone.');
      }
      fetchZones(); // Recharge les zones
      alert('Zone ajoutée avec succès.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditZone = async (zone) => {
    try {
      const response = await fetch(`${API_URL}/api/zones/${zone._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(zone),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la modification de la zone.');
      }
      fetchZones(); // Recharge les zones
      alert('Zone modifiée avec succès.');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteZone = async (zoneId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette zone ?')) {
      try {
        const response = await fetch(`${API_URL}/api/zones/${zoneId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la zone.');
        }
        fetchZones(); // Recharge les zones
        alert('Zone supprimée avec succès.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <Box
    sx={{
      p: 3,
      mt: 17,
      backgroundColor: '#f7f9fc', // Fond clair
      borderRadius: '12px', // Coins arrondis
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
      minHeight: '100vh',
    }}
  >
   
   <Typography
    variant="h4"
    gutterBottom
    sx={{
      fontWeight: 'bold',
      color: '#2c3e50', // Couleur pour le titre
      mb: 4, // Espacement en bas du titre
      textAlign: 'center', // Centrage du titre
    }}
  >
    Gestion des Zones
  </Typography>
  <Button
    variant="contained"
    color="primary"
    sx={{
      mb: 4, // Espacement en bas du bouton
      display: 'block',
      mx: 'auto', // Centrer le bouton
      borderRadius: '8px', // Coins arrondis
      textTransform: 'uppercase', // Texte en majuscules
    }}
    onClick={() => {
      setSelectedZone(null);
      setOpenModal(true);
    }}
  >
    Ajouter une Zone
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
          onClick={() => navigate("/admin-dashboard")}
        >
          Retour au Dashboard
        </Button>

      <AddZoneModal
        open={openModal}
        zone={selectedZone}
        onClose={() => setOpenModal(false)}
        onSave={selectedZone ? handleEditZone : handleAddZone}
      />
    <TableContainer
  component={Paper}
  sx={{
    borderRadius: '12px', // Coins arrondis pour le tableau
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
    overflow: 'hidden', // Supprime les débordements
  }}
>
  <Table>
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: '#2c3e50', // Fond foncé pour l'en-tête
        }}
      >
        <TableCell
          sx={{
            color: '#fff', // Texte blanc
            fontWeight: 'bold',
            textAlign: 'center', // Texte centré
          }}
        >
          Nom
        </TableCell>
        <TableCell
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Description
        </TableCell>
        <TableCell
          sx={{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {zones.map((zone, index) => (
        <TableRow
          key={zone._id}
          sx={{
            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Alternance des couleurs
            '&:hover': {
              backgroundColor: '#f1f1f1', // Couleur au survol
            },
          }}
        >
          <TableCell sx={{ textAlign: 'center' }}>{zone.name}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{zone.description}</TableCell>
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1, // Espacement entre les icônes
            }}
          >
            <IconButton
              sx={{
                color: '#007bff', // Couleur bleue
                '&:hover': {
                  color: '#0056b3',
                  transform: 'scale(1.1)', // Animation au survol
                },
              }}
              onClick={() => {
                setSelectedZone(zone);
                setOpenModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{
                color: '#dc3545', // Couleur rouge
                '&:hover': {
                  color: '#c82333',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => handleDeleteZone(zone._id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </Box>
  );
}

export default ZoneManagementPage;
