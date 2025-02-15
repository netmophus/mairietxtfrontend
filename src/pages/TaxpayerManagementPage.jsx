import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaxpayerModal from '../components/AddTaxpayerModal';
import { useNavigate } from 'react-router-dom';


function TaxpayerManagementPage() {
  const [taxpayers, setTaxpayers] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [zones, setZones] = useState([]); // Initialisez zones
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


  const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


  // Charger les contribuables depuis le backend

  const fetchTaxpayers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token manquant.');
        return;
      }
  
      console.log('Token envoyé :', token);
  
      const response = await fetch(`${API_URL}/api/taxpayers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des contribuables.');
      }
  
      const data = await response.json();
      setTaxpayers(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  


  
  const handleAddTaxpayer = async (taxpayerData) => {
    try {
      console.log('Données envoyées au backend :', taxpayerData); // Debug
  
      const response = await fetch(`${API_URL}/api/taxpayers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taxpayerData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l’ajout du contribuable.');
      }
  
      alert('Contribuable ajouté avec succès.');
      fetchTaxpayers(); // Rafraîchir la liste des contribuables
    } catch (err) {
      alert(err.message);
    }
  };
  
  
  const handleDeleteTaxpayer = async (taxpayerId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce contribuable ?')) {
      try {
        const response = await fetch(`${API_URL}/api/taxpayers/${taxpayerId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du contribuable.');
        }

        fetchTaxpayers();
        alert('Contribuable supprimé avec succès.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchTaxpayers(); // Charger les contribuables au montage du composant
  }, []);



const fetchZones = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token manquant.');
        return;
      }
  
      const response = await fetch(`${API_URL}/api/zones`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des zones.');
      }
  
      const data = await response.json();
      console.log('Zones associées récupérées :', data);
      setZones(data); // Mettre à jour uniquement les zones associées
    } catch (err) {
      console.error('Erreur :', err.message);
    }
  };
  
  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <Box sx={{ p: 3, mt:20, }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Contribuables
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpenAddModal(true)}
      >
        Ajouter un Contribuable
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nom</strong></TableCell>
              <TableCell><strong>Téléphone</strong></TableCell>
              <TableCell><strong>Adresse</strong></TableCell>
              <TableCell><strong>Zone</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
       
          <TableBody>
  {Array.isArray(taxpayers) && taxpayers.length > 0 ? (
    taxpayers
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((taxpayer) => (
        <TableRow key={taxpayer._id}>
          {/* Nom du contribuable */}
          <TableCell>{taxpayer.user?.name || 'N/A'}</TableCell>

          {/* Téléphone */}
          <TableCell>{taxpayer.user?.phone || 'N/A'}</TableCell>

          {/* Adresse */}
          <TableCell>{taxpayer.address}</TableCell>

          {/* Zone */}
          <TableCell>{taxpayer.zone?.name || 'N/A'}</TableCell>

          {/* Actions */}
          <TableCell
            sx={{
              backgroundColor: '#f0f4f8',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              p: 1,
            }}
          >
            <IconButton
              sx={{
                color: '#007BFF',
                '&:hover': {
                  color: '#0056b3',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => {
                // Supposons que vous définissez une logique pour modifier
                console.log('Modifier', taxpayer);
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              sx={{
                color: '#dc3545',
                '&:hover': {
                  color: '#c82333',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => handleDeleteTaxpayer(taxpayer._id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        Aucun contribuable trouvé.
      </TableCell>
    </TableRow>
  )}
</TableBody>





        </Table>


        <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={taxpayers.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>

      </TableContainer>

      {/* Modal pour Ajouter/Modifier un Contribuable */}
      <AddTaxpayerModal
  open={openAddModal}
  onClose={() => setOpenAddModal(false)}
  onSave={handleAddTaxpayer}
  zones={zones} // Passez les zones récupérées ici
/>

    </Box>
  );
}

export default TaxpayerManagementPage;
