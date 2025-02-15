import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const ReceiptGeneratePage = () => {
  const [markets, setMarkets] = useState([]); // Liste des marchés
  const [receiptBatches, setReceiptBatches] = useState([]); // Liste des reçus générés
  const [selectedMarket, setSelectedMarket] = useState(""); // Marché sélectionné
  const [startReceipt, setStartReceipt] = useState(""); // Début du reçu
  const [endReceipt, setEndReceipt] = useState(""); // Fin du reçu
  const [isFormVisible, setIsFormVisible] = useState(false); // Contrôle de la visibilité du formulaire
  const [selectedBatch, setSelectedBatch] = useState(null); // Lot de reçus sélectionné
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  // Fonction pour récupérer les marchés
  const fetchMarkets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/markets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMarkets(response.data);
      console.log("📥 Marchés récupérés :", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des marchés :", error.message);
      alert("Impossible de récupérer les marchés.");
    }
  };

  // Fonction pour récupérer les lots de reçus générés
  const fetchReceiptBatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/receipt-batches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("📥 Reçus récupérés :", response.data); // Vérifiez ici les champs `market`
      setReceiptBatches(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des reçus :", error.message);
    }
  };
  

  // Fonction pour générer des reçus
  const handleGenerateReceipts = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/receipt-batches`,
        { market: selectedMarket, startReceipt, endReceipt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reçus générés avec succès !");
      // Recharger les données depuis l'API
      await fetchReceiptBatches();
      // Réinitialiser les champs du formulaire
      setSelectedMarket("");
      setStartReceipt("");
      setEndReceipt("");
      setIsFormVisible(false); // Cache le formulaire après l'ajout
    } catch (error) {
      console.error("Erreur lors de la génération des reçus :", error.message);
      alert("Erreur lors de la génération des reçus.");
    }
  };
  
  

  useEffect(() => {
    fetchMarkets();
    fetchReceiptBatches();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
        p: 4,
        mt:17,
      }}
    >
      {/* Conteneur principal */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          p: 4,
          borderRadius: "12px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Génération des Reçus
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Gérez la génération et la visualisation des lots de reçus associés à chaque marché.
        </Typography>

        {/* Bouton Ajouter des Reçus */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "flex-end" }}>
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
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Ajouter des Reçus
          </Button>

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
        </Box>

        {/* Formulaire d'ajout des reçus */}
        {isFormVisible && (
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: "12px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Formulaire de Génération de Reçus
            </Typography>
            <form onSubmit={handleGenerateReceipts}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="market-select-label">Marché</InputLabel>
                <Select
                  labelId="market-select-label"
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  label="Marché"
                >
                  {markets.map((market) => (
                    <MenuItem key={market._id} value={market._id}>
                      {market.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Reçu Départ"
                value={startReceipt}
                onChange={(e) => setStartReceipt(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <TextField
                label="Reçu Fin"
                value={endReceipt}
                onChange={(e) => setEndReceipt(e.target.value)}
                fullWidth
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3 }}
              >
                Générer
              </Button>
            </form>
          </Paper>
        )}

        {/* Tableau des reçus générés */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Lots de Reçus Générés
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Marché</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Localisation</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>collecteur</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Reçu Départ</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Reçu Fin</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {receiptBatches.map((batch) => (
    <TableRow key={batch._id}>
      <TableCell>{batch.market?.name || "Marché inconnu"}</TableCell>
      <TableCell>{batch.market?.location || "Localisation non définie"}</TableCell>
      <TableCell>{batch.collector?.name || "Collecteur inconnu"}</TableCell>
      <TableCell>{batch.startReceipt || "Non défini"}</TableCell>
      <TableCell>{batch.endReceipt || "Non défini"}</TableCell>
      {/* <TableCell>{batch.status || "Statut non défini"}</TableCell> */}
      <TableCell>
    <Button
      variant="outlined"
      onClick={() => setSelectedBatch(batch)} // Sélectionne le lot actuel
    >
      Sélectionner
    </Button>
  </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReceiptGeneratePage;
