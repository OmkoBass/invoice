import React, { useState, useContext } from 'react'

//Router
import { useHistory, Redirect} from "react-router";

import axios from 'axios';

//Ant Components
import { Form, Input, Button, Layout, message, Divider} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import LazyImage from "./Smaller/LazyImage";

import logo from "../Assets/logo.png";

import DATABASE from "../Utils";

import {AuthContext} from "./Auth";

const { Content } = Layout;
const { Password } = Input;

function LoginPage() {
    const history = useHistory();

    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const [canSend, setCanSend] = useState(false);

    if(currentUser)
        return <Redirect to='/invoice'/>

    const onFinish = value => {
        axios.post(`${DATABASE}/login/user`, {
            username: value.username,
            password: value.password
        }).then(res => {
            if(res.data !== 400 && res.data !== 500 && res.data !== 401) {
                setCurrentUser(res.data);
                history.push('/invoice');
            } else {
                failed();
            }
        })
    }

    //Failed message when input is bad
    const failed = () => message.error('Proverite korisničko ime i lozinku!');

    return <Layout>
        <Content style={{height: '100vh'}}>
            <div className='login'>
                <LazyImage
                    src={logo}
                    alt='logo'
                    style={{width: '50%', height: '50%', margin: 'auto', display: 'block' }}
                />
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
                                message: 'Ne sme biti prazano!'
                            }
                            ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Korisničko ime" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Unesite lozinku!'
                            },
                            {
                                validator: (_, value) => {
                                    if(!value) {
                                        setCanSend(false);
                                        return Promise.resolve();
                                    } else {
                                        if(value.length < 8) {
                                            setCanSend(false);
                                            return Promise.resolve();
                                        }
                                        else {
                                            setCanSend(true);
                                            return Promise.resolve();
                                        }
                                    }
                                }
                            }
                        ]}
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
                                disabled={!canSend}
                                htmlType="submit">
                            Prijavi se!
                        </Button>

                        <Divider>
                            Nemate profil?
                        </Divider>

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
