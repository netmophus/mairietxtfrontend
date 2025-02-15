
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssociateTaxToTaxpayerModal from '../components/AssociateTaxToTaxpayerModal';

function AssociateTaxesPage() {
  const [taxpayers, setTaxpayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App
 
  const fetchTaxpayers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/taxpayers/taxpayers-with-taxes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des contribuables.');
      }
      const data = await response.json();
      console.log("Données des contribuables :", data); 
      setTaxpayers(data); 
    } catch (err) {
      console.error('Erreur :', err.message);
    }
  };
  
  




  useEffect(() => {
    fetchTaxpayers();
  }, []);

  const handleOpenModal = (taxpayer) => {
    setSelectedTaxpayer(taxpayer);
    setOpenModal(true);
  };


  


  

  return (
    <Box sx={{ p: 3, mt: 20 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: '24px',
          fontWeight: 'bold',
          color: '#2c3e50',
        }}
      >
        Associer des Taxes aux Contribuables
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Nom</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Adresse</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Zone</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Taxes Associées</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

        


          <TableBody>
  {taxpayers.map((taxpayer, index) => (
    <TableRow
      key={taxpayer._id}
      sx={{
        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', // Alternance des couleurs
      }}
    >
      <TableCell align="center">{taxpayer.user?.name || 'N/A'}</TableCell>
      <TableCell align="center">{taxpayer.address}</TableCell>
      <TableCell align="center">{taxpayer.zone?.name || 'N/A'}</TableCell>
      <TableCell>
      {taxpayer.taxes && taxpayer.taxes.length > 0
        ? taxpayer.taxes.map(tax => tax.name).join(', ')  // On extrait les noms des taxes
        : 'Aucune taxe associée'}
    </TableCell>




      <TableCell align="center">       
        <IconButton
          color="primary"
          onClick={() => handleOpenModal(taxpayer)}
          sx={{
            '&:hover': {
              color: '#0056b3', // Couleur au survol
            },
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
  {!taxpayers.length && (
    <TableRow>
      <TableCell colSpan={5} align="center" sx={{ color: '#999' }}>
        Aucun contribuable disponible.
      </TableCell>
    </TableRow>
  )}
</TableBody>

















        </Table>
      </TableContainer>


<AssociateTaxToTaxpayerModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  onSave={fetchTaxpayers} // Passe la fonction pour rafraîchir les contribuables
  taxpayer={selectedTaxpayer}
/>;





    </Box>
  );
}

export default AssociateTaxesPage;






