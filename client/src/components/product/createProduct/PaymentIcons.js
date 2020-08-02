import React from 'react';
import { Row, Col } from 'antd';
import paypal from '../../../images/paypal.png';
import stripe from '../../../images/stripe.png';

const PaymentIcons = () => {
  return (
    <div>
      <Row>
        <Col>
          <img style={{ width: '50px' }} src={stripe} alt='stripe' />
        </Col>
        <Col>
          <img src={paypal} alt='paypal' style={{ width: '50px' }} />
        </Col>
      </Row>
    </div>
  );
};

export default PaymentIcons;
