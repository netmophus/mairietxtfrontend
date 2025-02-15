import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../assets/images/logoville.jpeg"; // Importez le logo depuis le répertoire local

// Styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, flexDirection: "column" },
  receiptContainer: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #000",
    borderRadius: 5,
  },
  header: { textAlign: "center", marginBottom: 10 },
  section: { marginBottom: 5 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  logo: { width: 50, height: 50, marginBottom: 10, alignSelf: "center" }, // Style du logo
});

// Composant PDF
const ReceiptPDF = ({ receipts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Mairie de {receipts[0]?.communeName || "Votre Commune"}</Text>
      <Text style={styles.title}>Reçus Officiels</Text>
      {receipts.map((receipt, index) => (
        <View key={index} style={styles.receiptContainer}>
          {/* Affichage du logo */}
          <Image src={logo} style={styles.logo} />
          <Text style={styles.section}>Reçu N° : {receipt.number}</Text>
          <Text style={styles.section}>Taxe : {receipt.taxNumber}</Text>
          <Text style={styles.section}>Code de confirmation : {receipt.confirmationCode}</Text>
          <Text style={styles.section}>Montant : {receipt.amount}</Text>
          <Text style={styles.section}>Collecteur : {receipt.collectorName}</Text>
          <Text style={styles.section}>Date : {receipt.paymentDate}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ReceiptPDF;
