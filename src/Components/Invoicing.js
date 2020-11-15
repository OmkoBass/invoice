import React, {useContext, useState} from 'react'

import axios from "axios";

//Ant components
import {Layout} from 'antd';

//Components
import Invoice from "./Invoice";
import Profile from "./Profile";
import Clients from "./Clients";
import History from "./History";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";
import SiderMenu from "./Smaller/SiderMenu";
import MobileDrawer from "./Smaller/MobileDrawer";

//Router
import {Redirect, Switch, Route, useRouteMatch} from "react-router";

import {AuthContext} from "./Auth";

const {Content, Sider} = Layout;

function Invoicing() {
    const { path } = useRouteMatch();

    const { currentUser } = useContext(AuthContext);

    axios.defaults.headers.get['token'] = currentUser;
    axios.defaults.headers.post['token'] = currentUser;
    axios.defaults.headers.put['token'] = currentUser;
    axios.defaults.headers.delete['token'] = currentUser;

    //If this is true a different sider will be shown
    const [mobile, setMobile] = useState(false);

    //For sider
    const [sider, setSider] = useState(false);

    //Drawer for the sider
    const [drawer, setDrawer] = useState(false);

    if(!currentUser)
        return <Redirect to='/'/>

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
                        <Route path={`${path}/profile`} component={() => <Profile/>}/>

                        <Route path={`${path}/clients`} component={() => <Clients/>}/>

                        <Route path={`${path}/history`} component={() => <History/>}/>

                        <Route path={`${path}`} component={Invoice}/>
                    </Switch>
                </div>
            </Content>
            <FOOTER/>
        </Layout>

        <MobileDrawer visible={drawer} callBack={() => setDrawer(!drawer)}/>
    </Layout>
}

export default Invoicing;
