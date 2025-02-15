
import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ContributorsPage() {
  const [contributors, setContributors] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App
  const fetchContributors = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin-dashboard/contributors-by-collector`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des contribuables.');
      }
      const data = await response.json();
      setContributors(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des contribuables :', err.message);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        mt: 20,
        backgroundColor: '#f7f9fc', // Fond de la page
        borderRadius: '12px', // Coins arrondis pour le conteneur
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#2c3e50', // Couleur de l'en-tête
        }}
      >
        Liste des Contribuables par Collecteur
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Ombre subtile pour le tableau
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e0e7ff' }}> {/* En-tête coloré */}
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Collecteur</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Contribuables
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributors.length > 0 ? (
              contributors.map((collector, index) => (
                <TableRow
                  key={collector._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Alternance des couleurs
                  }}
                >
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {collector._id || 'Non spécifié'}
                  </TableCell>
                  <TableCell>
                    {collector.taxpayers.length > 0 ? (
                      collector.taxpayers.map((taxpayer, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 1,
                            mb: 1,
                            borderRadius: '8px',
                            backgroundColor: '#f1f5f9', // Fond clair pour chaque contribuable
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Ombre subtile
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {taxpayer.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            Téléphone : {taxpayer.phone || 'Non spécifié'}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555' }}>
                            Adresse : {taxpayer.address || 'Non spécifiée'}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: '#999', textAlign: 'center' }}
                      >
                        Aucun contribuable associé.
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} sx={{ textAlign: 'center', color: '#999' }}>
                  Aucun collecteur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ContributorsPage;
