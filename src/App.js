import React, { useState } from 'react';

//antd css
import 'antd/dist/antd.css';

//Components
import Invoice from "./Components/Invoice";

//React pdf
import { Document, Page, View, Text, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';

//antd
import { Layout, Row, Col, Typography, Avatar } from 'antd';

//img
import skyon from './Assets/Skayon_logo_dark.png'
import conmisi from './Assets/conmisi.png';
import ictdc from './Assets/ictdc.png'

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
        fontFamily: 'Times-Roman',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Times-Roman',
        fontWeight: 'bold'
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
    },
    total: {
        width: '200px',
        height: '100px',
        backgroundColor: 'gray',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
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
                                <View style={styles.flexCol}>
                                    <Text>Datum fakture:</Text>
                                    <Text>{invoice.dateInvoice}</Text>
                                </View>
                                <View style={styles.flexCol}>
                                    <Text>Datum prometa:</Text>
                                    <Text>{invoice.dateTraffic}</Text>
                                </View>
                            </View>

                            <View style={[styles.section, styles.text]}>
                                <View style={[styles.flexCol, {marginLeft: 'auto'}]}>
                                    <Text>Mesto prometa:</Text>
                                    <Text>{invoice.place}</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    margin: 10,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

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
                                    <Text>Adresa: {invoice.toAddress}</Text>
                                    <Text>{invoice.toCity}</Text>
                                    <Text>PIB/JMBG: {invoice.toPib}</Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    margin: 10,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

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

                            <View
                                style={{
                                    margin: 10,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />

                            <View style={[styles.section, styles.flexRow, styles.bottom]}>
                                <Text style={styles.subtitle}>Ukupno: {invoice.total}</Text>
                                <Text style={[styles.title, styles.total]}>{invoice.total}</Text>
                            </View>

                            <View
                                style={{
                                    margin: 10,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            />
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
        }}>
            <Row justify='space-between'>
                <Col span={12}>
                    <Typography.Title level={3} style={{color: 'white'}}> O nama </Typography.Title>
                </Col>
                <Col span={12}>
                    <Typography.Title level={3} style={{color: 'white'}}> Dodatno </Typography.Title>
                </Col>
            </Row>
            <Row justify='space-between'>
                <Col span={12}>
                    Nas tim
                </Col>
                <Col span={12}>
                    <Col span={24}>
                        <a href='https://skayon.agency/'>
                            <Avatar src={skyon} shape='square' style={{width: '50%', height: '25%'}} alt='skyon logo'/>
                        </a>
                    </Col>
                    <Col span={24} style={{marginTop: '2em'}}>
                        <a href='https://conmisi.com/'>
                            <Avatar src={conmisi} shape='square' style={{width: '50%', height: '25%'}} alt='conmisi logo'/>
                        </a>
                    </Col>
                    <Col span={24} style={{marginTop: '2em'}}>
                        <a href='https://ictdc.rs/'>
                            <Avatar src={ictdc} shape='square' style={{width: '50%', height: '25%'}} alt='conmisi logo'/>
                        </a>
                    </Col>
                </Col>
            </Row>
        </Footer>
    </div>
}

export default App;
