import React from 'react'

//router
import { useHistory } from "react-router";

//Ant Components
import { Button, Col, Divider, Result, Row } from 'antd';

//Illustration
import complete from "../Assets/success.png";

function Success() {
    let history = useHistory();

    return <Result
        status='success'
        title='Uspešno ste se registrovali!'
        subTitle='Sada se možete prijaviti na vas profil!'
        style={{margin: 'auto', height: '100vh'}}
        extra={[
            <Row justify='center' key={1}>
                <Col xl={12} lg={18} xs={24}>
                    <img style={{width: '90%'}} src={complete} alt='success'/>
                </Col>
            </Row>,
            <Divider key={2}/>,
            <Button key={3}
                    type='primary'
                    size='large'
                    onClick={() => history.push('/')}>
                Prijavi se!
            </Button>
        ]}
    />
}

export default Success;
