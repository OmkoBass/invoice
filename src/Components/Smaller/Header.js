import React from 'react'

//Ant components
import { Layout } from 'antd';

//Ant icons
import {AlignLeftOutlined} from "@ant-design/icons";

const { Header } = Layout;

function HEADER({ mobile, callBack}) {
    return <Header style={{padding: 0}}>
        {
            mobile
                ?
                <AlignLeftOutlined
                    onClick={() => callBack()}
                    className={'mobile-nav-icon'}
                />
                :
                null
        }
    </Header>
}

export default HEADER;
