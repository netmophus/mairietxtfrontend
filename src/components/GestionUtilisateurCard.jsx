import React from 'react';
import { Card, Avatar, Typography, Button } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

function GestionUtilisateurCard() {
  const navigate = useNavigate(); // Hook pour rediriger

  const handleNavigate = () => {
    navigate('/admin/users'); // Redirection vers la gestion des utilisateurs
  };

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
          bgcolor: '#4caf50',
          mx: 'auto',
          width: 60,
          height: 60,
          mb: 2,
        }}
      >
        <GroupIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Gestion des Utilisateurs</Typography>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleNavigate}
      >
        Gérer
      </Button>
    </Card>
  );
}

export default GestionUtilisateurCard;
