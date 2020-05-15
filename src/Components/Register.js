import React, { useState } from 'react'

//antd
import {Layout, Form, Input, Button, message, Result, Divider, Col, Row} from 'antd';

//logo
import skyondark from '../Assets/skyondark.png';
import complete from '../Assets/success.png';

//firebase
import firebase from '../firebase';

//router
import { useHistory } from "react-router";

const { Content } = Layout;

const { Password } = Input;

function Register() {
    //Success state
    const [success, setSuccess] = useState(false);

    //form ref
    let [form] = Form.useForm();

    let history = useHistory();

    //On finish
    const handleFinish = value => {
        if(value.username.match(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)) {
            if(value.email.match(/^(\d{1,5}|[^\W]{1,3}|[a-zA-Z]+)([a-z])+([!#$%^&*()<>_?:"}{[\]a-z])+@([a-zA-Z.])+\.([a-z])+$/)) {
                if(value.password.match(/^[A-Za-z0-9]{6,32}$/) &&
                    value.password === value.confirmPassword
                ) {
                    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                        .then(() => {
                            //If we don't have the signout it will automatically
                            //go to the main page of invoicing
                            setSuccess(true);
                            firebase.auth().signOut();
                        })
                }
                else {
                    message.error('Neispravna lozinka!');
                }
            }
        } else {
            message.error('Neispravno korisničko ime!');
        }
    }

    //layout
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };

    return <Layout>
        <Content style={{height: '100vh', backgroundColor: 'white'}}>
            {
                success
                ?
                <Result
                    status='success'
                    title='Uspešno ste se registrovali!'
                    subTitle='Sada se možete prijaviti na vas profil!'
                    style={{margin: 'auto'}}
                    extra={[
                        <Row justify='center' key={1}>
                            <Col xl={12} lg={18} xs={24}>
                                <img style={{width: '90%'}} src={complete} alt='success'/>
                            </Col>
                        </Row>,
                        <Divider key={2}/>,
                        <Button key={3}
                                type='primary'
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
                            name='email'
                            label='E-mail'
                            rules={[{required: true, message: 'Unesite E-mail ime!'}]}>
                            <Input/>
                        </Form.Item>

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

                        <Form.Item
                            name='confirmPassword'
                            label='Potvrdite lozinku'
                            rules={[{required: true, message: 'Potvrdite lozinku!'}]}>
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
