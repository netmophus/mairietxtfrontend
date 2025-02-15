
import React from 'react';
import {  
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Paper,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function HomePage() {
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://picsum.photos/1280/720)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#000',
          textAlign: 'center',
          mt: 19,
          boxShadow: 3,
        }}
      >
        <Box sx={{ maxWidth: '600px' }}>
          <Typography variant="h2" fontWeight="bold">
            Bienvenue sur MairieTaxe
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
            Simplifiez votre gestion et sécurisez vos données en quelques clics
          </Typography>
          <Button variant="contained" color="secondary" size="large">
            Commencer Maintenant
          </Button>
        </Box>
      </Paper>

      {/* Points Forts */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Pourquoi utiliser notre plateforme ?
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: <SecurityIcon fontSize="large" />,
              color: '#e3f2fd',
              borderColor: '#1976d2',
              title: 'Sécurité garantie',
              text: 'Vos paiements sont entièrement sécurisés grâce aux normes les plus avancées. Contribuez en toute confiance.',
            },
            {
              icon: <SpeedIcon fontSize="large" />,
              color: '#e8f5e9',
              borderColor: '#388e3c',
              title: 'Paiement rapide',
              text: 'Effectuez vos paiements en ligne en quelques clics ou via nos collecteurs officiels. Gagnez du temps précieux.',
            },
            {
              icon: <AccessibilityIcon fontSize="large" />,
              color: '#fff8e1',
              borderColor: '#f57c00',
              title: 'Accès simplifié',
              text: 'Connectez-vous pour récupérer vos reçus ou consulter l’historique de vos paiements à tout moment.',
            },
            {
              icon: <SupportAgentIcon fontSize="large" />,
              color: '#ffebee',
              borderColor: '#d32f2f',
              title: 'Support dédié',
              text: 'Une équipe à votre écoute pour vous accompagner dans vos démarches et répondre à toutes vos questions.',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={5}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: feature.color,
                  border: `3px solid ${feature.borderColor}`,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: feature.borderColor,
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
