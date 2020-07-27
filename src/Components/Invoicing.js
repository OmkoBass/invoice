import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//Ant components
import { Layout } from 'antd';

//Components
import Invoice from "./Invoice";
import PDF from "./PDF";
import Profile from "./Profile";
import LogoutModal from "./Smaller/LogoutModal";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";
import SiderMenu from "./Smaller/SiderMenu";
import MobileDrawer from "./Smaller/MobileDrawer";
import ErrorResult from "./Smaller/ErrorResult";

//Router
import {Redirect, Switch, Route} from "react-router";

//Context for authentication
import {AuthContext} from "./Auth";

const {Content, Sider} = Layout;

function Invoicing() {
    const {currentUser} = useContext(AuthContext);

    //If this is true a different sider will be shown
    const [mobile, setMobile] = useState(false);

    //For sider
    const [sider, setSider] = useState(false);

    //Drawer for the sider
    const [drawer, setDrawer] = useState(false);

    //If error happens i set this to true and show the error
    //const [error, setError] = useState(false);

    //If this is true then we got the data we needed
    const [load, setLoad] = useState(true);

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
                setLoad(false);
            });
        }
    }, []);

    if (!currentUser) {
        return <Redirect to='/'/>
    }

    const handleBreakpoint = value => {
        if (value)
            setMobile(true);
        else
            setMobile(false);
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider
            style={mobile ? {display: 'none'} : {display: 'flex'}}
            breakpoint='lg'
            collapsible={true}
            collapsed={sider}
            onCollapse={() => setSider(!sider)}
            onBreakpoint={handleBreakpoint}
        >
            <SiderMenu/>
        </Sider>
        <Layout>
            <HEADER mobile={mobile} callBack={() => setDrawer(!drawer)}/>
            <Content>
                <div style={{padding: 24}}>
                    <Switch>
                        <Route path='/invoice/profile' component={() => <Profile data={data}/>}/>

                        <Route path='/invoice'
                               component={() => <Invoice returnInvoiceInfo={invoiceData => setInvoice(invoiceData)}/>}/>
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

        <MobileDrawer visible={drawer} callBack={() => setDrawer(!drawer)}/>

    </Layout>
}

export default Invoicing;
