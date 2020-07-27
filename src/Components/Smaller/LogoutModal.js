import React from 'react'

//Ant components
import {Button, Col, Modal, Row} from "antd";

import firebase from "../../firebase";

function LogoutModal({ visible, callBack }) {
    return <Modal
        title='Jeste li sigurni da hocete da se odjavite?'
        footer={false}
        visible={visible}
        onCancel={() => callBack()}
    >
        <Row justify='center'>
            <Col span={9}>
                <Button
                    block={true}
                    type='primary'
                    size='large'
                    onClick={() => callBack()}
                >
                    Ne
                </Button>
            </Col>

            <Col offset={6} span={9}>
                <Button
                    block={true}
                    type='danger'
                    size='large'
                    onClick={() => {
                        firebase.auth().signOut();
                    }}
                >
                    Da
                </Button>
            </Col>
        </Row>
    </Modal>
}

export default LogoutModal;
