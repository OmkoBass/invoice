import React, {useState, useEffect, useContext} from 'react'

//Firebase
import firebase from "../firebase";

//Ant components
import {Table, Row, Col, Button, notification, Typography, Divider} from "antd";

//Context
import {AuthContext} from "./Auth";

//Components
import PDF from "./PDF";
import ErrorResult from "./Smaller/ErrorResult";

function History() {
    const {currentUser} = useContext(AuthContext);

    const [invoices, setInvoices] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const defaultPageSize = 25;

    const columns = [
        {
            title: 'ID fakture',
            dataIndex: 'id'
        },
        {
            title: 'Faktura',
            dataIndex: 'invoice'
        },
        {
            title: 'Kome',
            dataIndex: 'toName'
        },
        {
            title: 'Adresa',
            dataIndex: 'toAddress'
        },
        {
            title: 'Datum izdavanja',
            dataIndex: 'dateCreated'
        }
    ];

    useEffect(() => {
        firebase.database().ref(`users/${currentUser.email.replace('.', 'DOT')}/invoices`)
            .orderByChild('dateCreated').limitToLast(pageNumber * defaultPageSize).once('value')
            .then(data => {
                if(data.val())
                    setInvoices(Object.entries(data.val()));
            }).then(() => {
                setLoad(false);
        }).catch(() => setError(true));
    }, [defaultPageSize, currentUser.email, pageNumber]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => setSelected(selectedRows)
    };

    const failNotification = () => {
        notification.error({
            message: 'Greška!',
            description: 'Došlo je do greške pri čuvanju fakture.'
        });
    }

    const deleteNotification = () => {
        notification.success({
            message: 'Uspešno!',
        })
    }

    return <div style={{minHeight: '80vh'}}>
        <Typography>
            <Typography.Title>Istorija</Typography.Title>
            <Typography.Paragraph> Ovde mozete videti istoriju vaših faktura. </Typography.Paragraph>
        </Typography>
        <Divider/>
        <div>
            {
                error
                    ?
                    <ErrorResult/>
                    :
                    <div>
                        <Table
                            bordered
                            onChange={pagination => {
                                if(pagination.current >= pageNumber * defaultPageSize) {
                                    setPageNumber(pageNumber + 1);
                                }
                            }}
                            pagination={{defaultPageSize: defaultPageSize - 1}}
                            rowSelection={rowSelection}
                            loading={load}
                            columns={columns}
                            /*onRow={(record) => {
                                return {
                                    onClick: _ => setPdfData(record)
                                }
                            }}*/
                            dataSource={invoices?.map((invoice, index) => {
                                return {
                                    ...invoice[1],
                                    key: index,
                                    id: invoice[0]
                                }
                            })}/>

                        <Row gutter={12} style={{margin: '1em 0 1em 0'}}>
                            <Col>
                                <Button
                                    onClick={() => setPdfData(selected[0])}
                                    type='primary'
                                    disabled={selected?.length === 1 ? false : true}
                                >
                                    Prikaži
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => {
                                        //Delete from firebase
                                        selected.filter(selected =>
                                            firebase.database().ref(`users/${currentUser.email.replace('.', 'DOT')}/invoices/${selected.id}`).set(null)
                                                .then().catch(() => failNotification())
                                        );
                                        deleteNotification();

                                        //Updating state
                                        setInvoices(invoices.filter(invoice => selected.find(select => select.id !== invoice[0])));
                                    }}
                                    type='primary'
                                    danger
                                    disabled={selected?.length > 0 ? false : true}
                                >
                                    Izbriši
                                </Button>
                            </Col>
                        </Row>
                    </div>
            }
        </div>

        {
            pdfData
                ?
                <PDF /*image={img}*/ info={pdfData} style={{height: '100vh', width: '100%'}}/>
                :
                null
        }
    </div>
}

export default History;
