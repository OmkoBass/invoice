import React from 'react'

//React pdf
import {Document, Page, View, Text, StyleSheet, Font, PDFViewer, Image} from '@react-pdf/renderer';

//Moment
import moment from "moment";

function PDF(props) {
    const styles = StyleSheet.create({
        articles: {
            fontSize: 12,
            fontFamily: 'Times-Roman',
            fontWeight: 'bold'
        },
        page: {
            backgroundColor: 'white' /*#E4E4E4*/
        },
        section: {
            margin: 6,
            padding: 12,
        },
        miniSection: {
            margin: 6,
            padding: 6,
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
            backgroundColor: 'dimgray',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 'bold',
        }
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const blackLine = () => {
        return <View
            style={{
                margin: '0 10 0 10',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
    }

    const blackLineMargin = () => {
        return <View
            style={{
                margin: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
    }

    let TOTAL = 0;

    for(let i = 0; i < props.info[0].services.length; i++)
        TOTAL += parseInt(props.info[0].services[i].total, 10);

    // IT CAN BE DONE WITHOUT THIS COUNTER VARIABLE BUT I FORGOT HOW
    // WILL REFACTOR
    let counter = -1;

    const services = props.info[0].services.map(service => {
        return <View key={++counter}>
            <View style={[styles.miniSection, styles.flexRow, styles.articles]}>
                <View style={[styles.flexCol]}>
                    <Text>VRSTA USLUGE</Text>
                    <Text>{service.serviceType}</Text>
                </View>
                <View style={styles.flexCol}>
                    <Text>JEDINICA</Text>
                    <Text>{service.unit}</Text>
                </View>
                <View style={styles.flexCol}>
                    <Text>KOLICINA</Text>
                    <Text>{service.amount}</Text>
                </View>
                <View style={styles.flexCol}>
                    <Text>CENA</Text>
                    <Text>{service.price}</Text>
                </View>
                <View style={styles.flexCol}>
                    <Text>TOTAL</Text>
                    <Text>{service.total}</Text>
                </View>
            </View>
            {blackLine()}
        </View>
    });

    const document = () => {
        return <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.flexRow, styles.text]}>
                    <View style={[styles.flexCol]}>
                        <Text style={styles.title}>Faktura: {props.info[0].invoice}</Text>
                        {
                            props.info[1]
                                ?
                                <Image
                                    style={
                                        {
                                            position: 'absolute',
                                            top: '40px',
                                            height: '100px',
                                            width: '100px',
                                        }
                                    }
                                    src={URL.createObjectURL(props.info[1])}/>
                                :
                                null
                        }
                    </View>

                    <View style={styles.flexCol}>
                        <Text>Datum fakture:</Text>
                        <Text>{moment(props.info[0].dateInvoice).format('DD.MM.YYYY')}</Text>
                    </View>
                    <View style={styles.flexCol}>
                        <Text>Datum prometa:</Text>
                        <Text>{moment(props.info[0].dateTraffic).format('DD.MM.YYYY')}</Text>
                    </View>
                </View>

                <View style={[styles.section, styles.text]}>
                    <View style={[styles.flexCol, {marginLeft: 'auto'}]}>
                        <Text>Mesto prometa:</Text>
                        <Text>{props.info[0].place}</Text>
                    </View>
                </View>

                {blackLineMargin()}

                <View style={styles.flexRow}>
                    <View style={[styles.section, styles.text]}>
                        <Text>Od:</Text>
                        <Text> </Text>
                        <Text style={styles.subtitle}>{props.info[0].fromName}</Text>
                        <Text> </Text>
                        <Text>{props.info[0].firmName}</Text>
                        <Text>{props.info[0].street}</Text>
                        <Text>{props.info[0].city}</Text>
                        <Text>{props.info[0].pib}</Text>
                        <Text>{props.info[0].account}</Text>
                        <Text>{props.info[0].email}</Text>
                    </View>

                    <View style={[styles.section, styles.text]}>
                        <Text>Komitet:</Text>
                        <Text> </Text>
                        <Text style={styles.subtitle}>{props.info[0].toName}</Text>
                        <Text> </Text>
                        <Text>Adresa: {props.info[0].toAddress}</Text>
                        <Text>{props.info[0].toCity}</Text>
                        <Text>PIB/JMBG: {props.info[0].toPib}</Text>
                    </View>
                </View>

                {blackLine()}

                {services}

                {blackLine()}

                <View style={[styles.section, styles.flexRow, styles.bottom]}>
                    <Text style={styles.subtitle}>Ukupno: {TOTAL}</Text>
                    <Text style={[styles.title, styles.total]}>{TOTAL}</Text>
                </View>

                {blackLine()}
            </Page>
        </Document>
    }

    return <PDFViewer className='pdfviewer'>
            {document()}
        </PDFViewer>
}

export default PDF;
