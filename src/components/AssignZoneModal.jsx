import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';

function AssignZoneModal({ open, collector, onClose, onSave, zones }) {
  const [selectedZones, setSelectedZones] = useState([]);

  // Pré-remplir les zones assignées lorsque le modal s’ouvre
  useEffect(() => {
    if (collector) {
      setSelectedZones(collector.assignedZones || []);
    } else {
      setSelectedZones([]);
    }
  }, [collector]);

  const handleSave = () => {
    onSave({ ...collector, assignedZones: selectedZones.map((zone) => zone._id) });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Assigner des Zones</DialogTitle>
      <DialogContent>
        <Autocomplete
          multiple
          options={zones || []} // Liste des zones disponibles
          getOptionLabel={(option) => option.name || ''}
          value={selectedZones}
          onChange={(event, newValue) => setSelectedZones(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Zones Assignées"
              placeholder="Sélectionnez les zones"
              margin="normal"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AssignZoneModal;
