import React from 'react'

//antd
import {Form, Input, Button, Divider, Typography, Row, Col, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons';

const {Title, Paragraph, Text} = Typography;

function Invoice(props) {
    function handleFinish() {
        console.log(form.getFieldsValue());
        props.returnInvoiceInfo(form.getFieldsValue());
    }

    function handleClear() {
        form.setFieldsValue({
            invoice: null,
            logo: null,
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

    const formStyle = {
        backgroundColor: 'white',
        padding: '1em',
        borderRadius: '8px',
        boxShadow: ' 0 2px 8px rgba(0, 0, 0, 0.15)',
    }

    let [form] = Form.useForm();

    return <div>
        <Typography>
            <Title>Nova Faktura</Title>
            <Paragraph>
                Unesite podatke za vasu fakturu, dugme <Text strong>"Štampaj"</Text> na dnu ekrana će generisati PDF
                file.
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
                    <Col><Title>Faktura</Title></Col>
                    <Divider/>
                    <Form.Item name='invoice'
                               label='Faktura:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='logo'
                               label='Logo'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Upload listType='picture'>
                            <Button>
                                <UploadOutlined/> Otpremi
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name='dateInvoice'
                               label='Datum fakture:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='dateTraffic'
                               label='Datum prometa:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='place'
                               label='Mesto prometa:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row>
                <Col lg={12} xs={24} style={formStyle}>
                    <Col><Title>Od</Title></Col>
                    <Divider/>
                    <Form.Item name='fromName'
                               label='Od:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='firmName'
                               label='Ime firme:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='street'
                               label='Ulica:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='city'
                               label='Grad:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='pib'
                               label='PIB:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='account'
                               label='ŽIRO RAČUN:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='email'
                               label='E-mail:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>

                <Col lg={{offset: 2, span: 10}} xs={24} style={formStyle}>
                    <Col><Title>Kome</Title></Col>
                    <Divider/>
                    <Form.Item name='toName'
                               label='Komitet:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toAddress'
                               label='Adresa:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toCity'
                               label='Grad:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toPib'
                               label='PIB/JMBG:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row>
                <Col lg={12} xs={24} style={formStyle}>
                    <Col><Title>Usluga</Title></Col>
                    <Divider/>
                    <Form.Item name='serviceType'
                               label='Vrsta usluge:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='unit'
                               label='Jedinica:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='amount'
                               label='Količina:'

                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='price'
                               label='Cena:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='total'
                               label='Ukupno:'
                               rules={[{required: true, message: 'Unesite informacije!'}]}>
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
    </div>
}

export default Invoice;
