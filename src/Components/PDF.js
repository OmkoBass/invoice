import React from 'react'

//React pdf
import {Document, Page, View, Text, StyleSheet, Font, PDFViewer, Image} from '@react-pdf/renderer';

//Moment
import moment from "moment";

//Poppins
import Poppins from '../Fonts/Poppins/Poppins-Regular.ttf';

function PDF(props) {
    // Register font
    Font.register({family: 'Poppins', src: Poppins});

    console.log(props);

    const styles = StyleSheet.create({
        skyBlue: {
            color: '#37a3c7'
        },
        articles: {
            fontSize: 8,
            fontWeight: 'bold'
        },
        page: {
            fontFamily: 'Poppins',
            backgroundColor: 'white' /*#E4E4E4*/
        },
        section: {
            margin: 2,
            padding: 6,
        },
        flexRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'left',
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        subtitle: {
            fontSize: 12,
            fontWeight: 'bold'
        },
        headerText: {
            fontSize: 12,
        },
        text: {
            margin: 12,
            fontSize: 8,
            textAlign: 'justify',
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
            width: '160px',
            height: '60px',
            backgroundColor: '#e7e7e7',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
        },
        cell: {
            flexBasis: '22%',
            textAlign: 'left'
        }
    });

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const seperator = () => {
        return <View
            style={{
                margin: '0 10 0 10',
                borderBottomColor: '#e7e7e7',
                borderBottomWidth: 1,
            }}
        />
    }

    let TOTAL = 0;

    for (let i = 0; i < props.info.services.length; i++)
        TOTAL += parseInt(props.info.services[i].total, 10);

    // IT CAN BE DONE WITHOUT THIS COUNTER VARIABLE BUT I FORGOT HOW
    // WILL REFACTOR
    const services = props.info.services.map((service, index) => {
        return <View key={index} wrap={false}>
            <View style={[styles.section, styles.flexRow, styles.articles]}>
                <View style={[styles.cell]}>
                    <Text>{service.serviceType}</Text>
                </View>

                <View style={[styles.cell]}>
                    <Text>{service.unit}</Text>
                </View>

                <View style={[styles.cell]}>
                    <Text>{service.amount}</Text>
                </View>

                <View style={[styles.cell]}>
                    <Text>{service.price}</Text>
                </View>

                <View style={[styles.cell]}>
                    <Text>{service.total}</Text>
                </View>
            </View>
            {seperator()}
        </View>
    });

    const document = () => {
        return <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.flexRow, styles.headerText]}>
                    <View style={[styles.flexCol]}>
                        <Text style={[styles.title, styles.skyBlue]}>Faktura: {props.info.invoice}</Text>
                        {
                            props.info.img
                                ?
                                <Image
                                    style={
                                        {
                                            position: 'absolute',
                                            top: '25px',
                                            height: '100px',
                                            width: '100px',
                                        }
                                    }
                                    src={URL.createObjectURL(props.info.img)}/>
                                :
                                null
                        }
                    </View>

                    <View style={styles.flexCol}>
                        <Text>Datum fakture:</Text>
                        {
                            props.info.id
                                ?
                                <Text>{moment(props.info.dateInvoice, 'DD.MM.YYYY').format('DD.MM.YYYY')}</Text>
                                :
                                <Text>{moment(props.info.dateInvoice).format('DD.MM.YYYY')}</Text>
                        }
                    </View>
                    <View style={styles.flexCol}>
                        <Text>Datum prometa:</Text>
                        {
                            props.info.id
                                ?
                                <Text>{moment(props.info.dateTraffic, 'DD.MM.YYYY').format('DD.MM.YYYY')}</Text>
                                :
                                <Text>{moment(props.info.dateTraffic).format('DD.MM.YYYY')}</Text>
                        }
                    </View>
                </View>

                <View style={[styles.section, styles.headerText]}>
                    <View style={[styles.flexCol, {marginLeft: 'auto'}]}>
                        <Text>Mesto prometa:</Text>
                        <Text>{props.info.place}</Text>
                    </View>
                </View>

                <View style={{marginTop: '25px'}}>
                    {seperator()}
                </View>

                <View style={styles.flexRow}>
                    <View style={[styles.section, styles.text]}>
                        <Text>Od:</Text>
                        <Text> </Text>
                        <Text style={styles.subtitle}>{props.info.fromName}</Text>
                        <Text> </Text>
                        <Text>{props.info.firmName}</Text>
                        <Text>{props.info.street}</Text>
                        <Text>{props.info.city}</Text>
                        <Text>{props.info.pib}</Text>
                        <Text>{props.info.account}</Text>
                        <Text>{props.info.email}</Text>
                    </View>

                    <View style={[styles.section, styles.text]}>
                        <Text>Komitet:</Text>
                        <Text> </Text>
                        <Text style={styles.subtitle}>{props.info.toName}</Text>
                        <Text> </Text>
                        <Text>Adresa: {props.info.toAddress}</Text>
                        <Text>{props.info.toCity}</Text>
                        <Text>PIB/JMBG: {props.info.toPib}</Text>
                    </View>
                </View>

                {seperator()}

                <View style={[styles.section, styles.flexRow, styles.articles]}>
                    <View style={[styles.cell]}>
                        <Text>VRSTA USLUGE</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>JEDINICA</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>KOLIČINA</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>CENA</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>TOTAL</Text>
                    </View>
                </View>

                {seperator()}

                {services}

                {seperator()}

                <View style={[styles.section, styles.flexRow, styles.bottom]} wrap={false}>
                    <View style={[styles.flexCol]}>
                        <Text style={styles.subtitle}>Ukupno: {`${TOTAL ? TOTAL : 0}RSD`}</Text>
                        <Text style={styles.subtitle}>Broj: {props.info.services.length}</Text>
                    </View>
                    <Text style={[styles.title, styles.total]}>{`${TOTAL ? TOTAL : 0}RSD`}</Text>
                </View>

                {seperator()}
            </Page>
        </Document>
    }

    return <PDFViewer className='pdfviewer'>
        {document()}
    </PDFViewer>
}

export default PDF;
