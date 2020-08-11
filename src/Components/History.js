import React, {useState, useEffect, useContext, useRef} from 'react'

//Ant components
import {Table, Row, Col, Button, notification, Typography, Divider, Input} from "antd";

//Components
import PDF from "./PDF";
import ErrorResult from "./Smaller/ErrorResult";

//Debounce
import {debounce} from 'lodash';

function History() {
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

    }, [defaultPageSize, pageNumber]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    /*const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };*/

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
                        <Input
                            placeholder='Pretražite fakturu'
                            allowClear
                            ref={searchRef}
                            style={{marginBottom: '1em'}}
                            onChange={debounce(() => {
                                console.log(searchRef.current.state.value);
                            }, 500)}
                        />
                        <Table
                            bordered
                            onChange={pagination => {
                                if((pagination.current * pagination.defaultPageSize) >= defaultPageSize * pageNumber)
                                    setPageNumber(pageNumber + 1);
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
                                    onClick={() => {
                                        setPdfData(selected[0]);
                                        setSelectedRowKeys([]);
                                    }}
                                    type='primary'
                                    disabled={selectedRowKeys?.length !== 1}
                                >
                                    Prikaži
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => {
                                        setSelectedRowKeys([]);
                                        //Delete from firebase

                                        //Updating state
                                        setInvoices(invoices.filter(invoice => selected.find(select => select.id !== invoice[0])));
                                    }}
                                    type='primary'
                                    danger
                                    disabled={!selectedRowKeys?.length > 0}
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
