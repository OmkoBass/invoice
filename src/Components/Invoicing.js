import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//Ant components
import { Row, Col, Layout, Menu, Skeleton, Result, Drawer } from 'antd';

//Ant icons
import {EditOutlined, ProfileOutlined, LogoutOutlined, AlignLeftOutlined} from "@ant-design/icons";

//Footer images
import skyon from '../Assets/skyonlight.png'
import conmisi from '../Assets/conmisi.png';
import ictdc from '../Assets/ictdc.png';
import internetProblem from '../Assets/internet_problem.png';

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";
import LogoutModal from "./Smaller/LogoutModal";

//Router
import { Redirect } from "react-router";

//Context for authentication
import { AuthContext } from "./Auth";
import ErrorResult from "./Smaller/ErrorResult";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";

//Style
const logoStyle = {
    width: '100%',
    height: '100%',
    float: 'left'
}

const {Header, Content, Sider, Footer} = Layout;

function Invoicing() {
    //For logout modal
    const [visibleModal, setVisibleModal] = useState(null);

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

            //Works on snapshot meaning it changes in real time
            userCollection.doc(currentUser.uid).onSnapshot(function(doc) {
               setData(doc.data());
               setLoad(true);
            });
        }
    }, [])

    if (!currentUser) {
        return <Redirect to='/'/>
    }

    function handleInvoice(childData) {
        setInvoice(childData);
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
            return <ErrorResult/>
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

    const handleBreakpoint = value => {
        if(value)
            setMobile(true);
        else
            setMobile(false);
    }

    const menu = (
        <div style={{position: 'sticky', top: '0'}}>
            <div>
                <img src={skyon} alt='skyon logo' style={logoStyle}/>
            </div>
            <Menu theme="dark"
                  defaultSelectedKeys={[selectedKey]}
                  selectedKeys={[selectedKey]}
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
                           onClick={() => setVisibleModal(true)}
                >
                    <LogoutOutlined/>
                    <span>Odjavi se</span>
                </Menu.Item>
            </Menu>
        </div>
    )

    //This can be refactored so i don't need to type Menu again
    const mobileDrawer = () => {
        return <Drawer
            bodyStyle={{backgroundColor: '#001529', padding: 0}}
            onClose={() => setDrawer(false)}
            visible={drawer}
            width={200}
            placement='left'
        >
            {menu}
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
            {menu}
        </Sider>
        <Layout>
            <HEADER mobile={mobile} callBack={() => setDrawer(!drawer)}/>
            <Content>
                <div style={{ padding: 24 }}>
                    {/*If it's loaded show the panels, if it's the first function show invoice, else show the profile*/}
                    {showAppropriate()}
                </div>
            </Content>
            <FOOTER/>
        </Layout>

        <LogoutModal visible={visibleModal} callBack={() => setVisibleModal(false)}/>

        {mobileDrawer()}

    </Layout>
}

export default Invoicing;
