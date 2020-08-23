import React, { useState, useEffect, useContext } from 'react'

import { AuthContext } from "./Auth";

import axios from 'axios';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import List from 'antd/lib/list'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Typography from 'antd/lib/typography';
import notification from 'antd/lib/notification';

import DATABASE from "../Utils";
import ClientModal from "./Smaller/ClientModa";

function Clients () {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [clientModal, setClientModal] = useState(false);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${ DATABASE }/user/clients`, {
            headers: {
                token: currentUser
            }
        }).then(res => {
            if (res.data !== 400) {
                setClients(res.data);
            }
        }).then(() => setLoading(false));
    }, []);

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
        axios.post(`${ DATABASE }/create/client`, { values: values }, {
            headers: {
                token: currentUser,
            }
        }).then(res => {
            if (res.data !== 400) {
                successNotification();
            } else {
                failNotification();
            }
        })
    }

    const layout = {
        labelCol: { span: 4 },
    }

    const buttonLayout = {
        wrapperCol: { offset: 4 }
    }

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

        <List
            style={ { backgroundColor: 'white', marginTop: '1em' } }
            dataSource={ clients }
            loading={ loading }
            renderItem={ item => (
                <List.Item style={ { padding: '1em' } }>
                    <List.Item.Meta
                        onClick={() => {
                            setSelectedClient(item);
                            setClientModal(true);
                        }}
                        style={{cursor: 'pointer'}}
                        description={ <div>
                            <Row justify='space-between'>
                                <Col md={6} xs={24}>
                                    <Typography.Text>
                                        Komitet: { item.toName }
                                    </Typography.Text>
                                </Col>

                                <Col md={6} xs={24}>
                                    <Typography.Text>
                                        Adresa: { item.toAddress }
                                    </Typography.Text>
                                </Col>

                                <Col md={6} xs={24}>
                                    <Typography.Text>
                                        Grad: { item.toCity }
                                    </Typography.Text>
                                </Col>

                                <Col md={6} xs={24}>
                                    <Typography.Text>
                                        PIB/JMBG: { item.toPib }
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </div>
                        }
                    />
                </List.Item>
            ) }
        />

        <ClientModal visible={clientModal} client={selectedClient} callBack={() => setClientModal(false)}/>
    </div>
}

export default Clients;
