
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
 Select,
 MenuItem,
  
} from '@mui/material';

import axios from 'axios';

import { useNavigate } from 'react-router-dom'; // Import pour la navigation

import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "../components/ReceiptPDF"; // Le composant PDF
import { pdf } from "@react-pdf/renderer";

const GestionRecusPage = () => { 

  const [receiptBatches, setReceiptBatches] = useState([]); // Pour les reçus
  const [markets, setMarkets] = useState([]); // Pour les marchés
  const [pdfLink, setPdfLink] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null); // Lot de reçus sélectionné


  const navigate = useNavigate(); // Hook pour naviguer
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App


const fetchMarkets = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Non autorisé. Connectez-vous d’abord.");
      return;
    }

    const response = await axios.get(`${API_URL}/api/markets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("📥 Marchés récupérés après le fetch :", response.data); // Vérifiez ici combien de marchés sont retournés
      const markets = response.data.map((market) => ({
        id: market._id,
        name: market.name,
        location: market.location || "Non spécifiée",
        collector: market.collector?.name || "Collecteur inconnu",
      }));
      setMarkets(markets); // Mets à jour l'état des marchés
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des marchés :", error.message);
    alert("Impossible de récupérer les marchés.");
  }
};

// Charger les marchés au chargement du composant
useEffect(() => {
  fetchMarkets();
}, []);







const fetchReceiptBatches = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Non autorisé. Connectez-vous d’abord.");
      return;
    }

    // Requête vers l'API
    const response = await axios.get(`${API_URL}/api/receipt-batches/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("📥 Lots de reçus récupérés bruts :", response.data);

      // Inclure les données nécessaires dans chaque lot
      const batches = response.data.map((batch) => ({
        id: batch._id,
        startReceipt: batch.startReceipt,
        endReceipt: batch.endReceipt,
        status: batch.status,
        marketName: batch.market?.name || "Nom de marché manquant",
        communeName: batch.market?.location || "Localisation inconnue",
        collectorName: batch.collector?.name || "Collecteur inconnu",
        confirmationCodes: batch.confirmationCodes || [], // Si disponible
      }));

      // Vérification des données après transformation
      console.log("🔹 Données formatées :", batches);

      // Mise à jour des reçus
      setReceiptBatches(batches);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des lots de reçus :", error.message);
    alert("Impossible de récupérer les lots de reçus.");
  }
};

useEffect(() => {
  fetchReceiptBatches();
}, []);




  const handleAddMarket = () => {
    navigate('/create-market'); // Redirection vers la page de création de marché
  };


// Fonction pour générer le PDF


const handleGeneratePDF = async () => {
  if (!selectedBatch) {
    alert("Veuillez sélectionner un lot de reçus avant de générer le PDF.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${API_URL}/api/receipt-batches/${selectedBatch.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      const batchDetails = response.data;

      // Vérifiez si `confirmationCodes` est défini et non vide
      if (!batchDetails.confirmationCodes || batchDetails.confirmationCodes.length === 0) {
        console.error("❌ Aucun reçu disponible pour ce lot :", batchDetails.confirmationCodes);
        alert("Aucun reçu disponible pour ce lot.");
        return;
      }

      // Formatage des données pour le PDF
      const formattedReceipts = batchDetails.confirmationCodes.map((code) => ({
        communeName: batchDetails.market?.location || "Non spécifié",
        number: code.receipt || "N/A",
        taxNumber: code.receipt || "N/A",
        confirmationCode: code.code || "N/A",
        amount: "500 FCFA", // Montant fixe ou basé sur une logique
        collectorName: batchDetails.collector?.name || "Non défini",
        paymentDate: batchDetails.createdAt
          ? new Date(batchDetails.createdAt).toLocaleDateString()
          : "Date inconnue",
      }));

      console.log("📄 Données formatées pour le PDF :", formattedReceipts);

      // Création du lien PDF
      const pdfComponent = (
        <PDFDownloadLink
          document={<ReceiptPDF receipts={formattedReceipts} />}
          fileName={`Recu_${batchDetails.market?.name || "Marché"}.pdf`}
        >
          {({ loading }) =>
            loading ? "Génération du PDF..." : "Télécharger le PDF"
          }
        </PDFDownloadLink>
      );

      setPdfLink(pdfComponent); // Affiche le lien PDF
    }
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des détails :", error.message);
    alert("Impossible de générer le PDF pour le lot sélectionné.");
  }
};


const handleActivateBatch = async () => {
  if (!selectedBatch) {
    alert("Veuillez sélectionner un lot de reçus avant de l'activer.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/api/receipt-batches/${selectedBatch.id}/activate`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      alert(response.data.message); // Message de succès
      setSelectedBatch(null); // Réinitialiser la sélection
      fetchReceiptBatches(); // Recharger les lots de reçus pour mettre à jour l'état
    }
  } catch (error) {
    console.error("Erreur lors de l'activation :", error.message);
    alert("Erreur lors de l'activation du lot de reçus.");
  }
};





  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f9fc',
        p: 4,
        mt:17,
      }}
    >
      {/* Conteneur principal */}
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: '1200px',
          p: 5,
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Gestion des Reçus
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Gérez les marchés, générez et activez des lots de reçus pour les collecteurs.
        </Typography>

        {/* Cartes d'action */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Carte pour créer un marché */}
          <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Créer un Marché
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Ajoutez un nouveau marché et associez-le à un collecteur.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddMarket} // Appelle la fonction de navigation
        >
          Ajouter un Marché
        </Button>
      </CardActions>
    </Card>
          </Grid>

          {/* ... Les autres cartes restent inchangées ... */}
        
 {/* Bouton Générer des reçus */}
 <Grid item xs={12} md={4}>
      <Card sx={{ backgroundColor: "#fbe9e7" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Générer des Reçus
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Créez des numéros de reçus uniques pour les collecteurs et les marchés.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/generate-receipts")} // Redirige vers la page
          >
            Générer
          </Button>
        </CardActions>
      </Card>
    </Grid>


 {/* Modal Générer des reçus */}



 <Grid item xs={12} md={4}>
  <Card sx={{ backgroundColor: '#e8f5e9' }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold">
        Activer des Reçus
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Validez les reçus générés pour qu'ils soient disponibles pour les collecteurs.
      </Typography>

      {/* Menu déroulant pour sélectionner un lot */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Sélectionnez un lot de reçus :</Typography>
        <Select
          value={selectedBatch ? selectedBatch.id : ""}
          onChange={(e) => {
            const batch = receiptBatches.find((b) => b.id === e.target.value);
            setSelectedBatch(batch);
          }}
          fullWidth
        >
          {receiptBatches.map((batch) => (
            <MenuItem key={batch.id} value={batch.id}>
              {`${batch.marketName} - Reçus ${batch.startReceipt} à ${batch.endReceipt}`}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </CardContent>
    <CardActions>
      {/* <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={handleActivateBatch} // Appelle la fonction pour activer
        disabled={!selectedBatch} // Désactiver si aucun lot n'est sélectionné
      >
        Activer
      </Button> */}


<Button
  variant="contained"
  color="success"
  fullWidth
  onClick={handleActivateBatch} // Appelle la fonction pour activer
  disabled={!selectedBatch || selectedBatch.status === "Activated"} // Désactiver si aucun lot ou si déjà activé
>
  Activer
</Button>

    </CardActions>
  </Card>
</Grid>





{/* Carte pour envoyer les reçus à l'impression */}


<Grid item xs={12} md={4}>
  <Card sx={{ backgroundColor: '#fffde7' }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold">Envoyer à l'Impression</Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Préparez et envoyez les reçus générés pour l'impression.
      </Typography>

      {/* Menu déroulant pour sélectionner un lot */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Sélectionnez un lot de reçus :</Typography>
        <Select
          value={selectedBatch ? selectedBatch.id : ""}
          onChange={(e) => {
            const batch = receiptBatches.find((b) => b.id === e.target.value);
            setSelectedBatch(batch);
          }}
          fullWidth
        >
          {receiptBatches.map((batch) => (
            <MenuItem key={batch.id} value={batch.id}>
              {`${batch.marketName} - Reçus ${batch.startReceipt} à ${batch.endReceipt}`}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </CardContent>

    <CardActions>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleGeneratePDF} // Génération du PDF
        disabled={!selectedBatch} // Désactivé si aucun lot n'est sélectionné
      >
        Envoyer
      </Button>
      {pdfLink && (
        <Box sx={{ mt: 2 }}>
          {pdfLink}
        </Box>
      )}
    </CardActions>
  </Card>
</Grid>




        
        
  <Grid item xs={12} md={4}>
  <Card sx={{ backgroundColor: '#e8f5e9' }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold">
        Tableau de Bord des Collectes
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Consultez un aperçu des taxes collectées pour chaque marché et collecteur.
      </Typography>
    </CardContent>
    <CardActions>
    <Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={() => navigate('/admin/marketstats')} // Navigate to the admin's stats page
>
  Voir les Statistiques des Marchés
</Button>



    </CardActions>
  </Card>
</Grid>        
  
        </Grid>

      </Paper>

    </Box>
  );
};

export default GestionRecusPage;
