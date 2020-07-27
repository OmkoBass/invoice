import React from 'react'

//Ant components
import {Drawer} from "antd";

//Components
import SiderMenu from "./SiderMenu";

function MobileDrawer({ visible, callBack}) {
    return <Drawer
        bodyStyle={{backgroundColor: '#001529', padding: 0}}
        onClose={() => callBack()}
        visible={visible}
        width={200}
        placement='left'
    >
        <SiderMenu/>
    </Drawer>
}

export default MobileDrawer;
