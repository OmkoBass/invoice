import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from "./Auth";

import axios from 'axios';

import { Row, Col } from "antd";
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table'
import Typography from 'antd/lib/typography';
import notification from 'antd/lib/notification';

import DATABASE from "../Utils";

function Clients () {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selected, setSelected] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const defaultPageSize = 10;

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${ DATABASE }/user/getClientsPagination/${defaultPageSize}/${pageNumber}`)
            .then(res => {
            if (res.data !== 400) {
                setLoading(false);
                setClients([...clients, ...res.data]);
            }
        }).then(() => setLoading(false));
    }, [pageNumber]);

    const successNotification = () => {
        notification.success({
            message: 'Uspešno!'
        });
    }

    const failNotification = () => {
        notification.error({
            message: 'Greška!'
        });
    }

    const handleFinish = values => {
        axios.post(`${ DATABASE }/create/client`, { values: values })
            .then(res => {
            if (res.data !== 400) {
                setClients([...clients, res.data])
                successNotification();
            } else {
                failNotification();
            }
        })
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        }
    };

    const layout = {
        labelCol: { span: 4 },
    }

    const buttonLayout = {
        wrapperCol: { offset: 4 }
    }

    const columns = [
        {
            title: 'ID fakture',
            dataIndex: '_id'
        },
        {
            title: 'Ime',
            dataIndex: 'toName'
        },
        {
            title: 'Grad',
            dataIndex: 'toCity'
        },
        {
            title: 'Adresa',
            dataIndex: 'toAddress'
        },
        {
            title: 'Pib',
            dataIndex: 'toPib'
        }
    ];

    return <div>
        <Form { ...layout }
              className='form-style'
              onFinish={ handleFinish }
        >
            <Typography.Title>
                Ovde možete sačuvati česte klijente
            </Typography.Title>

            <Form.Item name='toName'
                       label='Komitet:'
                       rules={ [
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ] }
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toAddress'
                       label='Adresa:'
                       rules={ [
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ] }
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toCity'
                       label='Grad:'
                       rules={ [
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ] }
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toPib'
                       label='PIB/JMBG:'
                       rules={ [
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ] }
            >
                <Input/>
            </Form.Item>

            <Form.Item { ...buttonLayout }>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Sačuvaj
                </Button>
            </Form.Item>
        </Form>

        <Typography.Title level={4} style={{marginTop: '1em'}}> Postojeći klijenti </Typography.Title>

        <Table
            style={{ marginTop: '1em' }}
            bordered
            loading={loading}
            pagination={ { defaultPageSize: defaultPageSize - 1 } }
            rowSelection={ rowSelection }
            columns={ columns }
            onChange={ pagination => {
                if((pagination.current) > pageNumber) {
                    setPageNumber(pagination.current - 1);
                }
            }}
            dataSource={ clients?.map((invoice, index) => {
                return {
                    ...invoice,
                    key: index,
                }
            }) }
        />

        <Button
            type='danger'
            disabled={ selectedRowKeys?.length !== 1 }
            onClick={() => {
                axios.delete(`${DATABASE}/clients/delete/${selected[0]._id}`)
                    .then(res => {
                    if(res.data === 200) {
                        setClients(clients.filter(client => client._id !== selected[0]._id));
                        setSelected([]);
                        setSelectedRowKeys([]);
                    }
                })
            }}
        >
            Izbriši
        </Button>
    </div>
}

export default Clients;
