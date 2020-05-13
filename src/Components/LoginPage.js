import React from 'react'

//Router
import {useHistory} from "react-router";

//firebase
import firebase from '../firebase';

//antd
import { Form, Input, Button, Layout, message, Divider} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//skyon
import skyon from '../Assets/skyondark.png'

const { Content } = Layout;

//antd password field
const {Password} = Input;

function LoginPage() {
    const onFinish = value => {

    }

    //Failed message when input is bad
    const failed = () => {
        message.error('Proverite korisničko ime i lozinku!');
    };

    let history = useHistory();

    return <Layout>
        <Content style={{height: '100vh'}}>
            <div className='login'>
                <img src={skyon} alt='skyon logo' style={{width: '100%', height: '25%'}}/>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Unesite korisničko ime!' }]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Korisničko ime" />
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

                        <Button type='default'
                                size='large'
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
