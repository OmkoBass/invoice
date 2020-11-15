import React, { useState, useContext, useEffect } from 'react'

//Ant Components
import { Form, Button, Input, Typography, Divider, notification } from 'antd'

//Router
import { useHistory } from "react-router";

import axios from 'axios';

import {AuthContext} from "./Auth";
import DATABASE from "../Utils";

const {Title, Paragraph, Text} = Typography;

function Profile() {
    //Form ref
    let [form] = Form.useForm();

    const history = useHistory();
    const [profileValues, setProfileValues] = useState(null);

    const { currentUser } = useContext(AuthContext);

    // const [img, setImg] = useState(null);

    useEffect(() => {
        axios.get(`${DATABASE}/user/profile`).then(res => {
            setProfileValues(res.data);
            form.setFieldsValue(res.data);
        }).catch(err => {
            /*ERROR*/
        });
    }, []);

    // Saving
    const handleOnFinish = values => {
        if(JSON.stringify(values) !== JSON.stringify(profileValues)) {
            axios.put(`${DATABASE}/update/user/profile`, {
                profile: values
            }).then(res => {
                if(res.data === 400) {
                    failNotification();
                } else if(res.data === 401) {
                    history.push('/');
                }
                else {
                    setProfileValues(res.data);
                    form.setFieldsValue(res.data);
                    successNotification();
                }
            }).catch(() => failNotification());
        } else {
            sameDataNotification();
        }
    }

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

    const sameDataNotification = () => {
        notification.info({
            message: 'Podaci su isti.'
        })
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

    return <div style={{minHeight: '90vh'}}>
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
            {/*<Form.Item label='Logo'>
                    <FileUpload accept={'.png, .jpg, .jpeg'}
                        multiple={false}
                        imgCallBack={imgCallBack}
                    />
                </Form.Item>*/}
            <Form.Item name='fromName'
                       label='Od'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='firmName'
                       label='Ime firme'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='street'
                       label='Ulica:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='city'
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
            <Form.Item name='pib'
                       label='PIB:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='account'
                       label='ŽIRO RAČUN:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name='email'
                       label='Email:'
                       rules={[
                           {
                               required: true,
                               message: 'Ne sme biti prazno!'
                           }
                       ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item {...controlLayout}>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='large'>
                    Sačuvaj
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default Profile;
