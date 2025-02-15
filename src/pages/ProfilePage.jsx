
import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import AuthContext from '../context/AuthContext';
import ChangePasswordModal from '../components/ChangePasswordModal'; // Importer le modal

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


  const handleSavePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_URL}/api/users/me/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du mot de passe.');
      }

      alert('Mot de passe modifié avec succès !');
      setOpenModal(false); // Fermer le modal
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return <Typography>Chargement des données utilisateur...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Mon Profil
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Nom"
        value={user?.name || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={user?.email || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Téléphone"
        value={user?.phone || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Rôle"
        value={user?.role || ''}
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => setOpenModal(true)} // Ouvrir le modal
      >
        Modifier le Mot de Passe
      </Button>
      <ChangePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)} // Fermer le modal
        onSave={handleSavePassword} // Gérer la sauvegarde
      />
    </Box>
  );
}

export default ProfilePage;
