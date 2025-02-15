import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminStatDetailsCardPage = () => {
  const { marketId } = useParams(); // Récupérer l'ID du marché
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  // Fonction pour récupérer les statistiques détaillées du marché
  const fetchMarketStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
       `${API_URL}/api/admin/markets/stats/${marketId}`,        
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("📊 Données reçues :", response.data);
      setMarketStats(response.data);
    } catch (error) {
      console.error("❌ Erreur API :", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketStats();
  }, [marketId]);

  // Affichage d'un loader pendant le chargement
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Vérifier si marketStats est null
  if (!marketStats) {
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h5" color="error">
          Erreur : Impossible de charger les données du marché.
        </Typography>
      </Box>
    );
  }

  // Extraction avec valeurs par défaut
  const {
    marketName = "Nom inconnu",
    totalPayments = 0,
    totalReceipts = 0,
    usedReceipts = 0,
    activeReceipts = 0,
    collector = { name: "Inconnu", phone: "N/A" },
    lastPaymentDate = "Aucune transaction",
  } = marketStats;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        mt: 17,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Détails des Statistiques - {marketName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Visualisez les statistiques de collecte et l'utilisation des reçus pour ce marché.
        </Typography>
      </Box>

      {/* Bouton retour vers le Dashboard */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          mb: 3,
          px: 3,
          py: 1,
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#6c757d", // Gris moderne
          "&:hover": { backgroundColor: "#5a6268" },
          ml: 2,
        }}
        onClick={() => navigate("/admin/marketstats")}
      >
        Retour marchés
      </Button>

      <Grid container spacing={4}>
        {/* Total Payments (Carte cliquable pour accéder au reporting des paiements) */}
        <Grid item xs={12} md={4}>
          <Card
           // Nouveau lien avec la route correcte
          onClick={() => navigate(`/admin/marketstatereport/${marketId}`)}

            sx={{
              backgroundColor: "#e3f2fd",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <MonetizationOnIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Total Collecté
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {totalPayments.toLocaleString()} FCFA
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Receipts */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#fbe9e7", textAlign: "center" }}>
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#d32f2f",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <ReceiptIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Total des Reçus
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {totalReceipts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Receipts */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: "#e8f5e9", textAlign: "center" }}>
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#388e3c",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <ReceiptIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Reçus Actifs
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {activeReceipts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Used Receipts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#fff3e0", textAlign: "center" }}>
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#ff6f00",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <ReceiptIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Reçus Utilisés
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                {usedReceipts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Collector Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#ede7f6", textAlign: "center" }}>
            <CardContent>
              <Avatar
                sx={{
                  bgcolor: "#512da8",
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Collecteur
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                {collector.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Contact : {collector.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Last Payment Date */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h6" fontWeight="bold">
              Dernier Paiement
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              {new Date(lastPaymentDate).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default AdminStatDetailsCardPage;
