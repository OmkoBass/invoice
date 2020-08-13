import React, {useContext, useEffect, useState} from 'react'

//Ant components
import {Layout} from 'antd';

import axios from 'axios';

//Components
import Invoice from "./Invoice";
import Profile from "./Profile";
import History from "./History";
import HEADER from "./Smaller/Header";
import FOOTER from "./Smaller/Footer";
import SiderMenu from "./Smaller/SiderMenu";
import MobileDrawer from "./Smaller/MobileDrawer";
import Skeletons from "./Smaller/Skeletons";

//Router
import {Redirect, Switch, Route, useRouteMatch, useHistory} from "react-router";

import {AuthContext} from "./Auth";
import DATABASE from "../Utils";

const {Content, Sider} = Layout;

function Invoicing() {
    const history = useHistory();

    const { path } = useRouteMatch();

    const { currentUser } = useContext(AuthContext);

    //If this is true a different sider will be shown
    const [mobile, setMobile] = useState(false);

    //For sider
    const [sider, setSider] = useState(false);

    //Drawer for the sider
    const [drawer, setDrawer] = useState(false);

    //If this is true then we got the data we needed
    const [load, setLoad] = useState(true);

    if(!currentUser)
        return <Redirect to='/'/>

    /*useEffect(() => {
        if(currentUser === null)
            history.push('/');
        else {
            setLoad(false);
        }
    }, [currentUser, history]);*/

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

                        <Route path={`${path}/history`} component={() => <History/>}/>

                        <Route path={`${path}`} component={Invoice}/>
                    </Switch>
                    {/*{
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
                    }*/}
                </div>
            </Content>
            <FOOTER/>
        </Layout>

        <MobileDrawer visible={drawer} callBack={() => setDrawer(!drawer)}/>
    </Layout>
}

export default Invoicing;
