import React from 'react'

//antd
import {Form, Input, Button, Divider, Typography, Layout, Menu, Row, Col} from 'antd'

//logo
import logo from '../Assets/Skayon_logo_dark.png'

const {Title, Paragraph, Text} = Typography;

const {Header, Content, Sider} = Layout;

function Invoice(props) {
    function handleFinish() {
        props.returnInvoiceInfo(form.getFieldsValue());
    }

    function handleClear() {
        form.setFieldsValue({
            invoice: null,
            dateInvoice: null,
            dateTraffic: null,
            place: null,
            fromName: null,
            firmName: null,
            street: null,
            city: null,
            pib: null,
            account: null,
            email: null,
            toName: null,
            toAddress: null,
            toCity: null,
            toPib: null,
            serviceType: null,
            unit: null,
            amount: null,
            price: null,
            total: null,
        });
    }

    const layout = {
        labelCol: {span: 8},
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

    const formStyle = {
        backgroundColor: 'white',
        padding: '1em',
        borderRadius: '8px',
        boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.15)',
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
                        <Title>Nova Faktura</Title>
                        <Paragraph>
                            Unesite podatke za vasu fakturu, dugme <Text strong>"Štampaj"</Text> na dnu ekrana će generisati PDF file.
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
                            <Col lg={12} xs={24} style={formStyle}>
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

                        <Row style={formStyle}>
                            <Col lg={12} xs={24}>
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

                            <Col lg={12} xs={24}>
                                <Form.Item name='toName'
                                           label='Komitet:'
                                           hasFeedback={true}
                                           rules={[{ required: true, message: 'Unesite informacije!' }]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item name='toAddress'
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
                            <Col lg={12} xs={24} style={formStyle}>
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

                        <Row style={{marginTop: '2em'}}>
                            <Col>
                                <Form.Item {...controlLayout}>
                                    <Button type='primary'
                                            size='large'
                                            htmlType='submit'
                                    >Štampaj</Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item {...controlLayout}>
                                    <Button type='default'
                                            size='large'
                                            onClick={handleClear}
                                    >Nova Faktura</Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Content>
            </Layout>
        </Layout>
    </div>
}

export default Invoice;
