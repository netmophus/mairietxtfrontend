import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import UserEditModal from '../components/UserEditModal'; // Assurez-vous que le chemin est correct
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null); // Utilisateur à modifier
  const [openModal, setOpenModal] = useState(false); // Contrôle de l'ouverture/fermeture du modal
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App



  const handleEditClick = (user) => {
    console.log('Utilisateur sélectionné pour modification:', user);
    setSelectedUser(user); // Charger les données de l'utilisateur sélectionné
    setOpenModal(true); // Ouvrir le modal
  };

  const handleUserUpdate = async (updatedUser) => {
    try {
      await fetch(`${API_URL}/api/auth/${updatedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedUser),
      });
      fetchUsers(); // Rafraîchir la liste après modification
      setOpenModal(false); // Fermer le modal
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', err);
    }
  };



  
  // Fonction pour récupérer les utilisateurs depuis le backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  // Fonction pour gérer la désactivation/activation
  const toggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await fetch(`${API_URL}/api/auth/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchUsers(); // Actualiser la liste après modification
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut', err);
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await fetch(`${API_URL}/api/auth/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchUsers(); // Actualiser la liste après suppression
      } catch (err) {
        console.error('Erreur lors de la suppression de l’utilisateur', err);
      }
    }
  };

  if (loading) {
    return <Typography>Chargement en cours...</Typography>;
  }

  const handleResetPassword = async (user) => {
    if (window.confirm(`Êtes-vous sûr de vouloir réinitialiser le mot de passe pour ${user.name} ?`)) {
      try {
        const response = await fetch(`${API_URL}/api/users/${user._id}/reset-password`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de la réinitialisation du mot de passe.');
        }
  
        const data = await response.json();
        alert(data.message); // Affiche un message de succès
      } catch (err) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', err);
        alert('Échec de la réinitialisation du mot de passe.');
      }
    }
  };
  


  const handleAddUser = () => {
    navigate('/register'); // Redirige vers la page d'enregistrement
  };
  





  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh', mt:17, }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestion des Utilisateurs
      </Typography>
      <Button
  variant="contained"
  color="primary"
  sx={{ mb: 2 }}
  onClick={handleAddUser} // Redirige vers la page d'enregistrement
>
  Ajouter un Utilisateur
</Button>

<TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflow: 'auto' }}>
        <Table>
      
<TableHead>
  <TableRow>
    {['Nom', 'Numéro de Téléphone', 'Email', 'Rôle', 'Statut', 'Actions'].map((header) => (
      <TableCell
        key={header}
        sx={{
          backgroundColor: '#008751', // Vert drapeau du Niger
          color: 'white', // Texte blanc
          fontWeight: 'bold',
          textAlign: 'center',
          borderBottom: '2px solid #e0e0e0',
        }}
      >
        {header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>

<TableBody>
  {users.map((user, index) => (
    <TableRow
      key={user._id}
      sx={{
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff', // Lignes alternées
        '&:hover': {
          backgroundColor: '#f1f8e9', // Fond vert clair au survol
        },
      }}
    >
      <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
        {user.name}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
        {user.phone}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
        {user.email || 'N/A'}
      </TableCell>
      <TableCell sx={{ textAlign: 'center', padding: '12px' }}>
        {user.role}
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: user.status === 'active' ? '#28a745' : '#dc3545', // Vert actif, rouge inactif
          padding: '12px',
        }}
      >
        {user.status}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: '#f0f4f8', // Fond clair spécifique pour les actions
          borderRadius: '8px', // Coins arrondis
          display: 'flex',
          justifyContent: 'space-around', // Espacement uniforme entre les icônes
          alignItems: 'center',
          p: 1, // Padding interne
        }}
      >
        <IconButton
          sx={{
            color: '#007BFF',
            '&:hover': {
              color: '#0056b3',
              transform: 'scale(1.1)', // Animation au survol
            },
          }}
          onClick={() => handleEditClick(user)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          sx={{
            color: user.status === 'active' ? '#28a745' : '#6c757d',
            '&:hover': {
              color: user.status === 'active' ? '#218838' : '#5a6268',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => toggleStatus(user._id, user.status)}
        >
          {user.status === 'active' ? <ToggleOffIcon /> : <ToggleOnIcon />}
        </IconButton>
        <IconButton
          sx={{
            color: '#dc3545',
            '&:hover': {
              color: '#c82333',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => deleteUser(user._id)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          sx={{
            color: '#ffc107',
            '&:hover': {
              color: '#e0a800',
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => handleResetPassword(user)}
        >
          <LockResetIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>


      <UserEditModal
        open={openModal} // Contrôle de l'ouverture/fermeture
        user={selectedUser} // Utilisateur sélectionné
        onClose={() => setOpenModal(false)} // Fermer le modal
        onSave={handleUserUpdate} // Callback pour sauvegarder les modifications
        />
    </Box>
  );
}

export default UserManagementPage;
