import React, { useState, useContext } from 'react'

//firebase
import firebase from "../firebase";

//antd
import {Form, Button, Input, Upload, Typography,
    Divider, notification} from 'antd'
import { UploadOutlined } from "@ant-design/icons";

import { AuthContext } from "./Auth";

const { Title, Paragraph, Text } = Typography;

function Profile(props) {
    //Form ref
    let [form] = Form.useForm();

    const [data, setData] = useState(props.data);

    if(props.data) {
        form.setFieldsValue({
            account: data.account,
            city: data.city,
            email: data.email,
            firmName: data.firmName,
            fromName: data.fromName,
            pib: data.pib,
            street: data.street,
        })
    } else {
        form.resetFields();
    }

    //So i know who the current user is
    const { currentUser } = useContext(AuthContext);

    let userID = currentUser.uid;

    let userCollection = firebase.firestore().collection('Users');

    // Saving
    const handleSave = () => {
        let values = form.getFieldsValue();

        let parsedValues = Object.entries(values).map(([key, value]) => value === undefined ? '' : value);

        let objectForFirebase = {
            //IMAGE
            fromName: parsedValues[1],
            firmName: parsedValues[2],
            street: parsedValues[3],
            city: parsedValues[4],
            pib: parsedValues[5],
            account: parsedValues[6],
            email: parsedValues[7],
        }

        userCollection.doc(userID).set({
            account: objectForFirebase.account,
            email: objectForFirebase.email,
            firmName: objectForFirebase.firmName,
            fromName: objectForFirebase.fromName,
            city: objectForFirebase.city,
            pib: objectForFirebase.pib,
            street: objectForFirebase.street,
        }).then(r => {
            openNotificationWithIcon('success');
        })
        .catch(r => openNotificationWithIcon('error'));
    }

    // notification
    const openNotificationWithIcon = type => {
        notification[type]({
            message: type === 'success' ? 'Uspešno!' : 'Greška',
            description: type === 'success' ? 'Profil sačuvan!' : type === 'error' ?
                'Doslo je do greške.' : 'Informacije se nisu promenile.'
        });
    };

    const uploadProps = {
        fileList: null,
        accept: '.png, .jpg, .jpeg',
        listType: 'picture',
        multiple: false,
    }

    // Layout for positioning
    const layout = {
        labelCol: {span: 4},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 4,
        }
    }

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
                  initialValues={props.data}
            >
                <Form.Item name='logo'
                           label='Logo'>
                    <Upload {...uploadProps}>
                        <Button>
                            <UploadOutlined /> Upload
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
                    <Button type='primary' size='large' onClick={handleSave}>
                        Sačuvaj
                    </Button>
                </Form.Item>
            </Form>
    </div>
}

export default Profile;
