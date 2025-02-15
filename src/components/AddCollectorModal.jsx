
import  { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';

function AddCollectorModal({ open, collector, onClose, onSave, zones }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    idDocument: '',
    address: '',
    hireDate: new Date().toISOString().split('T')[0], // Date actuelle par défaut
    assignedZones: [],
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    idDocument: false,
    address: false,
  });

  // Charger les données du collecteur si en mode édition
  useEffect(() => {
    if (collector) {
      setFormData({
        name: collector.user?.name || '',
        phone: collector.user?.phone || '',
        email: collector.user?.email || '',
        idDocument: collector.idDocument || '',
        address: collector.address || '',
        hireDate: collector.hireDate ? collector.hireDate.split('T')[0] : new Date().toISOString().split('T')[0],
        assignedZones: collector.assignedZones || [],
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
        idDocument: '',
        address: '',
        hireDate: new Date().toISOString().split('T')[0],
        assignedZones: [],
      });
    }
  }, [collector]);

  // Réinitialiser le formulaire lorsque le modal est fermé
  useEffect(() => {
    if (!open) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        idDocument: '',
        address: '',
        hireDate: new Date().toISOString().split('T')[0],
        assignedZones: [],
      });
      setErrors({
        name: false,
        phone: false,
        idDocument: false,
        address: false,
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value })); // Réinitialiser l'erreur lorsque l'utilisateur saisit quelque chose
  };

  const handleSave = () => {
    // Validation des champs obligatoires
    const newErrors = {
      name: !formData.name,
      phone: !formData.phone,
      idDocument: !formData.idDocument,
      address: !formData.address,
    };

    if (newErrors.name || newErrors.phone || newErrors.idDocument || newErrors.address) {
      setErrors(newErrors);
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    onSave(formData); // Envoyer les données au parent
    onClose(); // Fermer le modal
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#1565c0',
          color: '#ffffff',
          textAlign: 'center',
          fontWeight: 'bold',
          padding: '16px 24px',
        }}
      >
        {collector ? 'Modifier le Collecteur' : 'Ajouter un Collecteur'}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Nom Complet"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          helperText={errors.name ? 'Ce champ est obligatoire' : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Numéro de Téléphone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          error={errors.phone}
          helperText={errors.phone ? 'Ce champ est obligatoire' : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email (optionnel)"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="CIN ou Passeport"
          name="idDocument"
          value={formData.idDocument}
          onChange={handleChange}
          required
          error={errors.idDocument}
          helperText={errors.idDocument ? 'Ce champ est obligatoire' : ''}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Adresse"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          error={errors.address}
          helperText={errors.address ? 'Ce champ est obligatoire' : ''}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Date d'Embauche"
          name="hireDate"
          type="date"
          value={formData.hireDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, hireDate: e.target.value }))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Autocomplete
          multiple
          options={zones || []}
          getOptionLabel={(option) => option?.name || 'Zone inconnue'}
          value={formData.assignedZones.map((zoneId) =>
            zones.find((zone) => zone._id === zoneId) || { _id: zoneId, name: 'Zone inconnue' }
          )}
          onChange={(event, newValue) => {
            setFormData((prev) => ({
              ...prev,
              assignedZones: newValue.map((zone) => zone._id),
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Zones Assignées" placeholder="Sélectionnez les zones" margin="dense" />
          )}
        />
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#f7f9fc',
        }}
      >
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#f9f9f9',
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
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#004ba0',
            },
          }}
        >
          {collector ? 'Sauvegarder' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCollectorModal;