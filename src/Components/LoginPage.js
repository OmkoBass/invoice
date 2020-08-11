import React, { useContext } from 'react'

//Router
import { useHistory, Redirect} from "react-router";

//Ant Components
import { Form, Input, Button, Layout, message, Divider} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//Skayon
import skayon from '../Assets/skyondark.png'

const { Content } = Layout;
const { Password } = Input;

function LoginPage() {
    let history = useHistory();

    const onFinish = value => {

    }

    //Failed message when input is bad
    const failed = () => message.error('Proverite korisničko ime i lozinku!');

    return <Layout>
        <Content style={{height: '100vh'}}>
            <div className='login'>
                <img src={skayon} alt='skayon logo' style={{width: '100%'}}/>
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
                                message: 'email ne sme biti prazan!'
                            },
                            {
                                type: 'email',
                                message: 'Unesite ispravan email!'
                            }
                            ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Email" />
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
