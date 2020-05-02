import React from 'react'

//antd
import {Form, Input, Button, Divider, Typography, Layout, Menu, Row, Col} from 'antd'

//logo
import logo from '../Assets/Skayon_logo_dark.png'

const {Title, Paragraph} = Typography;

const {Header, Content, Sider} = Layout;

function Invoice(props) {
    function handleFinish() {
        props.returnInvoiceInfo(form.getFieldsValue());
    }

    const layout = {
        labelCol: {span: 6},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 6,
        }
    }

    const logoStyle = {
        width: '100%',
        height: '100%',
        float: 'left'
    }

    let [form] = Form.useForm();

    return <div>
        <Layout>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >
                <div>
                    <img src={logo} alt='skyon logo' style={logoStyle}/>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        Fakture
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header/>
                <Content style={{ padding: '2em'}}>
                    <Typography>
                        <Title>Faktura</Title>
                        <Paragraph>
                            Unesite podatke za vasu fakturu, dugme "Štampaj" na dnu ekrana će generisati PDF file.
                        </Paragraph>
                    </Typography>
                    <Divider/>
                    <Form {...layout}
                          form={form}
                          layout='horizontal'
                          name='info'
                          onFinish={handleFinish}
                    >
                        <Row>
                            <Col lg={14} xs={24}>
                                <Form.Item name='invoice'
                                           label='Faktura:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='dateInvoice'
                                           label='Datum fakture:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='dateTraffic'
                                           label='Datum prometa:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='place'
                                           label='Mesto prometa:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider/>

                        <Row>
                            <Col lg={14} xs={24}>
                                <Form.Item name='fromName'
                                           label='Od:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='firmName'
                                           label='Ime firme:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='street'
                                           label='Ulica:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='city'
                                           label='Grad:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='pib'
                                           label='PIB:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='account'
                                           label='ŽIRO RAČUN:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='email'
                                           label='E-mail:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                            </Col>

                            <Col lg={14} xs={24}>
                                <Form.Item name='toName'
                                           label='Komitet:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='toAdress'
                                           label='Adresa:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='toCity'
                                           label='Grad:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='toPib'
                                           label='PIB/JMBG:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider/>

                        <Row>
                            <Col lg={14} xs={24}>
                                <Form.Item name='serviceType'
                                           label='Vrsta usluge:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='unit'
                                           label='Jedinica:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='amount'
                                           label='Količina:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='price'
                                           label='Cena:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='total'
                                           label='Ukupno:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item {...controlLayout}>
                            <Button type='primary'
                                    size='large'
                                    htmlType='submit'
                            >Štampaj</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    </div>
}

export default Invoice;
