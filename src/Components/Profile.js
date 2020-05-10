import React from 'react'

import {Row, Col, Form, Button, Input, Upload, Typography, Divider, notification} from 'antd'
import {UploadOutlined} from "@ant-design/icons";

const {Title, Paragraph, Text} = Typography;

function Profile() {
    //Layout for positioning
    const layout = {
        labelCol: {span: 6},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 3,
        }
    }

    //Form ref
    let [form] = Form.useForm();

    //Saving
    const handleOnFinish = value => {
        console.log(value);
        openNotificationWithIcon('success');
    }

    // notification
    const openNotificationWithIcon = type => {
        notification[type]({
            message: 'Uspešno!',
            description:
                'Uspešno ste sačuvali!',
        });
    };

    return <div>
        <Typography>
            <Title>Vaš Profil</Title>
            <Paragraph>
                Unesite podatke za vašu fakturu koji će se uvek nalaziti u vašoj fakturi, dugme <Text strong>"Sačuvaj"</Text> na dnu ekrana će sačuvati informacije.
            </Paragraph>
        </Typography>

        <Divider/>

        <Form {...layout}
            className='form-style'
            form={form}
            name='profile'
              onFinish={handleOnFinish}
        >
            <Row>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='logo'
                                label='logo'>
                        <Upload multiple={false}
                                listType='picture'
                                fileList={null}>
                            <Button>
                                <UploadOutlined/> Otpremi
                            </Button>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='fromName'
                               label='od'>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='firmName'
                               label='Ime firme'>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='street'
                               label='Ulica:'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='city'
                               label='Grad:'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='pib'
                               label='PIB:'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='account'
                               label='ŽIRO RAČUN:'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col lg={12} sm={12} xs={24}>
                    <Form.Item name='email'
                               label='E-mail:'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item {...controlLayout}>
                <Button type='primary' htmlType='submit' size='large'>
                    Sačuvaj
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default Profile;
