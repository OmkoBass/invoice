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
                    dataSource={invoices.map((invoice, index) => {
                    return {
                        key: index,
                        invoice: invoice[1].invoice,
                        toName: invoice[1].toName,
                        toAddress: invoice[1].toAddress,
                        dateCreated: invoice[1].dateCreated,
                        id: invoice[0]
                    }
                })}/>
        }
    </div>
}

export default History;
