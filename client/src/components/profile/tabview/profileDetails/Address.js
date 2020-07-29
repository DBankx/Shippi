import React from 'react';
import { Row, Col, Card, Button, Tooltip } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import AddressModal from './AddressModal';

const Address = ({ address }) => {
  return (
    <div className='address' style={{ marginTop: '2em' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Addresses{' '}
        <Tooltip title='Add address' placement='top'>
          <AddressModal />
        </Tooltip>
      </h3>

      {address.length > 0 ? (
        <div className=''>
          <Row align='middle' gutter={[16, 24]}>
            {address.map((add) => (
              <Col key={add._id} xl={8} lg={8} md={12} sm={12} xs={24}>
                <Card>
                  <CloseOutlined />
                  <p>
                    <strong>{add.type}</strong>
                  </p>
                  <p>
                    {add.addressLine}, {add.city}, {add.state}, {add.country},{' '}
                    {add.postalCode}
                  </p>
                  <p>more info: {add.additionalInfo}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        'No addresses added'
      )}
    </div>
  );
};

export default Address;
