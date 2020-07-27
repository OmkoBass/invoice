import React from 'react'
import internetProblem from "../../Assets/internet_problem.png";
import {Result} from "antd";

function ErrorResult() {
    return <Result
        status='error'
        title='Proverite konekciju sa internetom.'
        subTitle='Došlo je do greške. Osvežite stranicu.'
        style={{backgroundColor: 'white'}}
        extra={[
            <img style={{width: '100%', maxWidth: '450px'}}
                 src={internetProblem}
                 alt='illustration'
                 key={1}
            />
        ]}
    />
}

export default ErrorResult;
