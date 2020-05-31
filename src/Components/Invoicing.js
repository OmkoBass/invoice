import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//antd
import {
    Row, Col, Layout, Menu, Modal,
    Button, Skeleton, Result, Drawer
} from 'antd';

//antd icons
import {EditOutlined, ProfileOutlined, LogoutOutlined, AlignLeftOutlined} from "@ant-design/icons";

//img
import skyon from '../Assets/skyonlight.png'
import conmisi from '../Assets/conmisi.png';
import ictdc from '../Assets/ictdc.png';
import internetProblem from '../Assets/internet_problem.png';

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";

//router
import { Redirect } from "react-router";

//Context for authentication
import { AuthContext } from "./Auth";

//Style
const logoStyle = {
    width: '100%',
    height: '100%',
    float: 'left'
}

const {Header, Content, Sider, Footer} = Layout;

function Invoicing() {
    //For logout modal
    const [show, setShow] = useState(null);

    //If this is true a different sider will be shown
    const [mobile, setMobile] = useState(false);

    //For sider
    const [sider, setSider] = useState(false);

    //Drawer for the sider
    const [drawer, setDrawer] = useState(false);

    //For the pulled image
    //const [img, setImg] = useState(null);

    //Which key in the menu is selected
    const [selectedKey, setSelectedKey] = useState('1');

    //If error happens i set this to true and show the error
    const [error, setError] = useState(false);

    //If this is true then we got the data we needed
    const [load, setLoad] = useState(false);

    //For switching between menus
    const [functions, setFunctions] = useState(0);

    //Invoice info
    const [invoice, setInvoice] = useState(null);

    const {currentUser} = useContext(AuthContext);

    //User data
    const [data, setData] = useState(null);

    //Collection /Users
    let userCollection = firebase.firestore().collection('Users');

    useEffect(() => {
        if (currentUser !== null) {
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
                if (doc.exists) {
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

    if (!currentUser) {
        return <Redirect to='/'/>
    }

    function handleInvoice(childData) {
        setInvoice(childData);
    }

    const handleLogout = () => {
        setShow(true);
    }

    const setInvoices = () => {
        setSelectedKey('1');
        setFunctions(0);
    }

    const setProfile = () => {
        setSelectedKey('2');
        setFunctions(1);
    }

    const toggleSider = () => setSider(!sider);

    function showAppropriate() {
        if (error) {
            return errorResult();
        } else {
            if (load) {
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
        if (functions === 0) {
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
        } else
            return <Profile data={data}/>
    }

    const logoutModal = () => {
        return <Modal
            title='Jeste li sigurni da hocete da se odjavite?'
            footer={false}
            visible={show}
            onCancel={() => setShow(false)}
        >
            <Row justify='center'>
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

    const handleBreakpoint = value => {
        if(value)
            setMobile(true);
        else
            setMobile(false);
    }

    //This can be refactored so i don't need to type Menu again
    const mobileDrawer = () => {
        return <Drawer
            bodyStyle={{backgroundColor: '#001529', padding: 0}}
            onClose={() => setDrawer(false)}
            visible={drawer}
            width={200}
            placement='left'
        >
            <div>
                <img src={skyon} alt='skyon logo' style={logoStyle}/>
            </div>
            <Menu theme="dark"
                  defaultSelectedKeys={[selectedKey]}
                  selectedKeys={[selectedKey]}
                  style={{width: '100%'}}
            >
                <Menu.Item key="1"
                           onClick={setInvoices}>
                    <EditOutlined/>
                    <span>Fakture</span>
                </Menu.Item>
                <Menu.Item key="2"
                           onClick={setProfile}>
                    <ProfileOutlined/>
                    <span>Profil</span>
                </Menu.Item>
                <Menu.Item key='3'
                           onClick={handleLogout}
                >
                    <LogoutOutlined/>
                    <span>Odjavi se</span>
                </Menu.Item>
            </Menu>
        </Drawer>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider
            style={mobile ? {display: 'none'} : {display: 'flex'}}
            breakpoint='lg'
            collapsible={true}
            collapsed={sider}
            onCollapse={toggleSider}
            onBreakpoint={handleBreakpoint}
        >
            <div>
                <img src={skyon} alt='skyon logo' style={logoStyle}/>
            </div>
            <Menu theme="dark"
                  defaultSelectedKeys={[selectedKey]}
                  selectedKeys={[selectedKey]}>
                <Menu.Item key="1"
                           onClick={setInvoices}>
                    <EditOutlined/>
                    <span>Fakture</span>
                </Menu.Item>
                <Menu.Item key="2"
                           onClick={setProfile}>
                    <ProfileOutlined/>
                    <span>Profil</span>
                </Menu.Item>
                <Menu.Item key='3'
                           onClick={handleLogout}
                >
                    <LogoutOutlined/>
                    <span>Odjavi se</span>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header style={{padding: 0}}>
                {
                    mobile
                    ?
                    <AlignLeftOutlined
                        onClick={() => setDrawer(true)}
                        className={'mobile-nav-icon'}
                    />
                    :
                    null
                }
            </Header>
            <Content>
                <div style={{padding: 24}}>
                    {/*If it's loaded show the panels, if it's the first function show invoice, else show the profile*/}
                    {showAppropriate()}
                </div>
            </Content>
            <Footer
                className={'footer'}>
                <Row justify='center'>
                    <Col md={12} sm={24}>

                    </Col>
                    <Col md={12} sm={24}>
                        Dodatno
                        <div style={{marginTop: '2em'}}>
                            <div>
                                <img src={conmisi}
                                     alt={'conmisi'}
                                     style={{width: '20%'}}
                                />
                                <a href='https://skayon.agency/' target="_blank" rel="noopener noreferrer">Platforma za zubare</a>
                            </div>

                            <div>
                                <img src={skyon}
                                     alt={'skyon'}
                                     style={{width: '20%'}}
                                />
                                <a href='https://conmisi.com/' target="_blank" rel="noopener noreferrer">Kompanija za IT solucije</a>
                            </div>

                            <div>
                                <img src={ictdc}
                                     alt={'ictdc'}
                                     style={{width: '20%'}}
                                />
                                <a href='https://ictdc.rs/' target="_blank" rel="noopener noreferrer">Development Center</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Footer>
        </Layout>

        {logoutModal()}

        {mobileDrawer()}

    </Layout>
}

export default Invoicing;
