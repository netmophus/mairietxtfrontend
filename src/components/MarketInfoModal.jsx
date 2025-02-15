
import React from 'react';
import { Box, Typography, Modal, Button, Grid } from '@mui/material';

const MarketInfoModal = ({ open, onClose, market, onEdit, onDelete }) => {
  if (!market) return null; // Si aucun marché n'est sélectionné, ne rien afficher

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Détails du Marché
        </Typography>
        <Grid container spacing={2}>
          {/* Informations du marché */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Nom :</strong> {market.market}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Localisation :</strong> {market.location || 'Non spécifiée'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Collecteur :</strong> {market.collector || 'Non attribué'}
            </Typography>
          </Grid>
        </Grid>

        {/* Boutons d'action */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="primary" onClick={onEdit}>
            Modifier
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Supprimer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MarketInfoModal;
