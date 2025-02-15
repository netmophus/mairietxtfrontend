import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import logoville from '../assets/images/logoville.jpeg'; // Assurez-vous que le chemin vers le logo est correct

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#008751', // Couleur verte (cohérente avec le navbar)
        color: 'white', // Texte blanc pour le contraste
        py: 4, // Padding vertical pour un espacement suffisant
        px: 2, // Padding horizontal
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: 'center',
        }}
      >
        {/* Logo de la mairie */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <img
              src={logoville}
              alt="Logo de la mairie"
              style={{
                height: '100px',
                width: '100px',
                objectFit: 'cover',
                borderRadius: '12px', // Coins légèrement arrondis
              }}
            />
          </Box>
        </Grid>

     {/* Texte du footer */}
<Grid
  item
  xs={12}
  md={8}
  sx={{
    textAlign: 'center', // Texte centré sur toutes les tailles d'écran
  }}
>
  <Typography
    variant="body2"
    sx={{
      fontSize: '20px', // Taille principale du texte
    }}
  >
    &copy; 2024 MairieTaxe. Tous droits réservés.
  </Typography>
  <Typography
    variant="body2"
    sx={{
      fontSize: '25px', // Taille secondaire
      mt: 1, // Espacement entre les deux lignes
      opacity: 0.8, // Transparence pour le texte secondaire
      fontWeight:800,
    }}
  >
    Simplifiez vos paiements et services municipaux en toute sécurité.
  </Typography>
</Grid>

      </Grid>
    </Box>
  );
}

export default Footer;
