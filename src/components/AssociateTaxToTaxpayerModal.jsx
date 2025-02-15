import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';




function AssociateTaxToTaxpayerModal({ open, onClose, taxpayer, onSave }) {
  const [availableTaxes, setAvailableTaxes] = useState([]);
  const [selectedTaxes, setSelectedTaxes] = useState([]);
  // stocker pour chaque taxe l'information associée
  // Pour une taxe d'occupation : { surface: number }
  // Pour une taxe de publicité : { surface: number, option: 'option1'|'option2'|'option3' }
  const [taxSurfaces, setTaxSurfaces] = useState({});
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


  useEffect(() => {
    if (taxpayer) {
      fetchAvailableTaxes();
      setSelectedTaxes(taxpayer.taxes?.map((tax) => tax._id) || []);
    }
  }, [taxpayer]);

  const fetchAvailableTaxes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/taxes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des taxes.');
      }
      const data = await response.json();
      setAvailableTaxes(data);
    } catch (err) {
      console.error('Erreur :', err.message);
    }
  };

  // Met à jour taxSurfaces pour une taxe donnée
  const handleSurfaceChange = (taxId, value) => {
    setTaxSurfaces(prev => ({
      ...prev,
      [taxId]: value,
    }));
  };

  const handleSave = async () => {
    // Préparer le payload en envoyant les IDs des taxes et l'objet surfaces
    const payload = {
      taxes: selectedTaxes,
      surfaces: taxSurfaces,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/taxpayers/${taxpayer._id}/associate-taxes`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l’association des taxes.');
      }

      alert('Taxes associées avec succès.');
      onClose();
      onSave(); // Rafraîchir la liste si nécessaire
    } catch (err) {
      console.error('Erreur :', err.message);
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        mt: 10,
        '.MuiPaper-root': {
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#f7f9fc',
          color: '#2c3e50',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        Associer des Taxes
      </DialogTitle>

      <DialogContent
        sx={{
          padding: '24px',
          backgroundColor: '#fff',
          borderRadius: '12px',
        }}
      >
        <Autocomplete
          multiple
          options={availableTaxes}
          getOptionLabel={(option) => option.name || ''}
          value={availableTaxes.filter((tax) => selectedTaxes.includes(tax._id))}
          onChange={(event, newValue) =>
            setSelectedTaxes(newValue.map((tax) => tax._id))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sélectionner des Taxes"
              placeholder="Taxes disponibles"
              margin="normal"
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
            />
          )}
        />

        {selectedTaxes.map((taxId, index) => {
          const taxDetail = availableTaxes.find((tax) => tax._id === taxId);
          if (!taxDetail) return null;
          return (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Détails de la taxe : {taxDetail.name}
              </Typography>
              <TextField
                fullWidth
                label="Tarif"
                value={
                  taxDetail.isVariable
                    ? taxDetail.name === "Taxe d'occupation du domaine publique"
                      ? `${taxDetail.supportRates.default} FCFA/m²`
                      : // Pour la taxe de publicité, on affichera un message indiquant que l'option doit être choisie
                        "Sélectionnez l'option tarifaire et renseignez la surface"
                    : `${taxDetail.amount} FCFA`
                }
                disabled
                margin="normal"
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
              />
              <TextField
                fullWidth
                label="Date d’échéance"
                value={
                  taxDetail.dueDate
                    ? new Date(taxDetail.dueDate).toLocaleDateString()
                    : 'Non spécifiée'
                }
                disabled
                margin="normal"
                sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
              />
              {/* Pour la taxe d'occupation, afficher le champ de saisie de surface */}
              {taxDetail.isVariable && taxDetail.name === "Taxe d'occupation du domaine publique" && (
                <TextField
                  fullWidth
                  label="Surface (m²)"
                  type="number"
                  margin="normal"
                  value={taxSurfaces[taxId] || ''}
                  onChange={(e) => handleSurfaceChange(taxId, parseFloat(e.target.value))}
                  placeholder="Saisir la surface pour calculer le montant"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
                />
              )}
              {/* Pour la taxe de publicité, afficher la sélection d'option et la surface */}
              {taxDetail.isVariable && taxDetail.name === "Taxe de publicité" && (
                <Box>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Choisir l'option de tarif</InputLabel>
                    <Select
                      value={(taxSurfaces[taxId] && taxSurfaces[taxId].option) || ''}
                      onChange={(e) =>
                        handleSurfaceChange(taxId, {
                          ...taxSurfaces[taxId],
                          option: e.target.value,
                        })
                      }
                      label="Choisir l'option de tarif"
                    >
                      <MenuItem value="option1">
                        Option 1: {taxDetail.supportRates.option1} FCFA/m²
                      </MenuItem>
                      <MenuItem value="option2">
                        Option 2: {taxDetail.supportRates.option2} FCFA/m²
                      </MenuItem>
                      <MenuItem value="option3">
                        Option 3: {taxDetail.supportRates.option3} FCFA/m²
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Surface (m²)"
                    type="number"
                    margin="normal"
                    value={(taxSurfaces[taxId] && taxSurfaces[taxId].surface) || ''}
                    onChange={(e) =>
                      handleSurfaceChange(taxId, {
                        ...taxSurfaces[taxId],
                        surface: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Saisir la surface"
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </DialogContent>

      <DialogActions
        sx={{
          padding: '16px 24px',
          backgroundColor: '#f7f9fc',
          borderTop: '1px solid #e0e0e0',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={onClose}
          color="secondary"
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
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
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AssociateTaxToTaxpayerModal;
