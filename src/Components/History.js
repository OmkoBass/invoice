import React, {useState, useEffect, useContext} from 'react'

//Firebase
import firebase from "../firebase";

//Ant components
import {Table} from "antd";

//Context
import {AuthContext} from "./Auth";
import ErrorResult from "./Smaller/ErrorResult";

function History() {
    const {currentUser} = useContext(AuthContext);

    const [invoices, setInvoices] = useState([]);
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
    ];

    useEffect(() => {
        firebase.database().ref(`users/${currentUser.uid}/invoices`).once('value')
            .then(data => {
                setInvoices(Object.values(data.val()));
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
                    dataSource={invoices.map((invoice, index) => {
                    return {
                        key: index,
                        invoice: invoice.invoice,
                        toName: invoice.toName,
                        toAddress: invoice.toAddress,
                        dateCreated: invoice.dateCreated
                    }
                })}/>
        }
    </div>
}

export default History;
