import React, {useContext, useEffect, useState} from 'react'

//firebase
import firebase from '../firebase';

//Ant components
import {Layout} from 'antd';

//Components
import Invoice from "./Invoice";
import Profile from "./Profile";
import History from "./History";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";
import SiderMenu from "./Smaller/SiderMenu";
import MobileDrawer from "./Smaller/MobileDrawer";
import Skeletons from "./Smaller/Skeletons";
import ErrorResult from "./Smaller/ErrorResult";

//Router
import {Redirect, Switch, Route, useRouteMatch} from "react-router";

//Context for authentication
import {AuthContext} from "./Auth";

const {Content, Sider} = Layout;

function Invoicing() {
    const {currentUser, setProfileData} = useContext(AuthContext);

    const { path } = useRouteMatch();

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
    const [error, setError] = useState(false);

    useEffect(() => {
        if (currentUser !== null) {
            firebase.database().ref(`users/${currentUser.email.replace('.', 'DOT')}/profile`).once('value')
                .then(data => setProfileData(data.val()))
                .then(() => setLoad(false))
                .catch(() => setError(true));
        }
    }, [currentUser, setProfileData]);

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
                    {
                        error
                            ?
                            <ErrorResult/>
                            :
                            <div>
                                <Switch>
                                    <Route path={`${path}/profile`} component={() => <Profile/>}/>

                                    <Route path={`${path}/history`} component={() => <History/>}/>

                                    <Route path={`${path}`}
                                           component={() => load ? <Skeletons/> : <Invoice/>}/>
                                </Switch>
                            </div>
                    }
                </div>
            </Content>
            <FOOTER/>
        </Layout>

        <MobileDrawer visible={drawer} callBack={() => setDrawer(!drawer)}/>

    </Layout>
}

export default Invoicing;
