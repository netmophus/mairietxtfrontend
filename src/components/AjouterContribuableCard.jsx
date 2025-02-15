import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';



function AjouterContribuableCard() {

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
          bgcolor: '#4caf50', // Vert pour contribuer à une ambiance positive
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <PersonAddIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Gestion de Contribuable</Typography>
      <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      onClick={() => navigate('/admin/contributors')} // Navigue vers la page des contribuables
    >
      Voir
    </Button>
    </Card>
  );
}

export default AjouterContribuableCard;
