
// MarketStateReportPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const MarketStateReportPage = () => {
  const { marketId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  // États pour la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  // Fonction pour récupérer le reporting des paiements pour un marché
  const fetchMarketStateReport = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Début du chargement du reporting pour le marché: ${marketId}`);
      const response = await axios.get(
        `${API_URL}/api/admin/markets/state-report/${marketId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Données de reporting reçues :", response.data);
      setReportData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du reporting :", error.message);
    } finally {
      setLoading(false);
      console.log("Chargement terminé.");
    }
  };

  useEffect(() => {
    fetchMarketStateReport();
  }, [marketId]);

  if (loading) {
    console.log("Chargement des données en cours...");
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

  if (!reportData) {
    console.log("Aucune donnée de reporting disponible.");
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h5" color="error">
          Impossible de charger les données du reporting.
        </Typography>
      </Box>
    );
  }

  // Décomposition des données reçues
  // On s'attend à recevoir marketName, collector, summary et payments
  const { marketName, collector, summary, payments } = reportData;
  console.log("Affichage de la page de reporting avec les données suivantes :");
  console.log("Market Name :", marketName);
  console.log("Collecteur :", collector);
  console.log("Résumé :", summary);
  console.log("Liste des paiements :", payments);

  // Gestion de la pagination
  const handleChangePage = (event, newPage) => {
    console.log("Changement de page vers :", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("Changement du nombre de lignes par page :", event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Découper la liste des paiements en fonction de la page et du nombre de lignes par page
  const paginatedPayments = payments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 4, mt: 17 }}>
      <Typography variant="h4" gutterBottom>
        Reporting des paiements pour le marché {marketName}
      </Typography>

      {/* Section Collecteur */}
      <Box sx={{ mb: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" color="textSecondary">
          Informations du Collecteur
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Nom : </strong>
          {collector && collector.name ? collector.name : "N/A"}
        </Typography>
        <Typography variant="body1">
          <strong>Contact : </strong>
          {collector && collector.phone ? collector.phone : "N/A"}
        </Typography>
      </Box>

      {/* Section Résumé */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Total des Paiements
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {summary.totalPayments.toLocaleString()} FCFA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Nombre de Paiements
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {summary.paymentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                Dernier Paiement
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {new Date(summary.lastPaymentDate).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Section Détails des Paiements */}
      <Typography variant="h5" gutterBottom>
        Détails des paiements
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro de Reçu</TableCell>
              <TableCell>Code de Confirmation</TableCell>
              <TableCell>Montant (FCFA)</TableCell>
              <TableCell>Date du Paiement</TableCell>
              <TableCell>Collecteur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.receipt}</TableCell>
                <TableCell>{payment.confirmationCode}</TableCell>
                <TableCell>{payment.amount.toLocaleString()}</TableCell>
                <TableCell>
                  {new Date(payment.paymentDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {payment.collector && payment.collector.name
                    ? payment.collector.name
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Composant de Pagination */}
      <TablePagination
        component="div"
        count={payments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default MarketStateReportPage;
