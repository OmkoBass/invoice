import React, {useState, useEffect, useContext} from 'react'

//Firebase
import firebase from "../firebase";

//Ant components
import {Table, Row, Col, Button, notification} from "antd";

//Context
import {AuthContext} from "./Auth";

//Components
import PDF from "./PDF";
import ErrorResult from "./Smaller/ErrorResult";
import {nanoid} from "nanoid";

function History() {
    const {currentUser} = useContext(AuthContext);

    const [invoices, setInvoices] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(null);

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
        firebase.database().ref(`users/${currentUser.uid}/invoices`).once('value')
            .then(data => {
                if (data.val())
                    setInvoices(Object.entries(data.val()));
            })
            .then(() => setLoad(false))
            .catch(() => setError(true));
    }, [currentUser.uid]);

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

    return <div>
        {
            error
                ?
                <ErrorResult/>
                :
                <div>
                    <Table
                        bordered
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
                                        firebase.database().ref(`users/${currentUser.uid}/invoices/${selected.id}`).set(null)
                                            .then().catch(() => failNotification())
                                    );
                                    deleteNotification();

                                    //Update the table
                                    setInvoices(invoices?.filter(invoice => {
                                        selected.filter(data => data.id !== invoice.id ? invoice : null)
                                    }))
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
