import React, {useState, useContext, useEffect} from 'react'

//firebase
import firebase from 'firebase';

//Ant components
import { Form, Button, Input, Typography, Divider, notification } from 'antd'

import {AuthContext} from "./Auth";

const {Title, Paragraph, Text} = Typography;

function Profile(props) {
    //Form ref
    let [form] = Form.useForm();

    const [data, setData] = useState(props.data);

    // const [img, setImg] = useState(null);

    useEffect(() => {
        if (props.data) {
            form.setFieldsValue({data});
        }
    }, [data, form, props.data]);


    //So i know who the current user is
    const {currentUser} = useContext(AuthContext);

    // Saving
    const handleOnFinish = values => {
        firebase.database().ref(`users/${currentUser.uid}`).set(values)
            .then(() => successNotification())
            .catch(() => failNotification());
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
              onFinish={handleOnFinish}
              initialValues={props.data}
        >
            {/*<Form.Item label='Logo'>
                    <FileUpload accept={'.png, .jpg, .jpeg'}
                        multiple={false}
                        imgCallBack={imgCallBack}
                    />
                </Form.Item>*/}
            <Form.Item name='fromName'
                       label='Od'>
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
                       label='Email:'
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
