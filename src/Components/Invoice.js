import React from 'react'

//antd
import {Form, Input, Button, Divider, Typography, Layout} from 'antd'

const {Title} = Typography;

const {Header, Content } = Layout;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12}
}

const controlLayout = {
    wrapperCol: {
        offset: 4,
    }
}

function Invoice(props) {
    function handleFinish() {
        props.returnInvoiceInfo(form.getFieldsValue());
    }

    let [form] = Form.useForm();

    return <div>
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Title style={{color: 'pink'}}>Faktura</Title>
            </Header>
            <Content style={{padding: '0 50px', marginTop: '2em'}}>
                <Title level={2}>Osnovno</Title>
                <Form {...layout}
                      form={form}
                      layout='horizontal'
                      name='info'
                      onFinish={handleFinish}
                >
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

                    <Divider/>

                    <Title level={2}>Od</Title>

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
                               label='ŽIRO RACUN:'
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

                    <Divider/>

                    <Title level={2}>Komitet</Title>

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

                    <Divider/>

                    <Title level={2}>Usluga</Title>

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
                               label='Kolicina:'
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
                               label='ukupno:'
                               hasFeedback={true}
                               rules={[{ required: true, message: 'Unesite informacije!' }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item {...controlLayout}>
                        <Button type='primary'
                                size='large'
                                htmlType='submit'
                        >Stampaj</Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    </div>
}

export default Invoice;
