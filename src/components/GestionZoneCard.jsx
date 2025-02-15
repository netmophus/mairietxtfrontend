import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map'; // Icône pour la gestion des zones
import { useNavigate } from 'react-router-dom';

function GestionZoneCard() {

  
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
          bgcolor: '#1976d2', // Bleu pour symboliser les zones géographiques
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <MapIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Gestion des Zones</Typography>
    
      <Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={() => navigate('/admin/zones')} // Vérifiez que cette ligne redirige correctement
>
  Gérer les Zones
</Button>

    </Card>
  );
}

export default GestionZoneCard;
