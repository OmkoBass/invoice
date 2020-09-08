import React from 'react'

//router
import { useHistory } from "react-router";

//Ant Components
import { Button, Col, Divider, Result, Row } from 'antd';

//Illustration
import complete from "../Assets/success.png";
import LazyImage from "./Smaller/LazyImage";

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
                    <LazyImage
                        src={complete}
                        alt='success'
                        style={{width: '100%'}}
                    />
                </Col>
            </Row>,
            <Divider key={2}/>,
            <Button key={3}
                    className='button-green'
                    type='primary'
                    size='large'
                    onClick={() => history.push('/')}>
                Prijavi se!
            </Button>
        ]}
    />
}

export default Success;
