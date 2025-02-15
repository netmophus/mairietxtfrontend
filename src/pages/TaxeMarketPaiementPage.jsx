import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const TaxeMarketPaiementPage = () => {
  const { marketId } = useParams(); // Récupérer l'ID du marché sélectionné
  const [activeReceipts, setActiveReceipts] = useState([]); // Reçus activés
  const [currentReceiptIndex, setCurrentReceiptIndex] = useState(0); // Index du reçu en cours
  const [confirmationCode, setConfirmationCode] = useState(""); // Code de confirmation saisi
  const [isValidCode, setIsValidCode] = useState(false); // État pour la validation du code
  const [loading, setLoading] = useState(true); // Chargement des reçus
  const [successMessage, setSuccessMessage] = useState("");
  const [amountPaid, setAmountPaid] = useState(""); // Initialiser amountPaid avec useState
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App




  // Fonction pour récupérer les reçus activés
  const fetchActiveReceipts = async () => {
    try {
      console.log("📥 Marché sélectionné avec ID :", marketId);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ Aucun token trouvé dans le stockage local.");
        alert("Veuillez vous connecter.");
        return;
      }

      console.log("🔍 Envoi de la requête pour les reçus activés...");
      const response = await axios.get(
        `${API_URL}/api/receipt-batches/${marketId}/activated`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Réponse API reçue :", response.data);

      if (response.data && response.data.receipts) {
        console.log("📋 Reçus activés :", response.data.receipts);
        setActiveReceipts(response.data.receipts);

        // Passer au premier reçu activé
        const firstActivatedIndex = response.data.receipts.findIndex((receipt) =>
          receipt.confirmationCodes.some((code) => code.status === "Activated")
        );

        if (firstActivatedIndex !== -1) {
          setCurrentReceiptIndex(firstActivatedIndex);
        }
      } else {
        console.warn("⚠️ Aucune donnée de reçus activés trouvée.");
        setActiveReceipts([]);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des reçus activés :", error.message);
      alert("Impossible de récupérer les reçus activés.");
    } finally {
      setLoading(false);
    }
  };





  // Charger les reçus activés au montage du composant
  useEffect(() => {
    fetchActiveReceipts();
  }, [marketId]);

  // Fonction pour valider le code de confirmation
  const handleValidateCode = () => {
    const currentConfirmationCode = currentReceipt.confirmationCodes[currentReceiptIndex];

    if (!currentConfirmationCode) {
      console.error("❌ Code de confirmation introuvable pour ce reçu.");
      alert("Code de confirmation introuvable pour ce reçu.");
      return;
    }

    console.log("🔍 Code saisi :", confirmationCode);
    console.log("✅ Code attendu :", currentConfirmationCode.code);

    if (confirmationCode === currentConfirmationCode.code) {
      console.log("🎉 Code de confirmation validé !");
      setIsValidCode(true);
      setSuccessMessage("Code validé avec succès !");
    } else {
      console.warn("⚠️ Code de confirmation incorrect.");
      alert("Code de confirmation incorrect. Veuillez réessayer.");
      setIsValidCode(false);
    }
  };

  // Fonction pour soumettre le paiement


const handlePaymentSubmit = async () => {
  console.log("Début du processus de paiement.");

  // Vérification de l'existence des reçus actifs
  if (!activeReceipts || activeReceipts.length === 0) {
    console.error("Aucun reçu disponible dans activeReceipts.");
    alert("Aucun reçu disponible.");
    return;
  }

  console.log("Liste des reçus disponibles:", activeReceipts);

  // Vérification de la validité de l'indice actuel
  if (currentReceiptIndex < 0 || currentReceiptIndex >= activeReceipts.length) {
    console.error(
      `Index invalide: ${currentReceiptIndex} (Taille de la liste: ${activeReceipts.length})`
    );
    alert("Erreur d'index. Veuillez rafraîchir la page.");
    return;
  }

  const currentReceipt = activeReceipts[currentReceiptIndex];
  console.log(`Reçu actuel [Index ${currentReceiptIndex}]:`, currentReceipt);

  // Validation des données du reçu
  if (
    !currentReceipt ||
    !currentReceipt.confirmationCodes ||
    !currentReceipt.confirmationCodes[currentReceiptIndex]
  ) {
    console.error("Données invalides pour currentReceipt ou confirmationCodes.");
    alert("Une erreur est survenue. Veuillez vérifier vos données.");
    return;
  }

  console.log("Données envoyées pour le paiement:", {
    receiptId: currentReceipt.confirmationCodes[currentReceiptIndex]?.receipt,
    confirmationCode,
    amountPaid: Number(amountPaid),
  });

  try {
    const response = await axios.post(
      `${API_URL}/api/payments/taxmarket`,
      {
        receiptId: currentReceipt.confirmationCodes[currentReceiptIndex]?.receipt,
        confirmationCode,
        amountPaid: Number(amountPaid),
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    console.log("Réponse après paiement:", response.data);
    alert("Paiement enregistré avec succès!");

    // Réinitialisation des champs après le paiement
    setConfirmationCode("");
    setAmountPaid("");
    setIsValidCode(false);

    // Rafraîchir les reçus activés pour obtenir les dernières mises à jour
    await fetchActiveReceipts();
    console.log("Reçus après rafraîchissement:", activeReceipts);

    // Recherche du prochain reçu activé parmi tous les reçus
    const activatedReceipts = activeReceipts
      .map((receipt, index) => ({ index, receipt }))
      .filter(
        ({ receipt }) =>
          receipt.confirmationCodes &&
          receipt.confirmationCodes.some((code) => code.status === "Activated")
      );

    if (activatedReceipts.length > 0) {
      // Chercher un reçu activé dont l'indice est supérieur à currentReceiptIndex
      const nextReceipt = activatedReceipts.find(
        ({ index }) => index > currentReceiptIndex
      );

      if (nextReceipt) {
        console.log(`Passage au reçu suivant : Index ${nextReceipt.index}`);
        setCurrentReceiptIndex(nextReceipt.index);
      } else {
        // Si aucun reçu avec un indice supérieur, on passe au premier reçu activé
        console.log(
          `Reçu activé trouvé mais aucun indice supérieur. Passage au premier reçu activé : Index ${activatedReceipts[0].index}`
        );
        setCurrentReceiptIndex(activatedReceipts[0].index);
      }
    } else {
      console.log("Tous les reçus activés ont été utilisés.");
      alert("Tous les reçus ont été utilisés !");
      navigate(`/collector/taxemarket/${marketId}`);
    }
  } catch (error) {
    console.error("Erreur lors du paiement:", error.message);
    alert("Erreur lors de l'enregistrement du paiement.");
  }
};












useEffect(() => {
  if (!loading && activeReceipts.length === 0) {
    alert("Tous les reçus ont été utilisés !");
    navigate("/collector-dashboard");
  }
}, [loading, activeReceipts, navigate]);





  // Si les reçus sont en cours de chargement
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

  // Si aucun reçu n'est activé
  if (activeReceipts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold">
          Aucun reçu activé disponible pour ce marché.
        </Typography>
      </Box>
    );
  }

  // Reçu actuel
  const currentReceipt = activeReceipts[currentReceiptIndex];

  return (
    <Box sx={{ p: 3, maxWidth: "600px", margin: "auto", mt: 20 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Paiement des Taxes
      </Typography>
  
      {activeReceipts.length === 0 ? (
  <Box sx={{ textAlign: "center" }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Tous les reçus ont été utilisés !
    </Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 3 }}
      onClick={() => navigate("/collector-dashboard")}
    >
      Retour au Tableau de Bord
    </Button>
  </Box>
      ) : currentReceipt ? (
        // Affichage du formulaire de paiement si des reçus sont encore disponibles
        <>
          <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Marché : {currentReceipt.market.name}
            </Typography>
            <Typography variant="body1">
              Numéro de reçu : {currentReceipt.confirmationCodes[currentReceiptIndex].receipt}
            </Typography>
            <Typography variant="body1">
              Montant attendu : {currentReceipt.amount || "500 FCFA"}
            </Typography>
          </Paper>
  
          <TextField
            label="Code de confirmation"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleValidateCode}
            disabled={!confirmationCode}
          >
            Valider le code
          </Button>
  
          {isValidCode && (
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Montant payé"
                type="number"
                value={amountPaid} // Lié à l'état amountPaid
                onChange={(e) => setAmountPaid(e.target.value)} // Met à jour l'état
                fullWidth
                sx={{ mb: 2 }}
              />
  
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handlePaymentSubmit}
                disabled={!amountPaid}
              >
                Enregistrer le paiement
              </Button>
            </Box>
          )}
  
          {successMessage && (
            <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
              {successMessage}
            </Typography>
          )}
        </>
      ) : (
        // Si aucun reçu activé n'est trouvé
        <Typography variant="body1" color="textSecondary">
          Aucun reçu activé trouvé pour ce marché.
        </Typography>
      )}
    </Box>
  );
  
};

export default TaxeMarketPaiementPage;




