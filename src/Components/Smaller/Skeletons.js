import React from 'react'

import { Skeleton } from 'antd';

function Skeletons() {
    return <div>
        <Skeleton active={true}/>
        <Skeleton active={true}/>
        <Skeleton active={true}/>
        <Skeleton active={true}/>
        <Skeleton active={true}/>
        <Skeleton active={true}/>
    </div>
}

export default Skeletons;
