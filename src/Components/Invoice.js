import React, {useContext, useEffect, useState} from 'react'

//Ant components
import {Form, Input, Button, Divider, Typography, Row, Col, DatePicker, notification} from 'antd'

//Ant icons
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

//Components
import FileUpload from "./FileUpload";
import PDF from "./PDF";

//Moment for dates
import moment from "moment";

import {AuthContext} from "./Auth";

const { Title, Paragraph, Text } = Typography;

function Invoice() {
    //Form ref
    let [form] = Form.useForm();

    const [pdfData, setPdfData] = useState(null);
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);

    const failNotification = () => {
        notification.error({
            message: 'Greška!',
            description: 'Došlo je do greške pri čuvanju fakture.'
        });
    }

    useEffect(() => {
        form.setFieldsValue(currentUser.profile);
    }, [currentUser.profile, form])

    const handleFinish = values => {
        setPdfData({...values, img});

        values.dateInvoice = moment(values.dateInvoice).format('DD.MM.YYYY');
        values.dateTraffic = moment(values.dateTraffic).format('DD.MM.YYYY');

        values.dateCreated = moment().format('DD.MM.YYYY HH:mm');


    }

    function handleClear() {
        form.resetFields();

        triggerAdd();

        window.scrollTo(0, 0);
    }

    const imgCallBack = childData => {
        setImg(childData);
    }

    let triggerAdd = null;

    useEffect(() => {
        triggerAdd();
    }, [triggerAdd]);

    const layout = {
        labelCol: {span: 6},
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
              onFinish={handleFinish}
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

                    <Form.Item label='Logo:'>
                        <FileUpload accept={'.png, .jpg, .jpeg'}
                                    multiple={false}
                                    imgCallBack={imgCallBack}
                        />
                    </Form.Item>

                    <Form.Item name='dateInvoice'
                               label='Datum fakture:'
                    >
                        <DatePicker
                            format={'DD.MM.YYYY'}
                            placeholder={'Izaberite datum...'}
                        />
                    </Form.Item>

                    <Form.Item name='dateTraffic'
                               label='Datum prometa:'
                    >
                        <DatePicker
                            format={'DD.MM.YYYY'}
                            placeholder={'Izaberite datum...'}
                        />
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
                    return (
                        <div style={{margin: 'auto', maxWidth: '960px'}}>
                            {fields.map((field, index) => (
                                <div key={field.key}>
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <Typography.Title strong level={4}
                                                         style={{padding: '0.3em'}}
                                        >{index + 1}.
                                        </Typography.Title>
                                        <Form.Item name={[field.name, 'serviceType']}
                                                   fieldKey={[field.fieldKey, 'serviceType']}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item name={[field.name, 'unit']}
                                                   fieldKey={[field.fieldKey, 'unit']}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item name={[field.name, 'amount']}
                                                   fieldKey={[field.fieldKey, 'amount']}
                                        >
                                            <Input onChange={() => {
                                                let services = form.getFieldValue('services');

                                                if(services[index].amount && services[index].price) {
                                                    services[index].total = services[index].amount * services[index].price;

                                                    if(isNaN(services[index].total))
                                                        services[index].total = 0;

                                                    form.setFieldsValue({
                                                        services: services
                                                    });

                                                }
                                            }}/>
                                        </Form.Item>

                                        <Form.Item name={[field.name, 'price']}
                                                   fieldKey={[field.fieldKey, 'price']}
                                        >
                                            <Input onChange={() => {
                                                let services = form.getFieldValue('services');

                                                if(services[index].amount && services[index].price) {
                                                    services[index].total = services[index].amount * services[index].price;

                                                    if(isNaN(services[index].total))
                                                        services[index].total = 0;

                                                    form.setFieldsValue({
                                                        services: services
                                                    });
                                                }
                                            }}/>
                                        </Form.Item>

                                        <Form.Item name={[field.name, 'total']}
                                                   fieldKey={[field.fieldKey, 'price']}
                                        >
                                            <Input/>
                                        </Form.Item>

                                        <Button
                                            type="danger"
                                            ghost={true}
                                            icon={<MinusCircleOutlined/>}
                                            onClick={() => remove(field.name)}
                                        />
                                    </div>
                                </div>
                            ))}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    ghost={true}
                                    block={true}
                                    onClick={() => add()}
                                >
                                    <PlusOutlined /> Dodaj polje
                                </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Row justify='center' gutter={32}>
                <Col>
                    <Form.Item>
                        <Button type='primary'
                                size='large'
                                htmlType='submit'
                        >Štampaj</Button>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item>
                        <Button type='default'
                                size='large'
                                onClick={handleClear}
                        >Nova Faktura</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <Paragraph>
            Samo potupne fakture će se čuvati.
        </Paragraph>
        {
            pdfData
            ?
            <PDF /*image={img}*/ info={pdfData} style={{height: '100vh', width: '100%'}}/>
            :
            null
        }
    </div>
}

export default Invoice;
