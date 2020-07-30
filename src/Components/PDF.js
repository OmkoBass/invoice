import React from 'react'

//React pdf
import {Document, Page, View, Text, StyleSheet, Font, PDFViewer, Image} from '@react-pdf/renderer';

//Moment
import moment from "moment";

//Poppins
import Poppins from '../Fonts/Poppins/Poppins-Regular.ttf';

function PDF(props) {
    // Register font
    Font.register({ family: 'Poppins', src: Poppins });

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
        text: {
            margin: 12,
            fontSize: 12,
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

    const seperatorMargin = () => {
        return <View
            style={{
                margin: 10,
                borderBottomColor: '#e7e7e7',
                borderBottomWidth: 1,
            }}
        />
    }

    let TOTAL = 0;

    for (let i = 0; i < props.info[0].services.length; i++)
        TOTAL += parseInt(props.info[0].services[i].total, 10);

    // IT CAN BE DONE WITHOUT THIS COUNTER VARIABLE BUT I FORGOT HOW
    // WILL REFACTOR
    const services = props.info[0].services.map((service, index) => {
        return <View key={index}>
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
                <View style={[styles.section, styles.flexRow, styles.text]}>
                    <View style={[styles.flexCol]}>
                        <Text style={[styles.title, styles.skyBlue]}>Faktura: {props.info[0].invoice}</Text>
                        {
                            props.info[1]
                                ?
                                <Image
                                    style={
                                        {
                                            position: 'absolute',
                                            top: '30px',
                                            height: '80px',
                                            width: '80px',
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

                {seperatorMargin()}

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

                {seperator()}

                <View style={[styles.section, styles.flexRow, styles.articles]}>
                    <View style={[styles.cell]}>
                        <Text>VRSTA USLUGE</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>JEDINICA</Text>
                    </View>

                    <View style={[styles.cell]}>
                        <Text>KOLICINA</Text>
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

                <View style={[styles.section, styles.flexRow, styles.bottom]}>
                    <Text style={styles.subtitle}>Ukupno: {`${TOTAL ? TOTAL : 0}RSD`}</Text>
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
