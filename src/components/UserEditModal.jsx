import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from '@mui/material';

function UserEditModal({ open, user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    status: '',
  });

  

  useEffect(() => {
    console.log('Props reçues dans UserEditModal:', { open, user, onClose, onSave });
  }, [open, user, onClose, onSave]);
  

  useEffect(() => {
    if (user) {
      console.log('Données utilisateur reçues dans le modal :', user);
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        role: user.role || '',
        status: user.status || '',
      });
    }
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...user, ...formData }); // Sauvegarder les modifications
  };

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    sx={{
      '& .MuiDialog-paper': {
        p: 2,
        borderRadius: '12px',
        boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)', // Ombre moderne
      },
    }}
  >
  
      
      <DialogTitle
  sx={{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#1976d2', // Couleur primaire
    borderBottom: '2px solid #f0f0f0', // Ligne en bas pour séparer
    pb: 2,
  }}
>
  Modifier l'Utilisateur
</DialogTitle>

      {/* <DialogContent>
      <TextField
  fullWidth
  label="Nom"
  name="name"
  value={formData.name} // Utilise formData pour afficher les données
  onChange={handleChange}
  margin="dense"
/>
<TextField
  fullWidth
  label="Numéro de Téléphone"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  margin="dense"
/>
<TextField
  fullWidth
  label="Email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  margin="dense"
/>
<TextField
  fullWidth
  label="Rôle"
  name="role"
  value={formData.role}
  onChange={handleChange}
  margin="dense"
/>
<TextField
  fullWidth
  label="Statut"
  name="status"
  value={formData.status}
  margin="dense"
  disabled // Grisé pour éviter la modification
/>

      </DialogContent> */}


<DialogContent>
  <Box
    sx={{
      p: 3,
      backgroundColor: '#f9f9f9', // Fond clair pour le contenu
      borderRadius: '8px', // Coins arrondis
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
      display: 'flex',
      flexDirection: 'column',
      gap: 2, // Espacement entre les champs
    }}
  >
    <TextField
      fullWidth
      label="Nom"
      name="name"
      value={formData.name}
      onChange={handleChange}
      margin="dense"
      required
      error={!formData.name} // Validation : bordure rouge si vide
      helperText={!formData.name ? 'Nom obligatoire' : ''}
    />
    <TextField
      fullWidth
      label="Numéro de Téléphone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      margin="dense"
      required
      error={!formData.phone}
      helperText={!formData.phone ? 'Téléphone obligatoire' : ''}
    />
    <TextField
      fullWidth
      label="Email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      margin="dense"
    />
    <TextField
      fullWidth
      label="Rôle"
      name="role"
      value={formData.role}
      onChange={handleChange}
      margin="dense"
    />
    <TextField
      fullWidth
      label="Statut"
      name="status"
      value={formData.status}
      margin="dense"
      disabled
    />
  </Box>
</DialogContent>

      {/* <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Sauvegarder
        </Button>
      </DialogActions> */}

<DialogActions>
  <Button
    onClick={onClose}
    sx={{
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '8px',
      color: '#f44336', // Rouge moderne pour le bouton "Annuler"
      '&:hover': { backgroundColor: '#fbe9e7', color: '#d32f2f' },
    }}
  >
    Annuler
  </Button>
  <Button
    onClick={handleSubmit}
    variant="contained"
    sx={{
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderRadius: '8px',
      backgroundColor: '#4caf50', // Vert moderne pour "Sauvegarder"
      '&:hover': { backgroundColor: '#388e3c' },
    }}
  >
    Sauvegarder
  </Button>
</DialogActions>

    </Dialog>
  );
}

export default UserEditModal;
