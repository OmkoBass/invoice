import React, { useState } from 'react';

//antd css
import 'antd/dist/antd.css';

//Components
import Invoice from "./Components/Invoice";

//React pdf
import { Document, Page, View, Text, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';

import { Layout } from 'antd';

const { Footer } = Layout;

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 25,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'left',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Oswald'
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
    },
    bottom: {
        marginTop: 'auto',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

function App() {
    const [invoice, setInvoice] = useState(null);

    function handleInvoice(childData) {
        setInvoice(childData);
    }

    return <div>
        <Invoice returnInvoiceInfo={handleInvoice}/>
        <div>
            {invoice
            ?
                <PDFViewer style={{width: '100%', height:'100vh'}}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={[styles.section, styles.flexRow, styles.text]}>
                                <Text style={styles.title}>Faktura: {invoice.invoice}</Text>
                                <Text>Datum fakture: {invoice.dateInvoice}</Text>
                                <Text>Datum prometa: {invoice.dateTraffic}</Text>
                            </View>
                            <View style={[styles.section, styles.text]}>
                                <Text style={{marginLeft: 'auto'}}>Mesto prometa: {invoice.place}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <View style={[styles.section, styles.text]}>
                                    <Text>Od:</Text>
                                    <Text> </Text>
                                    <Text style={styles.subtitle}>{invoice.fromName}</Text>
                                    <Text> </Text>
                                    <Text>{invoice.firmName}</Text>
                                    <Text>{invoice.street}</Text>
                                    <Text>{invoice.city}</Text>
                                    <Text>{invoice.pib}</Text>
                                    <Text>{invoice.account}</Text>
                                    <Text>{invoice.email}</Text>
                                </View>
                                <View style={[styles.section, styles.text]}>
                                    <Text>Komitet:</Text>
                                    <Text> </Text>
                                    <Text style={styles.subtitle}>{invoice.toName}</Text>
                                    <Text> </Text>
                                    <Text>Adresa: {invoice.toAdress}</Text>
                                    <Text>{invoice.toCity}</Text>
                                    <Text>PIB/JMBG: {invoice.toPib}</Text>
                                </View>
                            </View>

                            <View style={[styles.section, styles.subtitle, styles.flexRow]}>
                                <View style={styles.flexCol}>
                                    <Text>VRSTA USLUGE</Text>
                                    <Text>{invoice.serviceType}</Text>
                                </View>
                                <View style={styles.flexCol}>
                                    <Text>JEDINICA</Text>
                                    <Text>{invoice.unit}</Text>
                                </View>
                                <View style={styles.flexCol}>
                                    <Text>KOLICINA</Text>
                                    <Text>{invoice.amount}</Text>
                                </View>
                                <View style={styles.flexCol}>
                                    <Text>CENA</Text>
                                    <Text>{invoice.price}</Text>
                                </View>
                                <View style={styles.flexCol}>
                                    <Text>TOTAL</Text>
                                    <Text>{invoice.total}</Text>
                                </View>
                            </View>

                            <View style={[styles.section, styles.flexRow, styles.bottom]}>
                                <Text style={styles.subtitle}>Ukupno: {invoice.total}</Text>
                                <Text style={styles.title}>{invoice.total}</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            :
            null
            }
        </div>
        <Footer style={{
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'black',
        }}>©Conmisi</Footer>
    </div>
}

export default App;
