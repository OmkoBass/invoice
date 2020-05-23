import React from 'react'

//antd
import { Form, Input, Button, Divider, Typography, Row, Col, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function Invoice(props) {
    //Form ref
    let [form] = Form.useForm();

    function handleFinish() {
        props.returnInvoiceInfo(form.getFieldsValue());
    }

    function handleClear() {
        form.resetFields();
    }

    const layout = {
        labelCol: {span: 8},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 6,
        }
    }

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
              initialValues={props.data}
        >
            <Row justify='center'>
                <Col lg={12} xs={24} className='form-style'>
                    <Col><Title>Faktura</Title></Col>
                    <Divider/>
                    <Form.Item name='invoice'
                               label='Faktura:'
                               rules={[{required: true, message: 'Unesite fakturu!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='logo'
                               label='Logo'
                    >
                        {/*Horrible documentation for upload, i have no idea why it works like it does*/}
                        <Upload
                            multiple={false}
                            listType='picture'
                            fileList={null}
                        >
                            <Button>
                                <UploadOutlined/> Otpremi
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name='dateInvoice'
                               label='Datum fakture:'
                               rules={[{required: true, message: 'Unesite datum fakture!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='dateTraffic'
                               label='Datum prometa:'
                               rules={[{required: true, message: 'Unesite datum prometa!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='place'
                               label='Mesto prometa'
                               rules={[{required: true, message: 'Unesite mesto prometa!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center'>
                <Col lg={12} xs={24} className='form-style'>
                    <Col><Title>Od</Title></Col>
                    <Divider/>
                    <Form.Item name='fromName'
                               label='Od:'
                               rules={[{required: true, message: 'Unesite od koga informacije!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='firmName'
                               label='Ime firme:'
                               rules={[{required: true, message: 'Unesite ime firme!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='street'
                               label='Ulica:'
                               rules={[{required: true, message: 'Unesite ulicu!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='city'
                               label='Grad:'
                               rules={[{required: true, message: 'Unesite grad!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='pib'
                               label='PIB:'
                               rules={[{required: true, message: 'Unesite PIB!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='account'
                               label='ŽIRO RAČUN:'
                               rules={[{required: true, message: 'Unesite žiro račun!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='email'
                               label='E-mail:'
                               rules={[{required: true, message: 'Unesite email!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center'>
                <Col lg={12} xs={24} className='form-style'>
                    <Col><Title>Kome</Title></Col>
                    <Divider/>
                    <Form.Item name='toName'
                               label='Komitet:'
                               rules={[{required: true, message: 'Unesite komitet!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toAddress'
                               label='Adresa:'
                               rules={[{required: true, message: 'Unesite adresu!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toCity'
                               label='Grad:'
                               rules={[{required: true, message: 'Unesite grad!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toPib'
                               label='PIB/JMBG:'
                               rules={[{required: true, message: 'Unesite PIB/JMBG!'}]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center'>
                <Col lg={12} xs={24} className='form-style'>
                    <Col><Title>Usluga</Title></Col>
                    <Divider/>
                    <Form.Item name='serviceType'
                               label='Vrsta usluge:'
                               rules={[{required: true, message: 'Unesite vrstu usluge!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='unit'
                               label='Jedinica:'
                               rules={[{required: true, message: 'Unesite jedinicu!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='amount'
                               label='Količina:'

                               rules={[{required: true, message: 'Unesite količinu!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='price'
                               label='Cena:'
                               rules={[{required: true, message: 'Unesite cenu!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='total'
                               label='Ukupno:'
                               rules={[{required: true, message: 'Unesite ukupno!'}]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Row justify='center' style={{marginTop: '2em'}}>
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
