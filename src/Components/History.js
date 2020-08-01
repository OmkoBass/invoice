import React, {useState, useEffect, useContext} from 'react'

//Firebase
import firebase from "../firebase";

//Ant components
import {Table, Row, Col, Button} from "antd";

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
                setInvoices(Object.entries(data.val()));
            })
            .then(() => setLoad(false))
            .catch(() => setError(true));
    }, [currentUser.uid]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => setSelected(selectedRows)
    };

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return <div>
        {
            error
                ?
                <ErrorResult/>
                :
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
        }
        {
            pdfData
                ?
                <PDF /*image={img}*/ info={pdfData} style={{height: '100vh', width: '100%'}}/>
                :
                null
        }
        <Row gutter={12}>
            <Col>
                <Button
                    type='primary'
                    disabled={selected?.length === 1 ? false : true}
                >
                    Prikaži
                </Button>
            </Col>
            <Col>
                <Button
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

export default History;
