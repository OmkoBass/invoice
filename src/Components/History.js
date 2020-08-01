import React, {useState, useEffect, useContext} from 'react'

//Firebase
import firebase from "../firebase";

//Ant components
import {Table} from "antd";

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

    const columns = [
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
        },
        {
            title: 'ID fakture',
            dataIndex: 'id'
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

    return <div>
        {
            error
                ?
                <ErrorResult/>
                :
                <Table
                    bordered
                    loading={load}
                    columns={columns}
                    onRow={(record) => {
                        return {
                            onClick: _ => setPdfData(record)
                        }
                    }}
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
    </div>
}

export default History;
