import React, {useContext} from 'react'

//router
import { useHistory } from "react-router";

//antd
import { Button, Col, Divider, Result, Row } from 'antd';

//Illustration
import complete from "../Assets/success.png";

//User context
import {AuthContext} from "./Auth";

//firebase
import firebase from 'firebase';

function Success() {
    let history = useHistory();

    const {currentUser} = useContext(AuthContext);

    if (currentUser)
        firebase.auth().signOut();

    return <Result
        status='success'
        title='Uspešno ste se registrovali!'
        subTitle='Sada se možete prijaviti na vas profil!'
        style={{margin: 'auto'}}
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
