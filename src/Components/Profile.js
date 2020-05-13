import React, { useEffect } from 'react'

//firebase
import firebase from "../firebase";

import {Form, Button, Input, Upload, Typography, Divider, notification} from 'antd'
import {UploadOutlined} from "@ant-design/icons";

const {Title, Paragraph, Text} = Typography;

const firestore = firebase.firestore();

function Profile() {
    //Layout for positioning
    const layout = {
        labelCol: {span: 4},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 4,
        }
    }

    //Form ref
    let [form] = Form.useForm();

    //Saving
    const handleOnFinish = value => {
        firestore.collection('Invoices').add({
            account: value.account,
            city: value.city,
            email: value.email,
            firmName: value.firmName,
            fromName: value.fromName,
            pib: value.pib,
            street: value.street,
        }).then(() => openNotificationWithIcon('success'));
    }

    // notification
    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Uspešno!',
            description:
                'Uspešno ste sačuvali!',
        });
    };

    return <div>
        <Typography>
            <Title>Vaš Profil</Title>
            <Paragraph>
                Unesite podatke za vašu fakturu koji će se uvek nalaziti u vašoj fakturi, dugme <Text
                strong>"Sačuvaj"</Text> na dnu ekrana će sačuvati informacije.
            </Paragraph>
        </Typography>

        <Divider/>

        <Form {...layout}
              className='form-style'
              form={form}
              name='profile'
              onFinish={handleOnFinish}
        >
            <Form.Item name='logo'
                       label='Logo'>
                <Upload multiple={false}
                        listType='picture'
                        fileList={null}>
                    <Button>
                        <UploadOutlined/> Otpremi
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item name='fromName'
                       label='od'>
                <Input/>
            </Form.Item>
            <Form.Item name='firmName'
                       label='Ime firme'>
                <Input/>
            </Form.Item>
            <Form.Item name='street'
                       label='Ulica:'
            >
                <Input/>
            </Form.Item>
            <Form.Item name='city'
                       label='Grad:'
            >
                <Input/>
            </Form.Item>
            <Form.Item name='pib'
                       label='PIB:'
            >
                <Input/>
            </Form.Item>
            <Form.Item name='account'
                       label='ŽIRO RAČUN:'
            >
                <Input/>
            </Form.Item>
            <Form.Item name='email'
                       label='E-mail:'
            >
                <Input/>
            </Form.Item>
            <Form.Item {...controlLayout}>
                <Button type='primary' htmlType='submit' size='large'>
                    Sačuvaj
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default Profile;
