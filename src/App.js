import React, { useState } from 'react';

//antd css
import 'antd/dist/antd.css';

//Components
import Invoice from "./Components/Invoice";

//React pdf
import {Document, Text, View, Page, StyleSheet, PDFViewer, Canvas} from '@react-pdf/renderer';

import { Layout } from 'antd';

const { Footer } = Layout;

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

function App() {
    const [invoice, setInvoice] = useState(null);

    function handleInvoice(childData) {
        setInvoice(childData);
    }

    return <div>
        <Invoice returnInvoiceInfo={handleInvoice}/>
        <div>
            <PDFViewer style={{width: '100%', height:'100vh'}}>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>{invoice ? invoice.account : null}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>{invoice ? invoice.dateInvoice : null}</Text>
                            <Text>{invoice ? invoice.dateTraffic : null}</Text>
                            <Text>{invoice ? invoice.place : null}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>{invoice ? invoice.fromName : null}</Text>
                            <Text>{invoice ? invoice.firmName : null}</Text>
                            <Text>{invoice ? invoice.street : null}</Text>
                            <Text>{invoice ? invoice.city : null}</Text>
                            <Text>{invoice ? invoice.pib : null}</Text>
                            <Text>{invoice ? invoice.account : null}</Text>
                            <Text>{invoice ? invoice.email : null}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>{invoice ? invoice.toName : null}</Text>
                            <Text>{invoice ? invoice.toAdress : null}</Text>
                            <Text>{invoice ? invoice.toCity : null}</Text>
                            <Text>{invoice ? invoice.toPib : null}</Text>
                        </View>
                        <View>
                            <Text>{invoice ? invoice.serviceType : null}</Text>
                            <Text>{invoice ? invoice.unit : null}</Text>
                            <Text>{invoice ? invoice.amount : null}</Text>
                            <Text>{invoice ? invoice.price : null}</Text>
                            <Text>{invoice ? invoice.total : null}</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
        <Footer style={{
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'black',
        }}>©Conmisi</Footer>
    </div>
}

export default App;
