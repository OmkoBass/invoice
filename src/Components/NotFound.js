import React from 'react'

//router
import { useHistory } from "react-router";

//Ant Components
import {Row, Col, Layout, Button, Result} from 'antd'

//not found image
import notFound from '../Assets/404.png'

import logo from "../Assets/logo.png";
import LazyImage from "./Smaller/LazyImage";

const { Header, Content } = Layout

function NotFound() {
    let history = useHistory();

    const toLogin = () => history.push('/');

    return <Layout>
        <Header style={{height: '8vh'}}>
            <img src={logo} alt='logo' style={{width:'100px'}}/>
        </Header>
        <Content style={{backgroundColor: 'white', height: '92vh'}}>
            <Result
                status='error'
                title='Stranica ne postoji!'
                subTitle='Stranica kojoj želite da pristupite ne postoji.'
                extra={[
                    <Row justify='center' key={1}>
                        <Col xl={12} lg={18} xs={24}>
                            <LazyImage
                                src={notFound}
                                alt='Not found'
                                style={{width: '100%'}}
                            />
                        </Col>
                    </Row>,
                    <Button key={2}
                    size='large'
                    type='danger'
                    onClick={toLogin}
                    >
                        Nazad na početnu
                    </Button>
                ]}
            />
        </Content>
    </Layout>
}

export default NotFound;
