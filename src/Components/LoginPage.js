import React from 'react'

//Router
import {useHistory} from "react-router";

//antd
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//skyon
import skyon from '../Assets/Skayon_logo_dark.png'

//antd password field
const {Password} = Input;

function LoginPage() {
    const onFinish = value => {
        if(value.username === 'admin' && value.password === 'admin')
            history.push({
                pathname: '/invoice',
                username: value.username
            })
        else {
            failed();
        }
    }

    //Failed message when input is bad
    const failed = () => {
        message.error('Proverite korisničko ime i lozinku!');
    };

    let history = useHistory();

    return <div className='login'>
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
                <Button type="primary" htmlType="submit">
                    Prijavite se
                </Button>
                Ili
                <Button type='default'>
                    Registrujte se!
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default LoginPage;
