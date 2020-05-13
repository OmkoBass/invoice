import React, {useState} from 'react'

//Router
import {useHistory} from "react-router";

//antd
import {Row, Col, Layout, Menu, Typography, Avatar, Modal, Button} from 'antd';

//img
import skyon from '../Assets/skyonlight.png'
import conmisi from '../Assets/conmisi.png';
import ictdc from '../Assets/ictdc.png'

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";

//Style
const logoStyle = {
    width: '100%',
    height: '100%',
    float: 'left'
}

const {Header, Content, Sider, Footer} = Layout;

function Invoicing() {
    //for modal
    const [show, setShow] = useState(null);

    //For switching between menus
    const [functions, setFunctions] = useState(0);

    //Invoice info
    const [invoice, setInvoice] = useState(null);

    function handleInvoice(childData) {
        setInvoice(childData);
    }

    const handleLogout = () => setShow(true);

    let history = useHistory();

    return <Layout>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div>
                <img src={skyon} alt='skyon logo' style={logoStyle}/>
            </div>
                <Menu theme="dark" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={() => setFunctions(0)}>
                        Fakture
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => setFunctions(1)}>
                        Profil
                    </Menu.Item>
                    <Menu.Item key="3" onClick={handleLogout}>
                        Odjavi se
                    </Menu.Item>
                </Menu>
        </Sider>
        <Layout>
            <Header style={{ padding: 0 }} />
            <Content>
                <div style={{ padding: 24, minHeight: 360 }}>
                    {
                        functions === 0 ?
                            <div>
                                <Invoice returnInvoiceInfo={handleInvoice}/>
                                {invoice ?
                                <PDF info={invoice}/>
                                :
                                null}
                            </div>
                            :
                            <Profile/>
                    }
                </div>
            </Content>
            <Footer style={{
                textAlign: 'center',
                color: 'white',
                backgroundColor: 'black',
            }}>
                <Row justify='space-between'>
                    <Col span={12}>
                        <Typography.Title level={3} style={{color: 'white'}}> O nama </Typography.Title>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={3} style={{color: 'white'}}> Dodatno </Typography.Title>
                    </Col>
                </Row>
                <Row justify='space-between'>
                    <Col span={12}>
                        Naš tim
                    </Col>
                    <Col span={12}>
                        <Col span={24}>
                            <a href='https://skayon.agency/' target="_blank" rel="noopener noreferrer">
                                <Avatar src={skyon} shape='square' style={{width: '50%', height: '25%'}} alt='skyon logo'/>
                            </a>
                        </Col>
                        <Col span={24} style={{marginTop: '2em'}}>
                            <a href='https://conmisi.com/' target="_blank" rel="noopener noreferrer">
                                <Avatar src={conmisi} shape='square' style={{width: '50%', height: '25%'}} alt='conmisi logo'/>
                            </a>
                        </Col>
                        <Col span={24} style={{marginTop: '2em'}}>
                            <a href='https://ictdc.rs/' target="_blank" rel="noopener noreferrer">
                                <Avatar src={ictdc} shape='square' style={{width: '50%', height: '25%'}} alt='conmisi logo'/>
                            </a>
                        </Col>
                    </Col>
                </Row>
            </Footer>
        </Layout>

        <Modal
            title='Jeste li sigurni da hocete da se odjavite?'
            footer={false}
            visible={show}
            onCancel={() => setShow(false)}
        >
            <Row>
                <Col span={9}>
                    <Button
                        block={true}
                        type='danger'
                        size='large'
                        onClick={() => history.push('/')}
                    >
                        Da
                    </Button>
                </Col>
                <Col offset={6} span={9}>
                    <Button
                        block={true}
                        type='primary'
                        size='large'
                        onClick={() => setShow(false)}
                    >
                        Ne
                    </Button>
                </Col>
            </Row>
        </Modal>
    </Layout>
}

export default Invoicing;
