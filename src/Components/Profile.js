import React, {useState, useContext, useEffect} from 'react'

//firebase
import firebase from "../firebase";

//antd
import {Form, Button, Input, Typography,
    Divider, notification} from 'antd'

//Components
//import FileUpload from "./FileUpload";

import { AuthContext } from "./Auth";

const { Title, Paragraph, Text } = Typography;

function Profile(props) {
    //Form ref
    let [form] = Form.useForm();

    const [data, setData] = useState(props.data);

    // const [img, setImg] = useState(null);

    useEffect(() => {
        if(props.data) {
            form.setFieldsValue({data})
        }
    }, [data, form, props.data])


    //So i know who the current user is
    const { currentUser } = useContext(AuthContext);

    let userID = currentUser.uid;

    let userCollection = firebase.firestore().collection('Users');

    // Saving
    const handleSave = () => {
        let values = form.getFieldsValue();

        let parsedValues = Object.entries(values).map(([key, value]) => value === undefined ? '' : value);

        let objectForFirebase = {
            fromName: parsedValues[0],
            firmName: parsedValues[1],
            street: parsedValues[2],
            city: parsedValues[3],
            pib: parsedValues[4],
            account: parsedValues[5],
            email: parsedValues[6],
        }

        /*if(img) {
            let storageRef = firebase.storage().ref(userID);

            storageRef.put(img);
        }*/

        userCollection.doc(userID).set({
            account: objectForFirebase.account,
            email: objectForFirebase.email,
            firmName: objectForFirebase.firmName,
            fromName: objectForFirebase.fromName,
            city: objectForFirebase.city,
            pib: objectForFirebase.pib,
            street: objectForFirebase.street,
        }).then(() => {
            setData(objectForFirebase);
            openNotificationWithIcon('success');
        })
        .catch(r => openNotificationWithIcon('error'));
    }

    // notification
    const openNotificationWithIcon = type => {
        notification[type]({
            message: type === 'success' ? 'Uspešno!' : 'Greška',
            description: type === 'success' ? 'Profil sačuvan!' : type === 'error' ?
                'Doslo je do greške.' : 'Informacije se nisu promenile.'
        });
    };

    // Layout for positioning
    const layout = {
        labelCol: {span: 4},
    }

    const controlLayout = {
        wrapperCol: {
            offset: 4,
        }
    }

    return <div>
        <Typography>
            <Title>Vaš Profil</Title>
            <Paragraph>
                Unesite podatke za vašu fakturu koji će se uvek nalaziti u vašoj fakturi, dugme <Text
                strong>"Sačuvaj"</Text> na dnu ekrana će sačuvati informacije.
            </Paragraph>
        </Typography>

        <Divider/>
            <Form {...layout}
                  className='form-style'
                  form={form}
                  name='profile'
                  initialValues={props.data}
            >
                {/*<Form.Item label='Logo'>
                    <FileUpload accept={'.png, .jpg, .jpeg'}
                        multiple={false}
                        imgCallBack={imgCallBack}
                    />
                </Form.Item>*/}
                <Form.Item name='fromName'
                           label='Od'>
                    <Input/>
                </Form.Item>
                <Form.Item name='firmName'
                           label='Ime firme'>
                    <Input/>
                </Form.Item>
                <Form.Item name='street'
                           label='Ulica:'
                >
                    <Input/>
                </Form.Item>
                <Form.Item name='city'
                           label='Grad:'
                >
                    <Input/>
                </Form.Item>
                <Form.Item name='pib'
                           label='PIB:'
                >
                    <Input/>
                </Form.Item>
                <Form.Item name='account'
                           label='ŽIRO RAČUN:'
                >
                    <Input/>
                </Form.Item>
                <Form.Item name='email'
                           label='email:'
                >
                    <Input/>
                </Form.Item>
                <Form.Item {...controlLayout}>
                    <Button type='primary' size='large' onClick={handleSave}>
                        Sačuvaj
                    </Button>
                </Form.Item>
            </Form>
    </div>
}

export default Profile;
