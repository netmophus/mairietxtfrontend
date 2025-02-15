
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
} from '@mui/material';
import AddTaxModal from '../components/AddTaxModal';
import EditTaxModal from '../components/EditTaxModal';
import EditIcon from '@mui/icons-material/Edit'; // Icône "Modifier"
import DeleteIcon from '@mui/icons-material/Delete'; // Icône "Supprimer"
import { useNavigate } from 'react-router-dom';

function TaxManagementPage() {
  const [taxes, setTaxes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false); // Modal pour ajouter
  const [openEditModal, setOpenEditModal] = useState(false); // Modal pour modifier
  const [selectedTax, setSelectedTax] = useState(null); // Taxe sélectionnée pour modification
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const fetchTaxes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/taxes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Envoi du token JWT
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des taxes.');
      }
  
      setTaxes(data); // Stocke les taxes si la requête réussit
    } catch (err) {
      console.error('Erreur lors de la récupération des taxes :', err.message);
    }
  };
  
  useEffect(() => {
    fetchTaxes();
  }, []);
  
  const handleAddTax = async (newTax) => {
    try {
      const response = await fetch(`${API_URL}/api/taxes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newTax),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l’ajout de la taxe.');
      }
      const data = await response.json();
      setTaxes((prev) => [...prev, data.tax]); // Mise à jour des taxes localement
    } catch (err) {
      alert(err.message);
    }
  };
  
  const handleEditClick = (tax) => {
    setSelectedTax(tax); // Charger la taxe sélectionnée dans l'état
    setOpenEditModal(true); // Ouvrir le modal pour modifier
  };
  
  const handleSaveTax = async (tax) => {
    console.log('Taxe à enregistrer :', tax); // Vérifiez si `tax` contient l'ID
    try {
      const response = await fetch(`${API_URL}/api/taxes/${tax._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(tax),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la taxe.');
      }
  
      alert('Taxe mise à jour avec succès.');
      fetchTaxes(); // Mettre à jour la liste des taxes après la modification
      setOpenEditModal(false); // Fermer le modal après la sauvegarde
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la taxe :', err.message);
    }
  };
  
  const handleDeleteClick = async (tax) => {
    if (tax.used) {
      alert('Cette taxe est utilisée et ne peut pas être supprimée.');
      return;
    }
  
    if (window.confirm(`Voulez-vous vraiment supprimer la taxe ${tax.name} ?`)) {
      try {
        const response = await fetch(`${API_URL}/api/taxes/${tax._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la taxe.');
        }
  
        alert('Taxe supprimée avec succès !');
        fetchTaxes(); // Rafraîchir la liste après suppression
      } catch (err) {
        alert(err.message);
      }
    }
  };
  
  return (
    <Box sx={{ p: 3, mt:18 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1976d2', // Couleur primaire
          mb: 3, // Marge inférieure
        }}
      >
        Gestion des Taxes
      </Typography>
  
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: '#28a745', // Vert moderne
          '&:hover': { backgroundColor: '#218838' },
        }}
        onClick={() => setOpenAddModal(true)} // Ouvrir le modal d'ajout
      >
        Ajouter une Taxe
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
  
      <AddTaxModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)} // Fermer le modal
        onSave={handleAddTax} // Passe la fonction de création de taxe
      />
  
  <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
  <Table>
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: '#1976d2',
          '& th': {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      >
        <TableCell>Nom</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Tarif</TableCell>
        <TableCell>Fréquence</TableCell>
        <TableCell>Date d’échéance</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {taxes.length > 0 ? (
        taxes.map((tax, index) => (
          <TableRow
            key={tax._id}
            sx={{
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
              '& td': {
                textAlign: 'center',
              },
            }}
          >
            <TableCell>{tax.name}</TableCell>
            <TableCell>{tax.description}</TableCell>
            {/* <TableCell>
              {tax.isVariable && tax.supportRates
                ? `${tax.supportRates.default} FCFA/m²`
                : `${tax.amount} FCFA`}
            </TableCell> */}


<TableCell>
  {tax.isVariable ? (
    tax.name === "Taxe de publicité" ? (
      <Box>
        <Typography variant="body2">
          Option 1: {tax.supportRates.option1} FCFA/m²
        </Typography>
        <Typography variant="body2">
          Option 2: {tax.supportRates.option2} FCFA/m²
        </Typography>
        <Typography variant="body2">
          Option 3: {tax.supportRates.option3} FCFA/m²
        </Typography>
      </Box>
    ) : (
      // Pour la taxe d'occupation du domaine publique, on affiche le taux unique
      `${tax.supportRates.default} FCFA/m²`
    )
  ) : (
    `${tax.amount} FCFA`
  )}
</TableCell>





            <TableCell>{tax.frequency === 'monthly' ? 'Mensuel' : 'Annuel'}</TableCell>
            <TableCell>{new Date(tax.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleEditClick(tax)}
                sx={{ color: '#1976d2' }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(tax)}
                sx={{ color: '#d32f2f' }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#999', py: 3 }}>
            Aucune taxe disponible pour le moment.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

  
      <EditTaxModal
        open={openEditModal} // Utiliser `openEditModal`
        tax={selectedTax} // Transmettre la taxe sélectionnée
        onClose={() => setOpenEditModal(false)} // Fermer le modal de modification
        onSave={handleSaveTax} // Sauvegarder la taxe modifiée
      />
  
    </Box>
  );
}
  
export default TaxManagementPage;
