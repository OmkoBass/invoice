import React from 'react'

//Ant components
import {Col, Row, Layout} from "antd";

import conmisi from "../../Assets/conmisi.png";
import skayon from "../../Assets/skyonlight.png";
import ictdc from "../../Assets/ictdc.png";

const { Footer } = Layout;

function FOOTER() {
    return <Footer
        className={'footer'}>
        <Row justify='center'>
            <Col md={12} sm={24}>

            </Col>
            <Col md={12} sm={24}>
                Dodatno
                <div style={{marginTop: '2em'}}>
                    <div>
                        <img src={conmisi}
                             alt='conmisi'
                             style={{width: '20%'}}
                        />
                        <a href='https://conmisi.com/' target="_blank" rel="noopener noreferrer">Platforma za zubare</a>
                    </div>

                    <div>
                        <img src={skayon}
                             alt='skayon'
                             style={{width: '20%'}}
                        />
                        <a href='https://skayon.agency/' target="_blank" rel="noopener noreferrer">Kompanija za IT solucije</a>
                    </div>

                    <div>
                        <img src={ictdc}
                             alt='ictdc'
                             style={{width: '20%'}}
                        />
                        <a href='https://ictdc.rs/' target="_blank" rel="noopener noreferrer">Development Center</a>
                    </div>
                </div>
            </Col>
        </Row>
    </Footer>
}

export default FOOTER;
