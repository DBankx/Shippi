import React from 'react';
import { Row, Col, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import AddressModal from './AddressModal';
import { connect } from 'react-redux';
import { deleteAddress } from '../../../../actions/profile';

const Address = ({ address, deleteAddress }) => {
  return (
    <div className='address' style={{ marginTop: '2em' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Addresses</h3>
      <AddressModal />
      {address.length > 0 ? (
        <div className='' style={{ marginTop: '1em' }}>
          <Row align='middle' gutter={[16, 24]}>
            {address.map((add) => (
              <Col key={add._id} xl={8} lg={8} md={12} sm={12} xs={24}>
                <Card>
                  <CloseOutlined onClick={() => deleteAddress(add._id)} />
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

export default connect(null, { deleteAddress })(Address);
