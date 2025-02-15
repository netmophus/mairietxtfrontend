
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
  MenuItem,
 
  InputLabel,

  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

function EditTaxModal({ open, tax, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    // Pour une taxe fixe, on utilisera "amount"
    amount: '',
    // Pour une taxe variable, on utilisera "rate"
    rate: '',
    isVariable: false,
    frequency: '',
    dueDate: '',
  });

  // Mettre à jour les champs du formulaire lorsque la taxe change
  useEffect(() => {
    if (tax) {
      setFormData({
        id: tax._id || '',
        name: tax.name || '',
        description: tax.description || '',
        // Si la taxe est variable, la valeur est dans "rate", sinon dans "amount"
        amount: tax.isVariable ? '' : tax.amount || '',
        rate: tax.isVariable ? tax.rate || '' : '',
        isVariable: tax.isVariable || false,
        frequency: tax.frequency || '',
        dueDate: tax.dueDate ? new Date(tax.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [tax]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion du changement de type (fixe/variable)
  const handleTypeChange = (e) => {
    const value = e.target.value === 'variable';
    setFormData((prev) => ({
      ...prev,
      isVariable: value,
      // Réinitialiser les champs amount et rate selon le choix
      amount: value ? '' : prev.amount,
      rate: value ? prev.rate : '',
    }));
  };

  const handleSubmit = () => {
    // Vérifier les champs obligatoires communs
    if (!formData.name || !formData.frequency || !formData.dueDate) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Vérifier selon le type de taxe
    if (formData.isVariable) {
      if (!formData.rate) {
        alert('Veuillez renseigner le taux pour la taxe variable.');
        return;
      }
    } else {
      if (!formData.amount) {
        alert('Veuillez renseigner le montant pour la taxe fixe.');
        return;
      }
    }

    console.log('Données soumises :', formData);

    // Construire l'objet taxe à sauvegarder
    const updatedTax = {
      _id: formData.id,
      name: formData.name,
      description: formData.description,
      isVariable: formData.isVariable,
      frequency: formData.frequency,
      dueDate: formData.dueDate,
      // En fonction du type, on envoie rate ou amount
      ...(formData.isVariable ? { rate: parseFloat(formData.rate) } : { amount: parseFloat(formData.amount) }),
    };

    onSave(updatedTax);
    onClose();
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
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#1976d2',
          borderBottom: '2px solid #f0f0f0',
          pb: 2,
        }}
      >
        Modifier la Taxe
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            p: 3,
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Nom de la Taxe"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
          />

          {/* Choix du type de taxe */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <InputLabel>Type</InputLabel>
            <RadioGroup
              row
              name="taxType"
              value={formData.isVariable ? 'variable' : 'fixe'}
              onChange={handleTypeChange}
            >
              <FormControlLabel value="fixe" control={<Radio />} label="Fixe" />
              <FormControlLabel value="variable" control={<Radio />} label="Variable" />
            </RadioGroup>
          </Box>

          {/* Afficher le champ Montant pour une taxe fixe */}
          {!formData.isVariable && (
            <TextField
              fullWidth
              margin="normal"
              label="Montant (FCFA)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          )}

          {/* Afficher le champ Taux pour une taxe variable */}
          {formData.isVariable && (
            <TextField
              fullWidth
              margin="normal"
              label="Taux (FCFA/m²)"
              name="rate"
              type="number"
              value={formData.rate}
              onChange={handleChange}
              required
            />
          )}

          <TextField
            select
            fullWidth
            margin="normal"
            label="Fréquence"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <MenuItem value="monthly">Mensuel</MenuItem>
            <MenuItem value="annual">Annuel</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="normal"
            label="Date d’échéance"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          backgroundColor: '#f7f9fc',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#f8d7da', color: '#721c24' },
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '8px',
            backgroundColor: '#28a745',
            '&:hover': { backgroundColor: '#218838' },
          }}
        >
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditTaxModal;
