import React from 'react'

//router
import {useHistory} from "react-router";

//antd
import {Row, Col, Layout, Button, Result} from 'antd'

//not found image
import notFound from '../Assets/404.png'

//skyon
import skyon from '../Assets/skyonlight.png'

const { Header, Content } = Layout

function NotFound() {
    let history = useHistory();

    const toLogin = () => history.push('/');

    return <Layout>
        <Header style={{height: '8vh'}}>
            <img src={skyon} alt='skyon logo' style={{width:'100px'}}/>
        </Header>
        <Content style={{backgroundColor: 'white', height: '92vh'}}>
            <Result
                status='error'
                title='Stranica ne postoji!'
                subTitle='Stranica kojoj želite da pristupite ne postoji.'
                extra={[
                    <Row justify='center'>
                        <Col xl={12} lg={18} xs={24}>
                            <img style={{width: '100%'}} src={notFound} alt='not found'/>
                        </Col>
                    </Row>,
                    <Button
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
