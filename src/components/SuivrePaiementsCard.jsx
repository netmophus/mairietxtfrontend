import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from 'react-router-dom';

function SuivrePaiementsCard() {

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        boxShadow: 3,
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 2,
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#1976d2', // Bleu pour symboliser les paiements
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <MonetizationOnIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Suivre les Paiements</Typography>
      <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => navigate('/admin/payments-summary')}
    >
      Voir les Paiements
    </Button>
    </Card>
  );
}

export default SuivrePaiementsCard;
