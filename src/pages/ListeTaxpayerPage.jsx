
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Pagination,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';

function ListeTaxpayerPage() {
  const navigate = useNavigate();

  const [taxpayers, setTaxpayers] = useState([]); // Liste des contribuables
  const [searchPhone, setSearchPhone] = useState(''); // Zone de recherche par téléphone
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const rowsPerPage = 10; // Nombre de lignes par page
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

// Récupération du nom du collecteur connecté à partir du localStorage
const connectedCollectorName = localStorage.getItem('userName') || 'Collecteur inconnu';


  // Fonction pour récupérer les contribuables


const fetchTaxpayers = async (page = 1) => {
    try {
      const phoneQuery = searchPhone.trim() ? `&phone=${searchPhone.trim()}` : '';
      
      console.log("=== Début de la recherche ===");
      console.log("Numéro recherché :", searchPhone.trim());
      console.log("Requête envoyée :", `${API_URL}/api/taxpayers?page=${page}&limit=${rowsPerPage}${phoneQuery}`);
  
      const response = await fetch(
        `${API_URL}/api/taxpayers?page=${page}&limit=${rowsPerPage}${phoneQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (!response.ok) {
        console.error("Erreur dans la réponse HTTP :", response.status, response.statusText);
        throw new Error('Erreur lors de la récupération des contribuables.');
      }
  
      const data = await response.json();
      console.log("=== Données récupérées depuis le backend ===");
      console.log("Données récupérées :", data);
  
      // Formatage et mise à jour de l'état
      const formattedTaxpayers = data.map((taxpayer) => ({
        id: taxpayer._id,
        name: taxpayer.name,
        phone: taxpayer.phone,
        zone: taxpayer.zone?.name || "Zone inconnue",
        collector: taxpayer.assignedCollector?.name || "Collecteur inconnu",
        collectorEmail: taxpayer.assignedCollector?.email || "Email non disponible",
        collectorPhone: taxpayer.assignedCollector?.phone || "Téléphone non disponible",
      }));
  
      console.log("=== Données formatées ===");
      console.log("Contribuables formatés :", formattedTaxpayers);
  
      setTaxpayers(formattedTaxpayers);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(data.length / rowsPerPage),
        totalItems: data.length,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des contribuables :", err.message);
    }
  };
  

  // Charger les contribuables au chargement initial
  useEffect(() => {
    fetchTaxpayers(pagination.currentPage);
  }, [pagination.currentPage]);

  // Gestion de la recherche
  const handleSearch = () => {
    console.log("==> Début de la recherche.");
    console.log("Numéro recherché :", searchPhone);
  
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Réinitialise la pagination
    fetchTaxpayers(1); // Récupère les données filtrées
  };
  

  // Gestion du changement de page
  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, currentPage: value })); // Met à jour la page actuelle
    fetchTaxpayers(value); // Charger les données pour la nouvelle page
  };

  return (
    <Box sx={{ p: 3, mt: 17 }}>
      {/* Titre */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50',
          borderBottom: '2px solid #007BFF',
          pb: 1,
          mb: 3,
        }}
      >
        Liste des Contribuables
      </Typography>

      {/* Zone de recherche */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          label="Rechercher par téléphone"
          variant="outlined"
          size="small"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            ml: 2,
            py: 1,
            px: 3,
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#007BFF',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Rechercher
        </Button>
      </Box>

      {/* Tableau des contribuables */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#007BFF' }}>
            <TableRow>
              {['Nom', 'Téléphone', 'Zone Géographique', 'Collecteur', 'Actions'].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1rem',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {taxpayers.map((taxpayer) => (
              <TableRow
                key={taxpayer.id}
                sx={{
                  backgroundColor: '#f9f9f9',
                }}
              >
                <TableCell sx={{ textAlign: 'center' }}>{taxpayer.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{taxpayer.phone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{taxpayer.zone}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{taxpayer.collector || connectedCollectorName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
               

                <IconButton
  color="primary"
  onClick={() => {
    console.log("ID du contribuable pour la redirection :", taxpayer.id); // Log pour vérifier l'ID
    navigate(`/collector/payment-history/${taxpayer.id}`); // Redirige avec l'ID du contribuable
  }}
>
  <HistoryIcon />
</IconButton>







                </TableCell>
              </TableRow>
            ))}
            {!taxpayers.length && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    textAlign: 'center',
                    color: '#999',
                    backgroundColor: '#f9f9f9',
                    py: 3,
                  }}
                >
                  Aucun contribuable trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default ListeTaxpayerPage;


