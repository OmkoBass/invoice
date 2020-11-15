import React, { useEffect, useState } from 'react'

//Router
import { useHistory, useLocation} from 'react-router-dom';

//Ant components
import {Menu} from "antd";

//Ant icons
import {EditOutlined, LogoutOutlined, ProfileOutlined, HistoryOutlined, UserAddOutlined } from "@ant-design/icons";

import LogoutModal from "./LogoutModal";

import logo from "../../Assets/logo.png";

function SiderMenu() {
    const history = useHistory();
    const location = useLocation();

    //For logout modal
    const [visibleModal, setVisibleModal] = useState(null);

    const [selectedKey, setSelectedKey] = useState('0');

    /*let defaultKeys;

    if (location.pathname === '/invoice') {
        defaultKeys = '1';
    } else if (location.pathname === '/invoice/profile') {
        defaultKeys = '2';
    } else if (location.pathname === '/invoice/history') {
        defaultKeys = '3'
    } else {
        defaultKeys = '0';
    }*/

    useEffect(() => {
        if (location.pathname === '/invoice') {
            setSelectedKey('1');
        } else if (location.pathname === '/invoice/profile') {
            setSelectedKey('2');
        } else if (location.pathname === '/invoice/history') {
            setSelectedKey('3');
        } else if (location.pathname === '/invoice/clients') {
            setSelectedKey('5');
        }
        else {
            setSelectedKey('0');
        }
    }, [location])

    const toTop = () => window.scrollTo(0, 0);

    return <div style={{position: 'sticky', top: '0'}}>
        <div style={{ width: '100%'}}>
            <img src={logo} alt='logo' style={{ width: '100%', padding: '1em', maxBlockSize: '192px' }}/>
        </div>
        <Menu theme="dark"
              style={{ width: '100%' }}
              defaultSelectedKeys={['1']}
              selectedKeys={selectedKey}
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
            <Menu.Item key="5"
                    onClick={() => {
                        toTop();
                        history.push('/invoice/clients');
                    }}
            >
                <UserAddOutlined />
                <span> Klijenti </span>
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
