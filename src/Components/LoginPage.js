import React, { useContext } from 'react'

//Router
import { useHistory, Redirect} from "react-router";

//Firebase
import firebase from '../firebase';

//antd
import { Form, Input, Button, Layout, message, Divider} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//skyon
import skyon from '../Assets/skyondark.png'

import { AuthContext } from "./Auth";

const { Content } = Layout;

//antd password field
const { Password } = Input;

function LoginPage() {
    let history = useHistory();

    const { currentUser } = useContext(AuthContext);

    if(currentUser) {
        return <Redirect to='/invoice' />
    }

    const onFinish = value => {
        //If authentication is successful go to /invoice
        firebase.auth().signInWithEmailAndPassword(value.username, value.password).then(() => {
            history.push('/invoice');
        })


        //If authentication failed show an error message
        const promise = firebase.auth().signInWithEmailAndPassword(value.username, value.password);
        promise.catch(() => failed());
    }

    //Failed message when input is bad
    const failed = () => {
        message.error('Proverite korisničko ime i lozinku!');
    };

    return <Layout>
        <Content style={{height: '100vh'}}>
            <div className='login'>
                <img src={skyon} alt='skyon logo' style={{width: '100%'}}/>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'E-mail ne sme biti prazan!'
                            },
                            {
                                type: 'email',
                                message: 'Unesite ispravan E-mail!'
                            }
                            ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Korisničko ime ili E-mail" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Unesite lozinku!' }]}
                    >
                        <Password
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Lozinka"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary"
                                size='large'
                                block={true}
                                htmlType="submit">
                            Prijavi se!
                        </Button>

                        <Divider/>

                        <p style={{textAlign: 'center'}}> Nemate profil? </p>

                        <Divider/>

                        <Button type='primary'
                                size='large'
                                ghost={true}
                                block={true}
                                onClick={() => history.push('/register')}>
                            Registruj se!
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    </Layout>
}

export default LoginPage;
