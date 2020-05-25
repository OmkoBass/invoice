import React, { useState } from 'react'

//antd
import { Form, Input, Button, Divider, Typography, Row, Col } from 'antd'

//Components
import FileUpload from "./FileUpload";

const { Title, Paragraph, Text } = Typography;

function Invoice(props) {
    //Form ref
    let [form] = Form.useForm();

    const [img, setImg] = useState(props.img);

    function handleFinish() {
        props.returnInvoiceInfo([form.getFieldsValue(), img]);
    }

    function handleClear() {
        form.resetFields();
        window.scrollTo(0, 0);
    }

    const imgCallBack = childData => {
        setImg(childData);
    }

    const layout = {
        labelCol: {span: 6},
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
            <Row justify='center' style={{maxWidth: '960px', margin: 'auto'}}>
                <Col span={24} className='form-style'>
                    <Col><Title>Faktura</Title></Col>
                    <Divider/>
                    <Form.Item name='invoice'
                               label='Faktura:'
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label='Logo:' name='logo'>
                        <FileUpload accept={'.png, .jpg, .jpeg'}
                                    multiple={false}
                                    imgCallBack={imgCallBack}
                        />
                    </Form.Item>

                    <Form.Item name='dateInvoice'
                               label='Datum fakture:'
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='dateTraffic'
                               label='Datum prometa:'
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='place'
                               label='Mesto prometa'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center' style={{maxWidth: '960px', margin: 'auto'}}>
                <Col span={24} className='form-style'>
                    <Col><Title>Od</Title></Col>
                    <Divider/>
                    <Form.Item name='fromName'
                               label='Od:'
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item name='firmName'
                               label='Ime firme:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='street'
                               label='Ulica:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='city'
                               label='Grad:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='pib'
                               label='PIB:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='account'
                               label='ŽIRO RAČUN:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='email'
                               label='E-mail:'>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center' style={{maxWidth: '960px', margin: 'auto'}}>
                <Col span={24} className='form-style'>
                    <Col><Title>Kome</Title></Col>
                    <Divider/>
                    <Form.Item name='toName'
                               label='Komitet:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toAddress'
                               label='Adresa:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toCity'
                               label='Grad:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='toPib'
                               label='PIB/JMBG:'>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>

            <Divider/>

            <Row justify='center' style={{maxWidth: '960px', margin: 'auto'}}>
                <Col span={24} className='form-style'>
                    <Col><Title>Usluga</Title></Col>
                    <Divider/>
                    <Form.Item name='serviceType'
                               label='Vrsta usluge:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='unit'
                               label='Jedinica:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='amount'
                               label='Količina:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='price'
                               label='Cena:'>
                        <Input/>
                    </Form.Item>

                    <Form.Item name='total'
                               label='Ukupno:'>
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
