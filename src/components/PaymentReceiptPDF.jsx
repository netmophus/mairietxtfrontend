// PaymentReceiptPDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import logo from '../assets/images/logoville.jpeg';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 'auto',
    marginBottom: 10,
    alignSelf: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    flex: 1,
    padding: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 10,
  },
  qrCodeImage: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
});

const PaymentReceiptPDF = ({ paymentDetails }) => {
  const [qrCodeDataUri, setQrCodeDataUri] = React.useState(null);

  React.useEffect(() => {
    console.log('PaymentReceiptPDF - paymentDetails reçu:', paymentDetails);
    const generateQrCode = async () => {
      try {
        const qrData = JSON.stringify({
          taxpayer: paymentDetails?.taxpayer?.name || 'N/A',
          tax: paymentDetails?.tax?.name || 'N/A',
          amountPaid: paymentDetails?.amountPaid || 'N/A',
          totalPaid: paymentDetails?.totalPaid || 'N/A',
          remainingAmount: paymentDetails?.remainingAmount || 'N/A',
          paymentDate: paymentDetails?.paymentDate
            ? new Date(paymentDetails.paymentDate).toLocaleDateString()
            : 'Date non renseignée',
          dueDate: paymentDetails?.dueDate
            ? new Date(paymentDetails.dueDate).toLocaleDateString()
            : 'Date non renseignée',
        });
        console.log('PaymentReceiptPDF - QR Data:', qrData);
        const qrCode = await QRCode.toDataURL(qrData);
        setQrCodeDataUri(qrCode);
        console.log('PaymentReceiptPDF - QR Code généré');
      } catch (error) {
        console.error('Erreur lors de la génération du QR code:', error);
      }
    };

    if (paymentDetails) {
      generateQrCode();
    }
  }, [paymentDetails]);

  return (
    <Document>
      <Page style={styles.page}>
        {/* Logo */}
        <Image src={logo} style={styles.logo} />
        <View style={styles.header}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Reçu de Paiement de Taxe
          </Text>
          <Text style={styles.header}>
  Date : {paymentDetails?.paymentDate 
           ? new Date(paymentDetails.paymentDate).toLocaleDateString() 
           : new Date().toLocaleDateString()}
</Text>
        </View>

        {/* Tableau des informations */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Détail</Text>
            <Text style={styles.tableCol}>Valeur</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Contribuable</Text>
            <Text style={styles.tableCol}>
            {paymentDetails?.taxpayer?.user?.name || 'N/A'}
          </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Taxe</Text>
            <Text style={styles.tableCol}>
              {paymentDetails?.tax?.name || 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Montant Total</Text>
         

{/* <Text style={styles.tableCol}>
  {paymentDetails?.tax?.amount
    ? paymentDetails.tax.amount + ' FCFA'
    : (paymentDetails?.tax?.supportRates?.default && paymentDetails?.surface
         ? (paymentDetails.tax.supportRates.default * paymentDetails.surface) + ' FCFA'
         : 'N/A')}
</Text> */}



<Text style={styles.tableCol}>
  {paymentDetails?.tax?.amount 
    ? paymentDetails.tax.amount + ' FCFA'
    : paymentDetails?.totalAmount 
      ? paymentDetails.totalAmount + ' FCFA'
      : 'N/A'}
</Text>



          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Montant Payé</Text>
            <Text style={styles.tableCol}>
              {paymentDetails?.amountPaid
                ? paymentDetails.amountPaid + ' FCFA'
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Montant Cumulé Payé</Text>
            <Text style={styles.tableCol}>
              {paymentDetails?.totalPaid
                ? paymentDetails.totalPaid + ' FCFA'
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Montant Restant</Text>
            <Text style={styles.tableCol}>
              {paymentDetails?.remainingAmount !== undefined
                ? paymentDetails.remainingAmount + ' FCFA'
                : 'Aucun'}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Date d'Échéance</Text>
            <Text style={styles.tableCol}>
              {paymentDetails?.dueDate
                ? new Date(paymentDetails.dueDate).toLocaleDateString()
                : 'Date non renseignée'}
            </Text>
          </View>
        </View>

        {/* QR Code */}
        {qrCodeDataUri && <Image src={qrCodeDataUri} style={styles.qrCodeImage} />}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Collecteur : {paymentDetails?.collector?.name || 'N/A'}
          </Text>
          <Text>Merci pour votre paiement</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentReceiptPDF;
