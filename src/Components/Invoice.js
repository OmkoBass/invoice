import React, { useState } from 'react'

//antd
import { Form, Input, Button, Divider, Typography, Row, Col } from 'antd'

//icon
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

//Components
import FileUpload from "./FileUpload";

const { Title, Paragraph, Text } = Typography;

function Invoice(props) {
    //Form ref
    let [form] = Form.useForm();

    const [img, setImg] = useState(props.img);

    const handleFinish = value => {
        console.log(value);

        props.returnInvoiceInfo([value, img]);
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

            <Form.List name="services">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <div className='form-style'
                                     style={{marginTop: '2em'}}
                                     key={field.key}>
                                    <Row>
                                        <Col><Title>Usluga</Title></Col>
                                    </Row>

                                    <Divider/>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item name={[field.name, 'serviceType']}
                                                       label='Vrsta usluge:'
                                                       fieldKey={[field.fieldKey, 'serviceType']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item name={[field.name, 'unit']}
                                                       label='Jedinica:'
                                                       fieldKey={[field.fieldKey, 'unit']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item name={[field.name, 'amount']}
                                                       label='Količina:'
                                                       fieldKey={[field.fieldKey, 'amount']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item name={[field.name, 'price']}
                                                       label='Cena:'
                                                       fieldKey={[field.fieldKey, 'price']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Button type='danger'
                                                    block={true}
                                                    ghost={true}
                                                    icon={<MinusCircleOutlined />}
                                                    onClick={() => remove(field.name)}
                                            >
                                                Ukloni
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <Form.Item
                                style={{marginTop: '2em'}}
                            >
                                <Button
                                    type="primary"
                                    ghost={true}
                                    block={true}
                                    onClick={() => {
                                        add();
                                    }}
                                >
                                    <PlusOutlined /> Dodaj polje
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            {/*<Form.Item name='total'
                               label='Ukupno:'>
                        <Input/>
            </Form.Item>*/}

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
