import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


function AddTaxpayerModal({ open, onClose, onSave, zones }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    activityType: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    media: {
      photos: [], // Tableau pour photos
      videos: [], // Tableau pour vidéos
    },
    taxes: [], // Ajout des taxes associées
    status: 'active', // Par défaut
    zones,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gestion des champs imbriqués
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMediaAdd = (type, value) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        media: {
          ...prev.media,
          [type]: [...prev.media[type], value.trim()],
        },
      }));
    }
  };

  const handleMediaRemove = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [type]: prev.media[type].filter((_, i) => i !== index),
      },
    }));
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        media: {
          ...prev.media,
          photos: [...prev.media.photos, reader.result], // Ajouter l'image convertie
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!formData.name || !formData.address || !formData.activityType) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajouter un Contribuable</DialogTitle>
    
      <DialogContent>
  <Box
    sx={{
      backgroundColor: '#f9f9f9', // Couleur de fond clair
      p: 3, // Padding interne
      borderRadius: 2, // Coins arrondis
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre légère
      display: 'flex',
      flexDirection: 'column',
      gap: 2, // Espacement entre les éléments
    }}
  >
    {/* Champs de base */}
    <TextField
      fullWidth
      margin="normal"
      label="Nom"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Adresse"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
    />
    <TextField
      fullWidth
      margin="normal"
      label="Téléphone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />
    <TextField
      fullWidth
      margin="normal"
      label="Type d'Activité"
      name="activityType"
      value={formData.activityType}
      onChange={handleChange}
      required
    />

    <Autocomplete
      options={zones}
      getOptionLabel={(option) => option.name || ''}
      onChange={(event, newValue) => {
        setFormData((prev) => ({
          ...prev,
          zone: newValue?._id || '', // Enregistrer l'ID de la zone sélectionnée
        }));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Zone"
          placeholder="Sélectionnez une zone"
          margin="normal"
        />
      )}
    />
  </Box>


  <Box sx={{ my: 2 }}>
  <Typography variant="h6" gutterBottom>
    Coordonnées GPS
  </Typography>
  <TextField
    fullWidth
    margin="normal"
    label="Latitude (facultatif)"
    name="coordinates.latitude"
    value={formData.coordinates.latitude}
    onChange={handleChange}
  />
  <TextField
    fullWidth
    margin="normal"
    label="Longitude (facultatif)"
    name="coordinates.longitude"
    value={formData.coordinates.longitude}
    onChange={handleChange}
  />
</Box>

<Box sx={{ my: 2 }}>
  <Typography variant="h6" gutterBottom>
    Médias : Photos
  </Typography>
  <Button
    variant="contained"
    component="label"
    sx={{ mr: 2 }}
  >
    Ajouter une Photo
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={(e) => handleFileUpload(e.target.files[0])}
    />
  </Button>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
    {formData.media.photos.map((photo, index) => (
      <Chip
        key={index}
        label={`Photo ${index + 1}`}
        onDelete={() => handleMediaRemove('photos', index)}
        color="primary"
      />
    ))}
  </Box>
</Box>

<Box sx={{ my: 2 }}>
  <Typography variant="h6" gutterBottom>
    Médias : Vidéos
  </Typography>
  <TextField
    fullWidth
    margin="normal"
    label="Ajouter une Vidéo (URL)"
    onKeyDown={(e) => {
      if (e.key === 'Enter' && e.target.value) {
        handleMediaAdd('videos', e.target.value);
        e.target.value = '';
      }
    }}
    placeholder="Appuyez sur Entrée pour ajouter une vidéo"
  />
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
    {formData.media.videos.map((video, index) => (
      <Chip
        key={index}
        label={`Vidéo ${index + 1}`}
        onDelete={() => handleMediaRemove('videos', index)}
        color="secondary"
      />
    ))}
  </Box>
</Box>

</DialogContent>



<DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
  <Button
    onClick={onClose}
    variant="outlined"
    color="secondary"
    sx={{
      px: 3,
      py: 1,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#f8d7da',
      },
    }}
  >
    Annuler
  </Button>
  <Button
    onClick={handleSave}
    variant="contained"
    color="primary"
    sx={{
      px: 3,
      py: 1,
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: '#0056b3',
      },
    }}
  >
    Sauvegarder
  </Button>
</DialogActions>





   



    </Dialog>
  );
}

export default AddTaxpayerModal;
