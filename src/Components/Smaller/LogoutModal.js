import React, { useContext } from 'react'

//React router
import { useHistory } from "react-router";

//Ant components
import {Button, Col, Modal, Row} from "antd";

import { AuthContext } from "../Auth";

function LogoutModal({ visible, callBack }) {
    const history = useHistory();

    const { setCurrentUser } = useContext(AuthContext);

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
                        localStorage.removeItem('User');
                        setCurrentUser(null);
                        history.push('/');
                    }}
                >
                    Da
                </Button>
            </Col>
        </Row>
    </Modal>
}

export default LogoutModal;
