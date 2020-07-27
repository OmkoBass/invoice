import React from 'react'

//Ant components
import {Menu} from "antd";

//Ant icons
import {EditOutlined, LogoutOutlined, ProfileOutlined} from "@ant-design/icons";

import skyon from "../../Assets/skyonlight.png";

const logoStyle = {
    width: '100%',
    height: '100%',
    float: 'left'
}

function SiderMenu() {
    return <div style={{position: 'sticky', top: '0'}}>
        <div>
            <img src={skyon} alt='skyon logo' style={logoStyle}/>
        </div>
        <Menu theme="dark"
              defaultSelectedKeys={['1']}
        >
            <Menu.Item key="1"
                       onClick={() => console.log('Push to invoice')}>
                <EditOutlined/>
                <span>Fakture</span>
            </Menu.Item>
            <Menu.Item key="2"
                       onClick={() => console.log('Push to profile')}>
                <ProfileOutlined/>
                <span>Profil</span>
            </Menu.Item>
            <Menu.Item key='3'
                       onClick={() => console.log('Show modal logout')}
            >
                <LogoutOutlined/>
                <span>Odjavi se</span>
            </Menu.Item>
        </Menu>
    </div>
}

export default SiderMenu;
