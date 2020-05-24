import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//antd
import {Row, Col, Layout, Menu, Typography, Avatar, Modal, Button, Skeleton, Result} from 'antd';

//img
import skyon from '../Assets/skyonlight.png'
import conmisi from '../Assets/conmisi.png';
import ictdc from '../Assets/ictdc.png';
import internetProblem from '../Assets/internet_problem.png';

//axios
import axios from 'axios';

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";

//router
import { Redirect } from "react-router";

//Context for authentication
import { AuthContext } from "./Auth";

//for authentication
require('firebase/auth');

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

    //For the pulled image
    const [img, setImg] = useState(null);

    //If error happens i set this to true and show the error
    const [error, setError] = useState(false);

    //If this is true then we got the data we needed
    const [load, setLoad] = useState(false);

    //For switching between menus
    const [functions, setFunctions] = useState(0);

    //Invoice info
    const [invoice, setInvoice] = useState(null);

    const { currentUser } = useContext(AuthContext);

    //User data
    const [data, setData] = useState(null);

    //Collection /Users
    let userCollection = firebase.firestore().collection('Users');

    useEffect(() => {
        if(currentUser !== null) {
            /*let imageRef = firebase.storage().ref(currentUser.uid);

            imageRef.getDownloadURL().then(function(url){
                axios.get(url)
                    .then(res => {
                        setImg(res);
                    })
            }).catch(error => {
                //Do something with the error
            })*/

            userCollection.doc(currentUser.uid).get().then(function (doc) {
                if(doc.exists) {
                    setData(doc.data());
                    setLoad(true);
                } else {
                    setLoad(true);
                }
            }).catch(function (error) {
                setError(true);
            });
        }
    }, [])

    if(!currentUser) {
        return <Redirect to='/' />
    }

    function handleInvoice(childData) {
        setInvoice(childData);
    }

    const handleLogout = () => setShow(true);

    const setInvoices = () => setFunctions(0);

    const setProfile = () => setFunctions(1);

    function showAppropriate() {
        if(error) {
            return errorResult();
        } else {
            if(load) {
                return showAppropriateMenuItems();
            } else {
                return <div className='form-style'>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                    <Skeleton active/>
                </div>
            }
        }
    }

    function showAppropriateMenuItems() {
        if(functions === 0) {
            return <div>
                <Invoice returnInvoiceInfo={handleInvoice}
                         /*image={img}*/
                         data={data}/>
                {
                    invoice
                        ?
                        <PDF
                            /*image={img}*/
                            info={invoice}/>
                        :
                        null
                }
            </div>
        }
        else
            return <Profile data={data}/>
    }

    //Failed connection to firebase
    const errorResult = () => {
        return <Result
            status='error'
            title='Proverite konekciju sa internetom.'
            subTitle='Došlo je do greške. Osvežite stranicu.'
            style={{backgroundColor: 'white'}}
            extra={[
                <img style={{width: '100%', maxWidth: '450px'}}
                     src={internetProblem}
                     alt='illustration'
                     key={1}
                />
            ]}
        />
    }

    return <Layout>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <div>
                <img src={skyon} alt='skyon logo' style={logoStyle}/>
            </div>
            <div>
                <Menu theme="dark" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={setInvoices}>
                        Fakture
                    </Menu.Item>
                    <Menu.Item key="2" onClick={setProfile}>
                        Profil
                    </Menu.Item>
                </Menu>
                <Menu theme='dark'>
                    <Menu.Item>
                        <Button type='primary'
                                size='large'
                                ghost={true}
                                block={true}
                                onClick={handleLogout}>
                            Odjavi se
                        </Button>
                    </Menu.Item>
                </Menu>
            </div>
        </Sider>
        <Layout>
            <Header style={{ padding: 0 }} />
            <Content>
                <div style={{ padding: 24, minHeight: 410 }}>
                    {/*If it's loaded show the panels, if it's the first function show invoice, else show the profile*/}
                    {showAppropriate()}
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
                                <Avatar src={ictdc} shape='square' style={{width: '50%', height: '25%'}} alt='ictdc logo'/>
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
                        onClick={() => {
                            firebase.auth().signOut();
                        }}
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
