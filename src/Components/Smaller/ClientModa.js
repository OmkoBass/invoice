import React, { useContext, useEffect } from 'react'

import axios from 'axios';

import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';

import DATABASE from "../../Utils";

import { AuthContext } from "../Auth";

function ClientModal ({ visible, callBack, client }) {
    let [form] = Form.useForm();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        form.setFieldsValue(client);
    }, [client, form]);

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
        axios.put(`${ DATABASE }/update/user/client`, {
            clientId: client._id,
            client: values
        }, {
            headers: {
                token: currentUser
            }
        }).then(res => {
            if (res.data !== 400) {
                successNotification();
            } else {
                failNotification();
            }
            callBack();
        });
    }

    const layout = {
        labelCol: { span: 6 },
    }

    const buttonLayout = {
        wrapperCol: { offset: 6 }
    }

    return <Modal
        footer={ false }
        visible={ visible }
        onCancel={ () => callBack() }
    >
        <Form { ...layout }
              form={ form }
              onFinish={ handleFinish }
        >
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
    </Modal>
}

export default ClientModal;
