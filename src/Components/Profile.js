import React, { useState, useContext, useEffect } from 'react'

//firebase
import firebase from "../firebase";

//antd
import {Form, Button, Input, Upload, Typography,
    Divider, notification, Skeleton} from 'antd'
import { UploadOutlined } from "@ant-design/icons";

import { AuthContext } from "./Auth";

const { Title, Paragraph, Text } = Typography;

function Profile() {
    //This is just a state that stores data from the database
    //So i don't need to waste requests when i can have it here
    const [data, setData] = useState(null);

    useEffect(() => {
        if(data === null)
            setDataFromDatabase();
    }, [])


    useEffect(() => {
        if(data) {
            form.setFieldsValue({
                account: data.account,
                city: data.city,
                email: data.email,
                firmName: data.firmName,
                fromName: data.fromName,
                pib: data.pib,
                street: data.street,
            })
            setLoaded(true);
        } else {
            form.setFieldsValue({
                account: '',
                city: '',
                email: '',
                firmName: '',
                fromName: '',
                pib: '',
                street: '',
            })
            setLoaded(true);
        }
    }, [data, setData])

    //Loaded state
    const [loaded, setLoaded] = useState(false);

    //Form ref
    let [form] = Form.useForm();

    //So i know who the current user is
    const { currentUser } = useContext(AuthContext);

    let userID = currentUser.uid;

    let userCollection = firebase.firestore().collection('Users');

    //When we enter profile it gets data from the database
    function setDataFromDatabase() {
        userCollection.doc(userID).get().then(function (doc) {
            if(doc.exists) {
                setData(doc.data());
            } else {
                // Not found
            }
        }).catch(function (error) {
            // Error
        });
    }

    // Saving
    const handleOnFinish = value => {
        if (form.getFieldValue('account') === data.account
        && form.getFieldValue('city') === data.city
        && form.getFieldValue('email') === data.email
        && form.getFieldValue('firmName') === data.firmName
        && form.getFieldValue('fromName') === data.fromName
        && form.getFieldValue('pib') === data.pib
        && form.getFieldValue('street') === data.street
        ) {
            openNotificationWithIcon('info')
        } else {
            userCollection.doc(userID).set({
                account: value.account,
                city: value.city,
                email: value.email,
                firmName: value.firmName,
                fromName: value.fromName,
                pib: value.pib,
                street: value.street,
            }).then(r => openNotificationWithIcon('success'))
                .catch(r => openNotificationWithIcon('error'));
        }
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

        {
            loaded
            ?
            <Form {...layout}
                  className='form-style'
                  form={form}
                  name='profile'
                  onFinish={handleOnFinish}
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
                    <Button type='primary' htmlType='submit' size='large'>
                        Sačuvaj
                    </Button>
                </Form.Item>
            </Form>
            :
            <div className='form-style'>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
            </div>
        }
    </div>
}

export default Profile;
