import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//Ant components
import {Layout, Skeleton, Drawer} from 'antd';

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";
import LogoutModal from "./Smaller/LogoutModal";

//Router
import {Redirect, Switch, Route} from "react-router";

//Context for authentication
import {AuthContext} from "./Auth";
import ErrorResult from "./Smaller/ErrorResult";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";
import SiderMenu from "./Smaller/SiderMenu";


const {Content, Sider} = Layout;

function Invoicing() {
    const {currentUser} = useContext(AuthContext);

    //For logout modal
    const [visibleModal, setVisibleModal] = useState(null);

    //If this is true a different sider will be shown
    const [mobile, setMobile] = useState(false);

    //For sider
    const [sider, setSider] = useState(false);

    //Drawer for the sider
    const [drawer, setDrawer] = useState(false);

    //If error happens i set this to true and show the error
    const [error, setError] = useState(false);

    //If this is true then we got the data we needed
    const [load, setLoad] = useState(false);

    //Invoice info
    const [invoice, setInvoice] = useState(null);

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
            userCollection.doc(currentUser.uid).onSnapshot(function (doc) {
                setData(doc.data());
                setLoad(true);
            });
        }
    }, [])

    if (!currentUser) {
        return <Redirect to='/'/>
    }

    const toggleSider = () => setSider(!sider);

    const handleBreakpoint = value => {
        if (value)
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
            <SiderMenu/>
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
            <SiderMenu/>
        </Sider>
        <Layout>
            <HEADER mobile={mobile} callBack={() => setDrawer(!drawer)}/>
            <Content>
                <div style={{padding: 24}}>
                    <Switch>
                        <Route path='/'
                               component={() => <Invoice returnInvoiceInfo={invoiceData => setInvoice(invoiceData)}/>}/>
                        <Route path='/invoice/profile' component={() => <Profile data={data}/>}/>
                    </Switch>
                    {
                        invoice
                            ?
                            <PDF /*image={img}*/ info={invoice} style={{height: '100vh'}}/>
                            :
                            null
                    }
                </div>
            </Content>
            <FOOTER/>
        </Layout>

        <LogoutModal visible={visibleModal} callBack={() => setVisibleModal(false)}/>

        {mobileDrawer()}

    </Layout>
}

export default Invoicing;
