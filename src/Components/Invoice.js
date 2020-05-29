import React, {useEffect, useState} from 'react'

//antd
import { Form, Input, Button, Divider, Typography, Row, Col, Space } from 'antd'

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
        props.returnInvoiceInfo([value, img]);
    }

    function handleClear() {
        form.resetFields();
        window.scrollTo(0, 0);
    }

    const imgCallBack = childData => {
        setImg(childData);
    }

    let triggerAdd = null;

    //We need this set to one because we increment it at the begging with triggerAdd
    let serviceNumber = 1;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        triggerAdd();
    }, loaded);

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

            <Row style={{margin: 'auto', maxWidth: '960px'}}>
                <Col offset={1} span={4}>
                    <Typography.Title level={4}>Vrsta usluge</Typography.Title>
                </Col>

                <Col offset={1} span={4}>
                    <Typography.Title level={4}>Jedinica</Typography.Title>
                </Col>

                <Col offset={1} span={4}>
                    <Typography.Title level={4}>Količina</Typography.Title>
                </Col>

                <Col offset={1} span={4}>
                    <Typography.Title level={4}>Cena</Typography.Title>
                </Col>

                <Col span={4}>
                    <Typography.Title level={4}>Ukupno</Typography.Title>
                </Col>
            </Row>

            <Form.List name="services">
                {(fields, { add, remove }) => {
                    triggerAdd = () => {
                        add();
                    }
                    setLoaded(true);
                    return (
                        <div style={{margin: 'auto', maxWidth: '960px'}}>
                            {fields.map((field, index) => (
                                <div key={field.key}>
                                    <Row>
                                        <Col span={4}>
                                            <Form.Item name={[field.name, 'serviceType']}
                                                       fieldKey={[field.fieldKey, 'serviceType']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                        <Col offset={1} span={4}>
                                            <Form.Item name={[field.name, 'unit']}
                                                       fieldKey={[field.fieldKey, 'unit']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                        <Col offset={1} span={4}>
                                            <Form.Item name={[field.name, 'amount']}
                                                       fieldKey={[field.fieldKey, 'amount']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                        <Col offset={1} span={4}>
                                            <Form.Item name={[field.name, 'price']}
                                                       fieldKey={[field.fieldKey, 'price']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                        <Col offset={1} span={4}>
                                            <Form.Item name={[field.name, 'total']}
                                                       fieldKey={[field.fieldKey, 'price']}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                            ))}


                            <Row justify='space-between'>
                                <Col span={24} style={serviceNumber === 1 ? {display: 'none'} : {display: 'block'}}>
                                    <Form.Item>
                                        <Button
                                            type="danger"
                                            ghost={true}
                                            block={true}
                                            icon={<MinusCircleOutlined/>}
                                            onClick={() => {serviceNumber--; remove(serviceNumber)}}
                                        >
                                            Ukloni polje
                                        </Button>
                                    </Form.Item>
                                </Col>

                                <Col span={24}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            ghost={true}
                                            block={true}
                                            onClick={() => {serviceNumber++; add();}}
                                        >
                                            <PlusOutlined /> Dodaj polje
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    );
                }}
            </Form.List>

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
