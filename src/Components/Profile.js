import React, { useContext, useEffect } from 'react'

//Ant Components
import { Form, Button, Input, Typography, Divider, notification } from 'antd'

import axios from 'axios';

import {AuthContext} from "./Auth";
import DATABASE from "../Utils";

const {Title, Paragraph, Text} = Typography;

function Profile() {
    //Form ref
    let [form] = Form.useForm();

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    // const [img, setImg] = useState(null);

    useEffect(() => {
        form.setFieldsValue(currentUser.profile);
    }, [currentUser.profile, form])

    // Saving
    const handleOnFinish = values => {
        axios.put(`${DATABASE}/update/user/profile`, {
            id: currentUser._id,
            account: values.account,
            city: values.city,
            email: values.email,
            firmName: values.firmName,
            fromName: values.fromName,
            pib: values.pib,
            street: values.street
        }).then(res => {
            if(res.data === 400) {
                failNotification();
            } else {
                setCurrentUser(res.data);
                successNotification();
            }
        }).catch(() => failNotification());
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
