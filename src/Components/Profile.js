import React, { useContext, useEffect } from 'react'

//firebase
import * as firebase from 'firebase/app';
import 'firebase/database';

//Ant components
import { Form, Button, Input, Typography, Divider, notification } from 'antd'

import {AuthContext} from "./Auth";

const {Title, Paragraph, Text} = Typography;

function Profile() {
    //Form ref
    let [form] = Form.useForm();

    //So i know who the current user is
    const {profileData, setProfileData, currentUser} = useContext(AuthContext);

    // const [img, setImg] = useState(null);

    useEffect(() => {
        if (profileData) {
            form.setFieldsValue(profileData);
        }
    }, [form, profileData]);

    // Saving
    const handleOnFinish = values => {
        //If profile data is empty no need to check if the objects are the same
        if(!profileData) {
            firebase.database().ref(`users/${currentUser.email.replace('.', 'DOT')}/profile`).set(values)
                .then(() => {
                    setProfileData(values);
                    successNotification();
                }).catch(() => failNotification());
        } else {
            const formValues = Object.values(values).sort();
            const propsData = Object?.values(profileData).sort();

            if(JSON.stringify(formValues) !== JSON.stringify(propsData)) {
                firebase.database().ref(`users/${currentUser.email.replace('.', 'DOT')}/profile`).set(values)
                    .then(() => {
                        setProfileData(values);
                        successNotification();
                    }).catch(() => failNotification());
            } else {
                sameDataNotification();
            }
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
