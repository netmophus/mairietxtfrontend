import React from 'react';
import { Card, Button, Typography, Avatar } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';

const GestionRecusCard = () => {
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
          bgcolor: 'primary.main',
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <ReceiptIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Gestion des reçus</Typography>
      <Button
  variant="contained"
  color="primary"
  fullWidth
  sx={{ mt: 2 }}
  onClick={() => navigate('/admin/recus')} // Chemin identique à celui défini dans les routes
>
  Gérer
</Button>

    </Card>
  );
};

export default GestionRecusCard;
