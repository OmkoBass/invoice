import React, { useState, useEffect, useContext, useRef } from 'react'

//Ant components
import { Table, Row, Col, Button, notification, Typography, Divider, Input } from "antd";

import axios from 'axios';

//Components
import PDF from "./PDF";
import ErrorResult from "./Smaller/ErrorResult";

//Debounce
import { debounce } from 'lodash';

import DATABASE from "../Utils";

import { AuthContext } from "./Auth";

function History () {
    const { currentUser } = useContext(AuthContext);

    const [invoices, setInvoices] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    // Have to use this shit because ant fucking design
    // Won't send it's value on onChange
    const searchRef = useRef(null);

    // 21 = 20 will be displayed
    const defaultPageSize = 21;

    const columns = [
        {
            title: 'ID fakture',
            dataIndex: '_id'
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
        axios.post(`${ DATABASE }/get/invoices`, {
            username: currentUser.username
        }).then(res => {
            if (res.data === 400) {
                setInvoices(null);
            } else {
                setInvoices(res.data);
            }
        }).then(() => setLoad(false)).catch(() => {
            setError(true);
        })
    }, [currentUser.username]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const deleteNotification = () => {
        notification.success({
            message: 'Uspešno!',
        })
    }

    return <div style={ { minHeight: '80vh' } }>
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
                        <Input
                            placeholder='Pretražite fakturu'
                            allowClear
                            ref={ searchRef }
                            style={ { marginBottom: '1em' } }
                            onChange={ debounce(() => {
                                console.log(searchRef.current.state.value);
                            }, 500) }
                        />
                        <Table
                            bordered
                            onChange={ pagination => {
                                if ((pagination.current * pagination.defaultPageSize) >= defaultPageSize * pageNumber)
                                    setPageNumber(pageNumber + 1);
                            } }
                            pagination={ { defaultPageSize: defaultPageSize - 1 } }
                            rowSelection={ rowSelection }
                            loading={ load }
                            columns={ columns }
                            dataSource={ invoices?.map((invoice, index) => {
                                return {
                                    ...invoice,
                                    key: index,
                                }
                            }) }/>

                        <Row gutter={ 12 } style={ { margin: '1em 0 1em 0' } }>
                            <Col>
                                <Button
                                    onClick={ () => {
                                        setPdfData(selected[0]);
                                        setSelectedRowKeys([]);
                                    } }
                                    type='primary'
                                    disabled={ selectedRowKeys?.length !== 1 }
                                >
                                    Prikaži
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={ () => {
                                        setSelectedRowKeys([]);
                                        //Delete from firebase
                                        axios.put(`${ DATABASE }/delete/invoices`, {
                                            ids: selected.map(invoice => invoice._id)
                                        }).then(res => {
                                            if (res.data === 200) {
                                                deleteNotification();
                                            } else {
                                                console.log('FAIL!');
                                            }
                                        })

                                        //Updating state
                                    } }
                                    type='primary'
                                    danger
                                    disabled={ !selectedRowKeys?.length > 0 }
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
                <PDF /*image={img}*/ info={ pdfData } style={ { height: '100vh', width: '100%' } }/>
                :
                null
        }
    </div>
}

export default History;
