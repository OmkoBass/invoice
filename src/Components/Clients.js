import React, { useContext } from 'react'

import { AuthContext } from "./Auth";

import axios from 'axios';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Typography from 'antd/lib/typography';
import DATABASE from "../Utils";
import { notification } from "antd";

function Clients() {
    const { currentUser } = useContext(AuthContext);

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
            if(res.data !== 400) {
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
        <Form {...layout}
              className='form-style'
              onFinish={handleFinish}
        >
            <Typography.Title>
                Ovde možete sačuvati česte klijente.
            </Typography.Title>

            <Form.Item name='toName'
                       label='Komitet:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toAddress'
                       label='Adresa:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toCity'
                       label='Grad:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item name='toPib'
                       label='PIB/JMBG:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item {...buttonLayout}>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Sačuvaj
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default Clients;
