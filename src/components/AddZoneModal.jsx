


import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

function AddZoneModal({ open, zone, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Pré-remplir les champs si une zone est sélectionnée pour modification
  useEffect(() => {
    if (zone) {
      setFormData({
        name: zone.name || '',
        description: zone.description || '',
      });
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [zone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name) {
      alert('Le nom de la zone est obligatoire.');
      return;
    }
    onSave(formData); // Appelle la fonction de sauvegarde passée en prop
    onClose(); // Ferme le modal
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
  sx={{
    backgroundColor: '#f7f9fc', // Fond clair
    borderBottom: '1px solid #e0e0e0', // Ligne séparatrice
    fontWeight: 'bold', // Texte en gras
    color: '#2c3e50', // Couleur du texte
    textAlign: 'center', // Centrage du texte
  }}
>
  {zone ? 'Modifier la Zone' : 'Ajouter une Zone'}
</DialogTitle>

<DialogContent
  sx={{
    backgroundColor: '#fff', // Fond blanc
    borderRadius: '12px', // Coins arrondis
    padding: '24px', // Espacement interne
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
  }}
>
  <TextField
    fullWidth
    margin="normal"
    label="Nom de la Zone"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    sx={{
      backgroundColor: '#f9f9f9', // Fond des champs
      borderRadius: '8px', // Coins arrondis
    }}
  />
  <TextField
    fullWidth
    margin="normal"
    label="Description"
    name="description"
    value={formData.description}
    onChange={handleChange}
    multiline
    rows={3}
    sx={{
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
    }}
  />
</DialogContent>


<DialogActions
  sx={{
    justifyContent: 'space-between', // Espacement entre les boutons
    padding: '16px', // Espacement interne
    backgroundColor: '#f7f9fc', // Fond clair pour le pied
    borderTop: '1px solid #e0e0e0', // Ligne séparatrice
  }}
>
  <Button
    onClick={onClose}
    color="secondary"
    sx={{
      textTransform: 'none', // Texte sans majuscules forcées
      borderRadius: '8px', // Coins arrondis
      fontWeight: 'bold',
    }}
  >
    Annuler
  </Button>
  <Button
    onClick={handleSave}
    variant="contained"
    color="primary"
    sx={{
      textTransform: 'none',
      borderRadius: '8px', // Coins arrondis
      fontWeight: 'bold',
    }}
  >
    {zone ? 'Sauvegarder' : 'Ajouter'}
  </Button>
</DialogActions>


    </Dialog>
  );
}

export default AddZoneModal;
