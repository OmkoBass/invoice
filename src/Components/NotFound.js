import React from 'react'

//antd
import {Row, Col, Layout, Result} from 'antd'

//not found image
import notFound from '../Assets/404.png'

//skyon
import skyon from '../Assets/skyonlight.png'

const { Header, Content } = Layout

function NotFound() {
    return <Layout>
        <Header>
            <img src={skyon} alt='skyon logo' style={{width:'100px'}}/>
        </Header>
        <Content style={{backgroundColor: 'white'}}>
            <Result
                status='error'
                title='Stranica ne postoji!'
                subTitle='Stranica kojoj želite da pristupite ne postoji.'
                extra={[
                    <Row justify='center'>
                        <Col xl={12} lg={18} xs={24}>
                            <img style={{width: '100%'}} src={notFound} alt='not found'/>
                        </Col>
                    </Row>
                ]}
            />
        </Content>
    </Layout>
}

export default NotFound;
