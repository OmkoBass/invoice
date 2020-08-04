import React, { useState } from 'react'

//Router
import { useHistory } from 'react-router-dom';

//Ant components
import {Menu} from "antd";

//Ant icons
import {EditOutlined, LogoutOutlined, ProfileOutlined, HistoryOutlined} from "@ant-design/icons";

import skyon from "../../Assets/skyonlight.png";
import LogoutModal from "./LogoutModal";

const logoStyle = {
    width: '100%',
    height: '100%',
    float: 'left'
}

function SiderMenu() {
    const history = useHistory();

    //For logout modal
    const [visibleModal, setVisibleModal] = useState(null);

    const toTop = () => window.scrollTo(0, 0);

    return <div style={{position: 'sticky', top: '0'}}>
        <div>
            <img src={skyon} alt='skyon logo' style={logoStyle}/>
        </div>
        <Menu theme="dark"
              defaultSelectedKeys={['1']}
        >
            <Menu.Item key="1"
                       onClick={() => {
                           toTop();
                           history.push('/invoice');
                       }}>
                <EditOutlined/>
                <span>Fakture</span>
            </Menu.Item>
            <Menu.Item key="2"
                       onClick={() => {
                           toTop();
                           history.push('/invoice/profile')
                       }}>
                <ProfileOutlined/>
                <span>Profil</span>
            </Menu.Item>
            <Menu.Item key="3"
                       onClick={() => {
                           toTop();
                           history.push('/invoice/history')
                       }}>
                <HistoryOutlined />
                <span>Istorija</span>
            </Menu.Item>
            <Menu.Item key='4'
                       onClick={() => setVisibleModal(true)}
            >
                <LogoutOutlined/>
                <span>Odjavi se</span>
            </Menu.Item>
        </Menu>

        <LogoutModal visible={visibleModal} callBack={() => setVisibleModal(false)}/>
    </div>
}

export default SiderMenu;
