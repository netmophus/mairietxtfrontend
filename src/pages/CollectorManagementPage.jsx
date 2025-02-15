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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MapIcon from '@mui/icons-material/Map';
import AddCollectorModal from '../components/AddCollectorModal';
import AssignZoneModal from '../components/AssignZoneModal';
import { useNavigate } from 'react-router-dom';



function CollectorManagementPage() {
  const [collectors, setCollectors] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openAssignZoneModal, setOpenAssignZoneModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();


const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

 // Déclaration de l'état formData
 const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  idDocument: '',
  address: '',
  hireDate: new Date().toISOString().split('T')[0], // Valeur par défaut pour la date d'embauche
  assignedZones: [],
});


 // Fonction pour réinitialiser le formulaire
 const resetForm = () => {
  setFormData({
    name: '',
    phone: '',
    email: '',
    idDocument: '',
    address: '',
    hireDate: new Date().toISOString().split('T')[0], // Valeur par défaut pour la date
    assignedZones: [],
  });
};



 
  // Charger les collecteurs depuis le backend
  const fetchCollectors = async () => {
    try {
      const response = await fetch(`${API_URL}/api/collectors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des collecteurs.');
      }
  
      const data = await response.json();
      console.log('Réponse de l’API collectors :', data); // Log des données
      setCollectors(data); // Stocke les collecteurs dans l’état
    } catch (err) {
      console.error('Erreur lors de la récupération des collecteurs :', err.message);
      setCollectors([]); // Définit un tableau vide en cas d’erreur
    }
  };

  

  const handleUpdateCollector = async (collectorData) => {
    try {
      const response = await fetch(`${API_URL}/api/collectors/collectors/${selectedCollector._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(collectorData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du collecteur.');
      }
  
      fetchCollectors(); // Recharge les collecteurs après mise à jour
      alert('Collecteur mis à jour avec succès.');
      setOpenAddModal(false); // Ferme le modal
    } catch (err) {
      alert(err.message);
    }
  };



  
  
  


  const handleAddCollector = async (collectorData) => {
    try {
      const response = await fetch(`${API_URL}/api/collectors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(collectorData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout du collecteur.');
      }
  
      fetchCollectors(); // Recharge les collecteurs après ajout
      alert('Collecteur ajouté avec succès.');
      setOpenAddModal(false); // Ferme le modal
      resetForm(); // Réinitialise les champs du formulaire
    } catch (err) {
      alert(err.message);
    }
  };
  

  const handleDeleteCollector = async (collectorId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce collecteur ?')) {
      try {
        const response = await fetch(`${API_URL}/api/collectors/${collectorId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du collecteur.');
        }

        fetchCollectors();
        alert('Collecteur supprimé avec succès.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    fetchCollectors();
  }, []);



  const fetchZones = async () => {
    try {
      const response = await fetch(`${API_URL}/api/zones`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des zones.');
      }
  
      setZones(data);
    } catch (err) {
      console.error('Erreur :', err.message);
    }
  };
  
  useEffect(() => {
    fetchZones(); // Récupère les zones lors du chargement de la page
  }, []);


  const handleSubmit = (collectorData) => {
    if (selectedCollector) {
      handleUpdateCollector(collectorData); // Met à jour si le collecteur existe
    } else {
      handleAddCollector(collectorData); // Ajoute un nouveau collecteur
    }
  };
  

  
  return (
    <Box sx={{ p: 3 , mt:18}}>
     <Typography
  variant="h4"
  gutterBottom
  sx={{
    backgroundColor: '#f7f9fc', // Fond clair
    padding: 2, // Espacement interne
    textAlign: 'center', // Centrage du texte
    fontWeight: 'bold', // Texte en gras
    color: '#2c3e50', // Couleur du texte
    borderRadius: '8px', // Coins arrondis
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
  }}
>
  Gestion des Collecteurs
</Typography>

<Button
  variant="contained"
  color="primary"
  startIcon={<AddCircleOutlineIcon />}
  sx={{
    mb: 2,
    textTransform: 'none', // Désactive les majuscules
    borderRadius: '8px', // Coins arrondis
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Ombre subtile
    '&:hover': {
      backgroundColor: '#1565c0', // Couleur au survol
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)', // Ombre accentuée au survol
    },
  }}
  onClick={() => setOpenAddModal(true)}
>
  Ajouter un Collecteur
</Button>


 {/* Retour au Dashboard Button */}
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
        Retour au dashboard
      </Button>

<TableContainer
  component={Paper}
  sx={{
    borderRadius: '16px', // Coins arrondis
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
    overflow: 'hidden', // Évite le débordement
  }}
>


        <Table>
        <TableHead
  sx={{
    backgroundColor: '#e3f2fd', // Fond bleu clair
  }}
>
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold', color: '#1565c0' }}>Nom</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: '#1565c0' }}>Téléphone</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: '#1565c0' }}>Email</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: '#1565c0' }}>Statut</TableCell>
    <TableCell sx={{ fontWeight: 'bold', color: '#1565c0' }}>Actions</TableCell>
  </TableRow>
</TableHead>

{/* <TableBody>
  {collectors.length > 0 ? (
    collectors.map((collector, index) => (
      <TableRow
        key={collector._id}
        sx={{
          backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternance des couleurs
          '&:hover': {
            backgroundColor: '#f1f8e9', // Couleur au survol
          },
        }}
      >
        <TableCell>{collector.user?.name || 'N/A'}</TableCell>
        <TableCell>{collector.user?.phone || 'N/A'}</TableCell>
        <TableCell>{collector.user?.email || 'N/A'}</TableCell>
        <TableCell>
          {collector.assignedZones && collector.assignedZones.length > 0
            ? collector.assignedZones.map((zone) => zone.name).join(', ')
            : 'Aucune zone assignée'}
        </TableCell>
        <TableCell
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedCollector(collector);
              setOpenAddModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteCollector(collector._id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setSelectedCollector(collector);
              setOpenAssignZoneModal(true);
            }}
          >
            <MapIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        Aucun collecteur disponible.
      </TableCell>
    </TableRow>
  )}
</TableBody> */}

<TableBody>
  {collectors.length > 0 ? (
    collectors
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((collector, index) => (
        <TableRow
          key={collector._id}
          sx={{
            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Alternance des couleurs
            '&:hover': {
              backgroundColor: '#f1f8e9', // Couleur au survol
            },
          }}
        >
          <TableCell>{collector.user?.name || 'N/A'}</TableCell>
          <TableCell>{collector.user?.phone || 'N/A'}</TableCell>
          <TableCell>{collector.user?.email || 'N/A'}</TableCell>
          <TableCell>
            {collector.assignedZones && collector.assignedZones.length > 0
              ? collector.assignedZones.map((zone) => zone.name).join(', ')
              : 'Aucune zone assignée'}
          </TableCell>
          <TableCell
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedCollector(collector);
                setOpenAddModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteCollector(collector._id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => {
                setSelectedCollector(collector);
                setOpenAssignZoneModal(true);
              }}
            >
              <MapIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        Aucun collecteur disponible.
      </TableCell>
    </TableRow>
  )}
</TableBody>


        </Table>


        <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={collectors.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
      </TableContainer>



      {/* Modal pour Ajouter/Modifier un Collecteur */}
     
{/* <AddCollectorModal
  open={openAddModal}
  collector={selectedCollector} // null pour un ajout
  onClose={() => setOpenAddModal(false)} // Ferme le modal
  onSave={handleAddCollector} // Fonction pour enregistrer le collecteur
  zones={zones} // Liste des zones disponibles
/> */}


{/* <AddCollectorModal
  open={openAddModal}
  collector={selectedCollector}
  onClose={() => setOpenAddModal(false)}
  onSave={handleSubmit} // La fonction qui gère à la fois l'ajout et la mise à jour
  zones={zones}
/> */}


<AddCollectorModal
  open={openAddModal}
  collector={selectedCollector}
  onClose={() => setOpenAddModal(false)}
  onSave={handleSubmit} // La fonction qui gère à la fois l'ajout et la mise à jour
  zones={zones}
/>



      {/* Modal pour Associer une Zone */}
      <AssignZoneModal
        open={openAssignZoneModal}
        collector={selectedCollector}
        onClose={() => setOpenAssignZoneModal(false)}
        onSave={fetchCollectors}
      />
    </Box>
  );
}

export default CollectorManagementPage;


