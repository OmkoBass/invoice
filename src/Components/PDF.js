import React, { useState } from 'react'

//React pdf
import {Document, Page, View, Text, StyleSheet, Font, PDFViewer, Image} from '@react-pdf/renderer';

function PDF(props) {
    const [info, setInfo] = useState(props.info);

    const document = () => {
        return <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.flexRow, styles.text]}>
                    <Text style={styles.title}>Faktura: {info.invoice}</Text>

                    {
                        info.logo ?
                            <Image src={info.logo.file}/>
                        :
                        null
                    }
                    
                    <View style={styles.flexCol}>
                        <Text>Datum fakture:</Text>
                        <Text>{info.dateInvoice}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>Datum prometa:</Text>
                        <Text>{info.dateTraffic}</Text>
                    </View>
                </View>

                <View style={[styles.section, styles.text]}>
                    <View style={[styles.flexCol, {marginLeft: 'auto'}]}>
                        <Text>Mesto prometa:</Text>
                        <Text>{info.place}</Text>
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
                        <Text style={styles.subtitle}>{info.fromName}</Text>
                        <Text> </Text>
                        <Text>{info.firmName}</Text>
                        <Text>{info.street}</Text>
                        <Text>{info.city}</Text>
                        <Text>{info.pib}</Text>
                        <Text>{info.account}</Text>
                        <Text>{info.email}</Text>
                    </View>

                    <View style={[styles.section, styles.text]}>
                        <Text>Komitet:</Text>
                        <Text> </Text>
                        <Text style={styles.subtitle}>{info.toName}</Text>
                        <Text> </Text>
                        <Text>Adresa: {info.toAddress}</Text>
                        <Text>{info.toCity}</Text>
                        <Text>PIB/JMBG: {info.toPib}</Text>
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
                        <Text>{info.serviceType}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>JEDINICA</Text>
                        <Text>{info.unit}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>KOLICINA</Text>
                        <Text>{info.amount}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>CENA</Text>
                        <Text>{info.price}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>TOTAL</Text>
                        <Text>{info.total}</Text>
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
                    <Text style={styles.subtitle}>Ukupno: {info.total}</Text>
                    <Text style={[styles.title, styles.total]}>{info.total}</Text>
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
    }

    const styles = StyleSheet.create({
        page: {
            backgroundColor: 'white' /*#E4E4E4*/
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

    return <PDFViewer style={{width: '100%', height: '100vh'}}>
            {document()}
        </PDFViewer>
}

export default PDF;
