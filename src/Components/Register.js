import React, { useContext } from 'react'

//Ant Components
import {Layout, Form, Input, Button, Divider, notification} from 'antd';

//logo
import skayondark from '../Assets/skyondark.png';

//firebase
import firebase from '../firebase';

//router
import { Redirect, useHistory } from "react-router";

//Context for authentication
import { AuthContext } from "./Auth";

const {Content} = Layout;

const {Password} = Input;

function Register() {
    //form ref
    let [form] = Form.useForm();

    let history = useHistory();

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/invoice'/>
    }

    const alreadyExists = () => {
        notification.error({
            message: 'Greška!',
            description: 'Email adresa je vec registorvana.'
        });
    }

    const handleFinish = value => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
            .then(() => {
                history.push('/register/successful');
            }).catch(() => alreadyExists());
    }

    const handleValidatePassword = (rule, value) => {
        if (value.length < 8) {
            return Promise.reject('Minimalno 8 karaktera!');
        }
        return Promise.resolve();
    }

    const handleValidateConfirmPassword = (rule, value) => {
        if (value === form.getFieldValue('password')) {
            return Promise.resolve();
        }
        return Promise.reject('Lozinke moraju biti iste!');
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 24},
    };

    return <Layout>
        <Content style={{height: '100vh'}}>
            <div className='login'>
                <img src={skayondark} alt='skayon logo' style={{width: '100%'}}/>
                <Form {...layout}
                      form={form}
                      name='register'
                      onFinish={handleFinish}
                >
                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            {
                                required: true,
                                message: 'Email ne sme biti prazan!'
                            },
                            {
                                type: 'email',
                                message: 'Unesite ispravan email!'
                            }
                        ]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name='password'
                        label='Lozinka'
                        rules={[
                            {
                                required: true,
                                message: 'Unesite lozinku!',
                            },
                            {
                                validator: handleValidatePassword
                            }]}>
                        <Password/>
                    </Form.Item>

                    <Form.Item
                        name='confirmPassword'
                        label='Potvrdite lozinku'
                        rules={[
                            {
                                required: true,
                                message: 'Potvrdite lozinku!',
                            },
                            {
                                validator: handleValidateConfirmPassword
                            }
                            ]}>
                        <Password/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary'
                                size='large'
                                htmlType='submit'
                                block={true}>
                            Registruj se!
                        </Button>

                        <Divider>
                            Već imate profil?
                        </Divider>

                        <Button type='primary'
                                ghost={true}
                                size='large'
                                block={true}
                                onClick={() => history.push('/')}>
                            Prijavi se!
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    </Layout>
}

export default Register;
