import React, { useState } from 'react'

//antd
import { Layout, Form, Input, Button, message, Result, Divider } from 'antd';

//logo
import skyonlight from '../Assets/skyonlight.png';
import skyondark from '../Assets/skyondark.png'

//firebase
import firebase from '../firebase';

//router
import {useHistory} from "react-router";

const { Content } = Layout;

const {Password} = Input;

function Register() {
    //Success state
    const [success, setSuccess] = useState(false);

    //form ref
    let [form] = Form.useForm();

    let history = useHistory();

    //On finish
    const handleFinish = value => {
        console.log(value)
        if(value.username.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)) {
            if(value.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
                const firestore = firebase.firestore();

                firestore.collection('Profiles').add({
                    username: value.username,
                    password: value.password,
                }).then(() => {
                    setSuccess(true);
                })
            }
            else {
                message.error('Neispravna lozinka!');
            }
        } else {
            message.error('Neispravno korisničko ime!');
        }
    }

    //layout
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 24 },
    };

    return <Layout>
        <Content style={{height: '100vh'}}>
            {
                success
                ?
                <Result
                    status='success'
                    title='Uspešno ste se registrovali!'
                    subTitle='Sada se mozete prijaviti na vas profil!'
                    extra={[
                        <Button type='primary'
                                size='large'
                                onClick={() => history.push('/')}>
                            Prijavi se!
                        </Button>
                    ]}
                />
                :
                <div className='login'>
                    <img src={skyondark} alt='skyon logo' style={{width: '100%', height: '25%'}}/>
                    <Form {...layout}
                          name='register'
                          form={form}
                          onFinish={handleFinish}
                    >
                        <Form.Item
                            name='username'
                            label='Korisničko ime'
                            rules={[{required: true, message: 'Unesite korisničko ime!'}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name='password'
                            label='Lozinka'
                            rules={[{required: true, message: 'Unesite lozinku!'}]}>
                            <Password/>
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary'
                                    size='large'
                                    htmlType='submit'
                                    block={true}>
                                Registruj se!
                            </Button>

                            <Divider/>

                            <p style={{textAlign: 'center'}}>
                                Već imate profil?
                            </p>

                            <Divider/>

                            <Button type='default'
                                    size='large'
                                    block={true}
                                    onClick={() => history.push('/')}>
                                Prijavi se!
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            }
        </Content>
    </Layout>
}

export default Register;
