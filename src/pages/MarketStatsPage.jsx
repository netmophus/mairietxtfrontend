
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import axios from "axios"; // Import axios
import { useNavigate } from 'react-router-dom';

const MarketStatsPage = () => {
  // Données statiques des marchés
  const [markets, setMarkets] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const fetchMarketStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/admin/markets/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMarkets(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error.message);
      alert("Impossible de récupérer les statistiques des marchés.");
    }
  };

  useEffect(() => {
    fetchMarketStats();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f7f9fc", minHeight: "100vh", mt: 5 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tableau de Bord - Marchés
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Visualisez les informations et reçus pour chaque marché.
        </Typography>
      </Box>

      
      {/* Retour au Dashboard Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          fontSize: '1rem',
          fontWeight: 'bold',
          backgroundColor: '#6c757d', // Gris moderne
          '&:hover': { backgroundColor: '#5a6268' },
          ml: 2, // Marge à gauche pour l'espacement
        }}
        onClick={() => navigate("/admin/recus")}
      >
        Retour Gestion de reçu
      </Button>

      {/* Markets Section */}
      <Grid container spacing={4}>
        {markets.map((market) => (
          <Grid item xs={12} md={6} lg={4} key={market.id}>
            <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#ffffff" }}>
              <CardContent>
                {/* Market Name */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  {market.name}
                </Typography>

                {/* Market Receipts */}
                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <ReceiptIcon />
                </Avatar>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  Premier reçu : {market.firstReceipt}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  Dernier reçu : {market.lastReceipt}
                </Typography>

                {/* Button for Details */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/markets/${market.id}/details`)}
                >
                  Voir les Détails
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default MarketStatsPage;
